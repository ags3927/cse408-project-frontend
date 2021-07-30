<template>

	<div class="modal" id="forgotPassword" ref="forgotPassword">
		<div class="modal-dialog">
			<div class="modal-content my-card-border">
				<div class="modal-header">
					<button class="close mr-auto ml-0" data-dismiss="modal">
						&times;
					</button>
					<h5 class="modal-title mr-auto" style="position: absolute; left: 33%;">Forgot Password?</h5>
				</div>
				<div class="modal-body">
					<form>
						<div class="form-group">
							<h6 class="font-weight bold my-3">
								Enter the email address associated with your account, and we'll email you a link to
								reset your password.
							</h6>
						</div>
						<div class="form-group px-3 mt-4">
							<input type="email" placeholder="Email"
								   class="elux-custom-shadow form-control border-0 px-3"
								   v-model="email">
						</div>
						<div class="form-group mt-5">
							<button
								@click.prevent="sendResetLink"
								data-dismiss="modal"
								style="border-radius: 10px"
								class="btn btn-warning text-white px-5 py-2 mx-auto">
								Send Reset Link
							</button>
						</div>
					</form>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

import {mapGetters} from 'vuex';


export default {
	name: "ForgotPassword",
	data() {
		return {
			email: ''
		}
	},
	computed: {
		...mapGetters([
			'getSessionToken',
			'getServerBaseURL'
		])
	},
	methods: {
		makeToast(variant = null, title, body) {
			this.$bvToast.toast(body, {
				title: title,
				variant: variant,
				toaster: 'b-toaster-bottom-left',
				solid: true
			})
		},
		sendResetLink() {
			let serverBaseURL = this.getServerBaseURL;
			// console.log(this.email);
			// axios.post(serverBaseURL + 'user/forgotpassword', { userEmail: this.email })
			// .then(res => {
			// 	this.makeToast('success', 'Success', 'Password reset link sent!');
			// 	this.email = '';
			// }).catch(err => {
			// 	this.makeToast('danger', 'Error', 'There was an error. Please try again.');
			// 	console.log(err.response.data);
			// 	this.email = '';
			// });
		}
	}
}
</script>

<style scoped>

.elux-custom-shadow {
	box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}

.my-clickable#forgot-password:hover {
	text-decoration: underline;
}

input:focus, textarea:focus, select:focus {
	outline: none;
}

</style>
