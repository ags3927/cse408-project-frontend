<template>
	<div class="container">
		<div class="row">
			<div class="col-12 col-lg-6 mx-auto px-5">
				<div class="card my-card-border py-4 px-4 px-lg-5 my-5 elux-custom-shadow">
					<h4 class="font-weight-bold mt-3 mb-3">Reset Password</h4>

					<hr class="mb-5">

					<h6 class="font-weight-bold text-left pl-3 mt-4">New Password</h6>
					<b-form-input
						type="password"
						v-model="newPassword"
						class="elux-custom-shadow border-0 pl-3"
						style="border-radius: 15px"
						placeholder="New Password">
					</b-form-input>
					<h6 v-if="newPassword.length > 0 && newPassword.length < 6"
						class="text-left ml-3 mt-2 text-danger">
						Password Too Short
					</h6>
					<h6 v-if="newPassword.length === 0 && newPasswordError"
						class="text-left ml-3 mt-2 text-danger">
						Field can not be empty
					</h6>

					<h6 class="font-weight-bold text-left pl-3 mt-4">Confirm New Password</h6>
					<b-form-input
						type="password"
						v-model="confirmNewPassword"
						class="elux-custom-shadow border-0 pl-3"
						style="border-radius: 15px"
						placeholder="Confirm New Password">
					</b-form-input>
					<h6 v-if="confirmNewPassword.length > 0 && confirmNewPassword.length < 6"
						class="text-left ml-3 mt-2 text-danger">
						Password Too Short
					</h6>
					<h6 v-if="confirmNewPassword.length === 0 && confirmNewPasswordError"
						class="text-left ml-3 mt-2 text-danger">
						Field can not be empty
					</h6>

					<button
						@click="resetPassword"
						class="btn btn-warning mx-auto text-white mt-5 mb-3"
						style="border-radius: 15px">
						Reset Password
					</button>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';

export default {
	name: "ResetPassword",
	data() {
		return {
			newPassword: '',
			confirmNewPassword: '',
			newPasswordError: false,
			confirmNewPasswordError: false
		}
	},
	computed: {
		...mapGetters([
			'getSessionToken',
			'getServerBaseURL'
		])
	},
	methods: {
		...mapMutations([
			'resetSessionToken',
			'resetLoggedIn'
		]),
		makeToast(variant = null, title, body) {
			this.$bvToast.toast(body, {
				title: title,
				variant: variant,
				toaster: 'b-toaster-bottom-left',
				solid: true
			})
		},
		resetPassword() {
			if (this.newPassword.length === 0) {
				this.newPasswordError = true;
				return;
			} else if (this.newPassword.length < 6) {
				return;
			}

			if (this.confirmNewPassword.length === 0) {
				this.confirmNewPasswordError = true;
				return;
			} else if (this.confirmNewPassword.length < 6) {
				return;
			}

			if (this.newPassword !== this.confirmNewPassword) {
				this.makeToast('danger', 'Error', 'New Password and Confirm New Password fields do not match');
				return;
			}

			let sessionToken = this.$route.query.token;
			let baseURL = this.getServerBaseURL;

			axios.post(baseURL + 'user/resetpassword', {
				newPassword: this.newPassword,
				confirmNewPassword: this.confirmNewPassword
			}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.$router.push('/resetpasswordconfirmation');
			}).catch(err => {
				this.makeToast('danger', 'Error', 'There was an error! Please ask for a new reset-password link.');
				console.log(err.response.data);
			});

		}
	}
}
</script>

<style scoped>

</style>
