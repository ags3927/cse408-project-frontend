<template>
	<div class="container">
		<div class="row">
			<div class="col-12 col-lg-6 mx-auto px-4 px-lg-5">
				<div class="card outer-card py-4 px-4 px-lg-5 my-5">
					<h4 class="font-weight-bold mt-3 mb-3">Password</h4>

					<hr class="mb-5">

					<h6 class="font-weight-bold text-left pl-3">Current Password</h6>
					<b-form-input
						type="password"
						v-model="currentPassword"
						class="elux-custom-shadow border-0 pl-3"
						style="border-radius: 15px"
						placeholder="Current Password">
					</b-form-input>
					<h6 v-if="currentPassword.length > 0 && currentPassword.length < 6"
						class="text-left ml-3 mt-2 text-danger">
						Password Too Short
					</h6>
					<h6 v-if="currentPassword.length === 0 && currentPasswordError"
						class="text-left ml-3 mt-2 text-danger">
						Field can not be empty
					</h6>

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
						@click="updatePassword"
						class="btn btn-warning mx-auto text-white mt-5 mb-3"
						style="border-radius: 15px">
						Update Password
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


import {Toast} from "../../store/Toast";

export default {
	name: "EditPassword",
	data() {
		return {
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
			newPasswordError: false,
			confirmNewPasswordError: false,
			currentPasswordError: false
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
		updatePassword() {
			if (this.currentPassword.length === 0) {
				this.currentPasswordError = true;
				return;
			} else if (this.currentPassword.length < 6) {
				return;
			}

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

			let sessionToken = this.getSessionToken;
			let baseURL = this.getServerBaseURL;

			axios.post(baseURL + 'user/update/password', {
				currentPassword: this.currentPassword,
				newPassword: this.newPassword
			}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				// console.log(res.data);

				this.resetSessionToken();
				this.resetLoggedIn();
				this.makeToast('success', 'Success', 'Password Updated Successfully');
				this.$router.push('/');

			}).catch(err => {
				console.log('ERRORRRR')
				this.makeToast('danger', 'Error', err.response.data.message);
				// console.log('ERRORRRR AGAINNNNNN')
			})
		}
	}
}
</script>

<style scoped>

@media (min-width: 768px) {
	.outer-card {
		box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15)!important;
		border-radius: 20px;
	}
}

@media (max-width: 767px) {
	.outer-card {
		border: none;
	}
}

@media (min-width: 576px) {
	.btn-width {
		width: 50%;
	}
}
@media (max-width: 576px) {
	.btn-width {
		width: 75%;
	}
}

.elux-custom-shadow {
	box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}

.elux-color {
	color: #E4A620;
}
</style>
