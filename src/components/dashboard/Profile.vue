<template>
	<div class="container">
		<div class="card my-5 my-card-border elux-custom-shadow mx-3">
			<h4 class="font-weight-bold mt-5 mb-3">Personal Info</h4>
			<hr class="mx-4 mb-3">

			<div class="row px-4 mb-5">

				<div class="col-12 col-lg-5 px-5 mb-5 mt-lg-0 hide-lg">
					<div class="row">
						<div class="col-12">
							<img :src="profileDetails.image"
								 alt="Profile Image"
								 class="mx-auto mb-5"
								 style="width: 200px; border-radius: 250px">
						</div>
					</div>

					<button
						@click="$router.push('/editprofile')"
						class="btn btn-warning mx-auto text-white px-4"
						style="border-radius: 10px">
						Edit Profile
					</button>
				</div>

				<div class="col-12 col-lg-7 text-left px-5">

					<h5 class="font-weight-bold">Name</h5>
					<h5 class="font-weight-light">
						{{ profileDetails.name.firstName }} {{ profileDetails.name.lastName }}
					</h5>

					<hr class="mx-3">

					<h5 class="font-weight-bold">Gender</h5>
					<h5 class="font-weight-light">
						{{ formatGender }}
					</h5>

					<hr class="mx-3">

					<h5 class="font-weight-bold">Date of Birth</h5>
					<h5 class="font-weight-light">
						{{ formatBirthdate }}
					</h5>

					<hr class="mx-3">

					<h5 class="font-weight-bold">Phone Number</h5>
					<h5 class="font-weight-light">
						{{ profileDetails.contacts.phone }}
					</h5>

					<hr class="mx-3">

					<h5 class="font-weight-bold">Address</h5>
					<h5 class="font-weight-light">
						{{ profileDetails.contacts.address.streetAddress }},
						{{ profileDetails.contacts.address.area }}, {{ profileDetails.contacts.address.city }}
					</h5>

					<hr class="mx-3">

					<h5 class="font-weight-bold">Government ID</h5>
					<h5 class="font-weight-light">
						{{ profileDetails.govtID }}
					</h5>

					<hr class="mx-3">

					<h5 class="font-weight-bold">Emergency Contact</h5>
					<h5 class="font-weight-light">
						{{ profileDetails.contacts.emergencyContact.phone }}
					</h5>


				</div>

				<div class="col-12 col-lg-5 px-5 mt-5 mt-lg-0 hide-sm">
					<div class="row">
						<div class="col-12">
							<img :src="profileDetails.image"
								 alt="Profile Image"
								 class="mx-auto mb-5"
								 style="width: 200px; border-radius: 250px">
						</div>
					</div>

					<button
						@click="$router.push('/editprofile')"
						class="btn btn-warning mx-auto text-white px-4"
						style="border-radius: 10px">
						Edit Profile
					</button>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import {mapGetters} from 'vuex';

export default {
	name: "Profile",
	data() {
		return {
			profileDetails: {}
		}
	},
	computed: {
		...mapGetters([
			'getSessionDetails',
			'getSessionToken',
			'getServerBaseURL'
		]),
		formatGender() {
			return this.profileDetails.gender === 'MALE' ? 'Male' : (this.profileDetails.gender === 'FEMALE' ? 'Female' : 'Other');
		},
		formatBirthdate() {
			let bD = moment(this.profileDetails.birthDate);
			return bD.format('MMMM DD, YYYY');
		}
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
				// console.log(this.profileDetails);
			}).catch(err => {
				// console.log(err);
			});
		}
	},
	mounted() {
		this.fetchProfileDetails();
	}
}
</script>

<style scoped>
@media (max-width: 575px) {
	.hide-sm {
		display: none;
	}
}

@media (min-width: 576px) {
	.hide-lg {
		display: none;
	}
}

.elux-custom-shadow {
	box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}

.detail-btn-bg {
	background-color: #F3F3F3;
}

.detail-btn-bg:hover {
	background-color: #E3E3E3;
}


</style>
