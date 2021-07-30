<template>
	<div class="modal-dialog">
		<div class="modal-content my-card-border">
			<div class="modal-header">
				<button id="signup-close" class="close mr-auto ml-0" data-dismiss="modal"
						@click.prevent="clearOnClose">
					&times;
				</button>
				<h5 class="modal-title mr-auto" style="position: absolute; left: 43%;">Sign Up</h5>
			</div>
			<div class="modal-body">
				<form>
					<div class="form-group">
						<input type="text" placeholder="Username or Email" class="form-control border-0"
							   v-model.lazy="signupDetails.username">
					</div>
					<h6 class="small text-left pl-3" style="color: red" v-if="usernameWarning">
						Username field cannot be empty
					</h6>
					<hr>
					<div class="form-group">
						<input type="password" placeholder="Password" class="form-control border-0"
							   v-model.lazy="signupDetails.password">
					</div>
					<h6 class="small text-left pl-3" style="color: red" v-if="passwordEmptyWarning">
						Password field cannot be empty
					</h6>
					<h6 class="small text-left pl-3" style="color: red" v-if="passwordShortWarning">
						Password too short
					</h6>
					<hr>
					<div class="row form-group">
						<div class="col-12">
							<b-form-checkbox
								class="pull-left mt-1 ml-4"
								v-model="signupDetails.tnc">
								<h6 style="line-height: 25px; font-size: 14px">I agree with the Terms & Conditions.</h6>
							</b-form-checkbox>
							<span class="h6 ml-3 text-danger" v-if="tncError">You must agree to proceed.</span>
						</div>
					</div>
					<div class="row form-group" style="margin-top: -18px;">
						<div class="col-12">
							<b-form-checkbox
								class="pull-left mt-1 ml-4"
								v-model="signupDetails.pp">
								<h6 style="line-height: 25px; font-size: 14px">I agree with the Privacy Policy.</h6>
							</b-form-checkbox>
							<span class="h6 ml-3 text-danger" v-if="ppError">You must agree to proceed.</span>
						</div>
					</div>
					<div class="form-group">
						<button
							@click.prevent="executeSignup"
							class="btn btn-primary text-white w-100 mb-3"
							style="border-radius: 10px;"
							:data-dismiss="signupDataDismiss">
							SIGN UP
						</button>
						<span style="line-height: 25px; font-size: 14px">Do you already have an account?</span>
						<a href="" id="signup-login" class="text-primary" style="line-height: 25px; font-size: 14px">Log in</a>
					</div>
					<div class="form-group or-seperator">
						<i>or</i>
					</div>

					<div class="form-group">
						<button id="signup-fb" class="btn text-dark w-100 mb-2"
								style="border-radius: 10px; border-color: rgba(128, 128, 128, 0.4)">
							<fa-icon
								class="text-primary pull-left mt-1"
								:icon="['fab', 'facebook']">
							</fa-icon>
							<b>Continue with Facebook</b>
						</button>
					</div>
					<div class="form-group">
						<button id="signup-google" class="btn text-dark w-100 mb-2"
								style="border-radius: 10px; border-color: rgba(128, 128, 128, 0.4)">
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
</template>


<script>
import axios from "axios";

import {library} from '@fortawesome/fontawesome-svg-core';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

library.add(faFacebook);
library.add(faGoogle);

import {mapMutations} from 'vuex';

export default {
	name: "SignupPhone",
	data() {
		return {
			signupDetails: {
				username: '',
				password: '',
				tnc: false,
				pp: false
			},
			usernameWarning: false,
			passwordEmptyWarning: false,
			passwordShortWarning: false,
			typeUnselectedWarning: false,
			disableSignup: false,
			ppError: false,
			tncError: false,
			signupDataDismiss: ''
		}
	},
	methods: {
		...mapMutations([
			'setSignupDetails'
		]),
		clearOnClose() {
			this.clearSignup();
			//this.clearState();
		},
		clearSignup() {
			this.signupDetails.username = '';
			this.signupDetails.password = '';
			this.signupDetails.rememberMe = false;
			this.signupDetails.tnc = false;
			this.signupDetails.pp = false;
			this.usernameWarning = false;
			this.passwordEmptyWarning = false;
			this.passwordShortWarning = false;
			this.disableSignup = false;
		},
		clearState() {
			this.$store.state.signupDetails.username = '';
			this.$store.state.signupDetails.password = '';
		},
		usernameIsValid() {
			this.usernameWarning = false;
			if (this.signupDetails.username === '') {
				this.usernameWarning = true;
				return false;
			}
			return true;
		},
		passwordIsValid() {
			this.passwordShortWarning = false;
			this.passwordEmptyWarning = false;

			if (this.signupDetails.password === '') {
				this.passwordEmptyWarning = true;
				return false;
			} else if (this.signupDetails.password.length < 6) {
				this.passwordShortWarning = true;
				return false;
			}
			return true;
		},
		ppChecked() {
			this.ppError = false;

			if (!this.signupDetails.pp) {
				this.ppError = true;
				return false;
			}
			return true;
		},
		tncChecked() {
			this.tncError = false;

			if (!this.signupDetails.tnc) {
				this.tncError = true;
				return false;
			}
			return true;
		},
		executeSignup() {
			if (!this.usernameIsValid() || !this.passwordIsValid() || !this.tncChecked() || !this.ppChecked()) {
				return;
			}
			this.setSignupDetails(this.signupDetails);
			this.signupDataDismiss = 'modal';
			this.clearSignup();
			// this.$router.push('/signup');
		}
	}
}
</script>

<style scoped>

</style>
