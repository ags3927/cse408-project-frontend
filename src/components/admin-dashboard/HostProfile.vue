<template>
	<div class="container">
		<div class="card my-5 my-card-border elux-custom-shadow mx-3">
			<h4 class="font-weight-bold mt-5 mb-3">Personal Info</h4>
			<hr class="mx-4 mb-3">

			<div class="row px-4 mb-5">
				<div class="col-12 col-lg-7 text-left px-5">

					<h5 class="font-weight-bold">Name</h5>
					<h5 class="font-weight-light">
						{{ hostProfile.name.firstName }} {{ hostProfile.name.lastName }}
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
						{{ hostProfile.contacts.phone }}
					</h5>

					<hr class="mx-3">

					<h5 class="font-weight-bold">Address</h5>
					<h5 class="font-weight-light">
						{{ hostProfile.contacts.address.streetAddress }},
						{{ hostProfile.contacts.address.area }}, {{ hostProfile.contacts.address.city }}
					</h5>

					<hr class="mx-3">

					<h5 class="font-weight-bold">Government ID</h5>
					<h5 class="font-weight-light">
						{{ hostProfile.govtID }}
					</h5>

					<hr class="mx-3">

					<h5 class="font-weight-bold">Emergency Contact</h5>
					<h5 class="font-weight-light">
						{{ hostProfile.contacts.emergencyContact.phone }}
					</h5>


				</div>

				<div class="col-12 col-lg-5 px-5 mt-5 mt-lg-0">
					<div class="row">
						<div class="col-12">
							<img :src="hostProfile.image"
								 alt="Profile Image"
								 class="mx-auto mb-5"
								 style="width: 200px; border-radius: 250px">
						</div>
					</div>

				</div>
			</div>

		</div>
	</div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

import {mapGetters} from 'vuex';

export default {
	name: "HostProfile",
	data() {
		return {
			hostProfile: {

			}
		}
	},
	computed: {
		...mapGetters([
			'getSessionToken',
			'getServerBaseURL'
		]),
		formatGender() {
			return this.hostProfile.gender === 'MALE' ? 'Male' : (this.hostProfile.gender === 'FEMALE' ? 'Female' : 'Other');
		},
		formatBirthdate() {
			let bD = moment(this.hostProfile.birthDate);
			return bD.format('MMMM DD, YYYY');
		}
	},
	mounted() {
		let hostID = this.$route.query.hostID;
		let baseURL = this.getServerBaseURL;
		let sessionToken = this.getSessionToken;

		axios.post( baseURL + 'user/viewbyid', {
            userDetailID: hostID
		}, {
			headers: {
				'x-auth': sessionToken
			}
		}).then(res => {
			this.hostProfile = res.data.hostProfile;
			// console.log(this.hostProfile);
		}).catch(err => {
			console.log(err.response.data);
		});
	}
}
</script>

<style scoped>
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
