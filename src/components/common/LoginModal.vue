<template>
	<div class="modal" id="loginModal" ref="loginModal">
		<div class="modal-dialog">
			<div class="modal-content my-card-border">
				<div class="modal-header">
					<button id="login-close" class="close mr-auto ml-0" data-dismiss="modal"
							@click.prevent="clearLogin">
						&times;
					</button>
					<h5 class="modal-title mr-auto" style="position: absolute; left: 45%;">Login</h5>
				</div>
				<div class="modal-body">
					<form>
						<div class="form-group">
							<input @submit="login" type="text" placeholder="Username or Email" class="form-control border-0"
								   v-model.lazy="loginDetails.username">
						</div>
						<h6 class="small text-left pl-3" style="color: red" v-if="usernameWarning">
							Username field cannot be empty
						</h6>
						<hr>
						<div class="form-group">
							<input @submit="login" type="password" placeholder="Password" class="form-control border-0"
								   v-model.lazy="loginDetails.password">
						</div>
						<h6 class="small text-left pl-3" style="color: red" v-if="passwordEmptyWarning">Password
							field cannot be empty</h6>
						<h6 class="small text-left pl-3" style="color: red" v-if="passwordShortWarning">
							Password too short
						</h6>
						<hr>
						<div class="row form-group">
							<div class="col-6 text-left">
								<b-form-checkbox
									class="ml-4 text-left"
									v-model="loginDetails.rememberMe">
									<span style="font-size: 13px; line-height: 25px">Remember Me</span>
								</b-form-checkbox>
							</div>
							<div class="col-6">
								<button
									id="forgot-password"
									@click.prevent="forgotPassword"
									class="btn bg-transparent p-0 border-0 pull-right my-clickable mr-3 text-info">
									Forgot Password
								</button>
							</div>
						</div>

						<div class="form-group">
							<button
								@submit.prevent="login"
								@click.prevent="login"
								class="btn btn-primary text-white w-100 mb-3"
								style="border-radius: 10px;"
								:data-dismiss="loginDataDismiss">
								LOG IN
							</button>
							<span class="h6">Don't have an account?</span>
							<button @click.prevent="triggerSignup" id="login-signup" class="h6 btn text-primary">Sign Up</button>
						</div>

						<div class="form-group or-seperator">
							<i>or</i>
						</div>

						<div class="form-group">
							<button
                                @click.prevent=""
								id="login-fb"
								class="btn text-dark w-100 mb-2"
								style="border-radius: 10px; border-color: rgba(128, 128, 128, 0.4)"
								:disabled="disableLogin">
								<fa-icon
									class="text-primary pull-left mt-1"
									:icon="['fab', 'facebook']">
								</fa-icon>
								<b>Continue with Facebook</b>
							</button>
						</div>
						<div class="form-group">
							<button
                                @click.prevent=""
								id="login-google"
								class="btn text-dark w-100 mb-2"
								style="border-radius: 10px; border-color: rgba(128, 128, 128, 0.4)"
								:disabled="disableLogin">
								<fa-icon
									class="pull-left mt-1"
									:icon="['fab', 'google']">
								</fa-icon>
								<b>Continue with Google</b>
							</button>
						</div>
					</form>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import {mapMutations} from 'vuex';
import {mapGetters} from 'vuex';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

import {Toast} from "../../store/Toast";


library.add(faFacebook);
library.add(faGoogle);

export default {
	name: "LoginModal",
	data() {
		return {
			loginDetails: {
				username: '',
				password: '',
				rememberMe: false
			},
			usernameWarning: false,
			passwordEmptyWarning: false,
			passwordShortWarning: false,
			disableLogin: false,
			loginDataDismiss: ''
		}
	},
	methods: {
		...mapMutations([
			'setSessionToken',
			'setLoggedIn',
			'setSessionDetails',
			'setProfileDetails'
		]),
		makeToast(variant = null, title, body) {
			this.$bvToast.toast(body, {
				title: title,
				variant: variant,
				toaster: 'b-toaster-top-left',
				solid: true
			})
		},
		clearLogin() {
			this.loginDetails.username = '';
			this.loginDetails.password = '';
			this.loginDetails.rememberMe = false;
			this.usernameWarning = false;
			this.passwordEmptyWarning = false;
			this.passwordShortWarning = false;
			this.disableLogin = false;
		},
		usernameIsValid() {
			this.usernameWarning = false;
			if (this.loginDetails.username === '') {
				this.usernameWarning = true;
				return false;
			}
			return true;
		},
		passwordIsValid() {
			this.passwordShortWarning = false;
			this.passwordEmptyWarning = false;

			if (this.loginDetails.password === '') {
				this.passwordEmptyWarning = true;
				return false;
			} else if (this.loginDetails.password.length < 6) {
				this.passwordShortWarning = true;
				return false;
			}
			return true;
		},
		login() {
			let baseURL = this.getServerBaseURL;
			if (!this.usernameIsValid()) {
				return;
			}
			if (!this.passwordIsValid()) {
				return;
			}
			const authData = {
				username: this.loginDetails.username,
				password: this.loginDetails.password
			}
			this.disableLogin = true;
			axios.post(baseURL + 'login', authData)
				.then(res => {
					// console.log(res.data);
					this.setSessionToken(res.data.token);

					this.makeToast('success', 'Success', 'Logged In Successfully');

					axios.post(baseURL + 'user/details', {}, {
						headers: {
							'x-auth': res.data.token
						}
					}).then(res => {
						let sessionDetails = res.data.sessionDetails;
						if (sessionDetails.userType === 'ADMIN') {
							// console.log('IS ADMIN');
							sessionDetails.image = '';
							sessionDetails.userMode = 'ADMIN';
						} else {
							sessionDetails.userMode = 'GUEST';
						}
						this.setSessionDetails(sessionDetails);
						this.setLoggedIn();
					}).catch(err => {
						// console.log(err);
					});

					if (res.data.sessionDetails.userType !== 'ADMIN') {
						axios.post(baseURL + 'user/profile', {}, {
							headers: {
								'x-auth': res.data.token
							}
						}).then(res => {
							this.setProfileDetails(res.data.userProfile);
						}).catch(err => {
							// console.log(err.data);
						})

					}
				})
				.catch(err => {
					this.clearLogin();
					this.makeToast('danger', 'Error', err.response.data.message);
				});

			this.loginDataDismiss = 'modal';
		},
		forgotPassword() {
			if (this.loginDetails.password !== '') {
				this.login();
				$('#loginModal').modal('hide');
				return;
			}

			this.clearLogin();
			$('#loginModal').modal('hide');
			$('#forgotPassword').modal('show');
		},
		triggerSignup() {
			this.clearLogin();
			$('#loginModal').modal('hide');
			$('#signupModal').modal('show');
		}
	},
	computed: {
		...mapGetters([
			'getSessionToken',
			'getServerBaseURL'
		])
	}
}
</script>

<style scoped>
.my-clickable#forgot-password:hover {
	text-decoration: underline;
}

input:focus, textarea:focus, select:focus {
	outline: none;
}
</style>
