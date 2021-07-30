<template>
	<div class="container">
		<div class="row">
			<div class="col-12 col-lg-6 px-4 px-lg-3">
				<div class="card my-card-border p-4 mt-5 elux-custom-shadow">
					<h4 class="font-weight-bold">
						{{ getSessionDetails.name.firstName }} {{ getSessionDetails.name.lastName }}
					</h4>
					<hr class="px-4">

					<button class="btn verify-btn-bg px-4 py-2 elux-custom-shadow mx-3"
							style="border-radius: 15px">
						<span class="h5 mr-lg-5 font-weight-light" style="line-height: 35px">
							Verification Status
						</span>
						<img src="../../assets/img/icons/verified.png" alt="Verified Icon">
					</button>

					<h5 class="mx-3 my-5 text-left font-weight-light">Build trust by verifying your online accounts and official documents</h5>

					<button
						@click="getVerificationURL"
						class="btn btn-primary px-4 py-2 elux-custom-shadow mb-4 mx-3"
						style="border-radius: 15px">
						<span class="h5" style="line-height: 35px">
							Get Verified by TOKEN OF TRUST
						</span>
					</button>

					<a
						:href="verificationURL"
						:class="{'disabled btn-secondary': verificationURL === '', 'btn-warning text-white': verificationURL !== ''}"
						class="btn px-4 py-2 elux-custom-shadow mb-4 mx-3"
						style="border-radius: 15px">
						<span class="h5" style="line-height: 35px">
							Start Verification
						</span>
					</a>

				</div>
			</div>

			<div class="col-12 col-lg-6 px-4 px-lg-3">
				<div class="card my-card-border p-4 my-5 elux-custom-shadow">
					<h4 class="font-weight-bold">
						Verification Status
					</h4>

					<hr class="px-4">

					<h5 class="mx-3 my-5 font-weight-light">
						<span class="mr-5" v-if="!profileDetails.verified">
							Not verified yet
						</span>
						<span class="mr-5" v-if="profileDetails.verified">
							Verified
						</span>
						<img src="../../assets/img/icons/verified.png" alt="Verified Icon">
					</h5>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import axios from "axios";

export default {
	name: "Verification",
	data() {
		return {
			profileDetails: {},
			verificationURL: ''
		}
	},
	computed: {
		...mapGetters([
			'getSessionDetails',
			'getServerBaseURL',
			'getSessionToken'
		])
	},
	methods: {
		fetchProfileDetails() {
			let baseURL = this.getServerBaseURL;
			let sessionToken = this.getSessionToken;

			axios.post(baseURL + 'user/profile', {}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.profileDetails = res.data.userProfile;
			}).catch(err => {
				// console.log(err.response.data);
			})
		},
		getVerificationURL() {
			let baseURL = this.getServerBaseURL;
			let sessionToken = this.getSessionToken;

			let redirectURL = 'https://aniruddhaganguly.me';
			// let redirectURL = "https://protean-smile-275412.el.r.appspot.com/verificationredirect";

			axios.post(baseURL + 'user/verify/getverificationurl', {
				redirectURL
			}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.verificationURL = res.data.verificationURL;
			}).catch(err => {
				console.log(err.response.data.error);
			})
		}
	}
}
</script>

<style scoped>

.verify-btn-bg {
	background-color: #F3F3F3;
}

.verify-btn-bg:hover {
	background-color: #E3E3E3;
}

.elux-custom-shadow {
	box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}

.elux-color {
	color: #E4A620;
}
</style>
