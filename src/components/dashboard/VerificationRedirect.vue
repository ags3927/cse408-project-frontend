<template>
	<div class="container">
		<div class="row">
			<div class="col-12 col-lg-6 mx-auto px-5">
				<div class="card my-card-border py-4 px-4 px-lg-5 my-5 elux-custom-shadow">

					<h4 class="font-weight-bold mt-3 mb-3">Verification</h4>

					<hr class="mb-5">

					<button
						@click="getVerificationDetails"
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
import {mapGetters} from 'vuex';

import axios from 'axios';

export default {
	name: "VerificationRedirect",
	methods: {
		makeToast(variant = null, title, body) {
			this.$bvToast.toast(body, {
				title: title,
				variant: variant,
				toaster: 'b-toaster-bottom-left',
				solid: true
			})
		},
		getVerificationDetails() {
			let sessionToken = this.getSessionToken;
			let baseURL = this.getServerBaseURL;
			if (this.$route.query.code) {
				axios.post(baseURL + 'user/verify/verificationresultdetails', {
					verificationCode: this.$route.query.code,
					redirectURL: this.$route.query.redirectUrl
				}, {
					headers: {
						'x-auth': sessionToken
					}
				}).then(res => {
					console.log(res.data);
				}).catch(err => {
					console.log(err.response.data);
				});
			} else {
				this.makeToast('danger', 'error', 'Oop! There was an error. Please start again.');
				setTimeout(()=> {
					this.$router.push('/verification');
				}, 3000);
			}

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

</style>
