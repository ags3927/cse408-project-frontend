<template>
	<div class="container">
		<div class="card my-card-border p-4 my-5 mx-3 mx-lg-auto">

			<div id="edit-profile-01" class="px-lg-3" v-if="getShowCard(1)">

				<h4 class="font-weight-bold text-center">Address</h4>
				<hr>

				<div class="row w-100 mx-auto">
					<div class="col-12 col-lg-6 px-3">
						<h5 :class="titleClass">Area</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="text"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="profileDetails.contacts.address.area"
								placeholder="Enter Area">
						</div>
					</div>
					<div class="col-12 col-lg-6 px-3">
						<h5 :class="titleClass">City</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="text"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="profileDetails.contacts.address.city"
								placeholder="Enter City">
						</div>
					</div>
				</div>

				<div class="px-3">
					<h5 :class="titleClass">Zip Code</h5>
					<div class="card w-100 my-card-border mt-3">
						<input
							type="text"
							class="ml-3 nl-email border-0 my-2"
							style="width: 94%"
							v-model="profileDetails.contacts.address.zipCode"
							placeholder="Enter Street Address">
					</div>
				</div>

				<div class="px-3">
					<h5 :class="titleClass">Street Address</h5>
					<div class="card w-100 my-card-border mt-3">
						<input
							type="text"
							class="ml-3 nl-email border-0 my-2"
							style="width: 94%"
							v-model="profileDetails.contacts.address.streetAddress"
							placeholder="Enter Street Address">
					</div>
				</div>
			</div>

			<div id="edit-profile-02" class="px-3" v-if="getShowCard(2)">

				<h4 class="font-weight-bold text-center">Information</h4>
				<hr>

				<div class="row w-100 mx-auto">
					<div class="col-12 col-lg-6 px-lg-3">
						<h5 :class="titleClass">First Name</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="text"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="profileDetails.name.firstName"
								placeholder="Enter First Name">
						</div>
					</div>
					<div class="col-12 col-lg-6 px-lg-3">
						<h5 :class="titleClass">Last Name</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="text"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="profileDetails.name.lastName"
								placeholder="Enter Last Name">
						</div>
					</div>
				</div>

				<div class="row w-100 mx-auto">
					<div class="col-12 col-lg-6 px-lg-3">
						<h5 :class="titleClass">Gender</h5>
						<div class="card my-card-border mt-3 w-100">
							<b-form-select
								class="border-0 bg-transparent"
								v-model="profileDetails.gender"
								:options="[
									{value:'MALE', text: 'Male'},
									{value:'FEMALE', text: 'Female'},
									{value: 'OTHER', text: 'Other'}
								]">

							</b-form-select>
						</div>
					</div>
					<div class="col-12 col-lg-6 px-lg-3">
						<h5 :class="titleClass">Date of Birth</h5>
						<div class="card border-0 mt-3 w-100">
							<v-date-picker
								id="birthdate-picker"
								class="border-0 bg-transparent"
								v-model="profileDetails.birthDate"
								mode="single">
							</v-date-picker>
						</div>
					</div>
				</div>

				<div class="row w-100 mx-auto">
					<div class="col-12 col-lg-6 px-lg-3">
						<h5 :class="titleClass">Email Address</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="text"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="profileDetails.contacts.email"
								placeholder="Enter Email Address">
						</div>
					</div>
					<div class="col-12 col-lg-6 px-lg-3">
						<h5 :class="titleClass">Phone Number</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="text"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="profileDetails.contacts.phone"
								placeholder="Enter Phone Number">
						</div>
					</div>
				</div>

			</div>

			<div id="edit-profile-03" class="px-3 align-items-center" v-if="getShowCard(3)">

				<h4 class="font-weight-bold text-center">Photo</h4>
				<hr>

				<label
					for="profile-photo"
					v-if="!imageUploaded"
					class="bg-secondary mx-auto px-5 my-clickable"
					style="width: 200px; height: 200px; border-radius: 300px">

					<i class="fa fa-camera fa-4x text-white"
					   style="transform: translate(0, 80px)">
					</i>

				</label>

				<img
					v-if="imageUploaded"
					:src="profileDetails.image" alt="Profile Photo"
					style="width: 200px; height: 200px; border-radius: 300px">

				<hr class="w-75">
				<h5 class="font-weight-bold">Upload an image from your computer</h5>

				<b-form-file
					id="profile-photo"
					class="mt-3"
					v-model="uploadedImage"
					accept="image/jpeg, image/png"
					placeholder="Choose an image or drop it here..."
					drop-placeholder="Drop image here...">
				</b-form-file>

				<div class="row">
					<div class="col-12 col-lg-3 ml-lg-auto">
						<b-button
							@click="removeImage"
							class="mt-3"
							:disabled="profileDetails.image === ''">
							Remove Image
						</b-button>
					</div>
					<div class="col-12 col-lg-3 mr-lg-auto">
						<b-button
							@click="uploadImage"
							class="mt-3"
							:disabled="uploadedImage === null">
							Upload Image
						</b-button>
					</div>
				</div>

			</div>

			<div id="edit-profile-04" class="px-3" v-if="getShowCard(4)">

				<h4 class="font-weight-bold text-center">Emergency Contact</h4>
				<hr>

				<div class="px-lg-3">
					<h5 :class="titleClass">Contact Name</h5>
					<div class="card w-100 my-card-border mt-3">
						<input
							type="text"
							class="ml-3 nl-email border-0 my-2"
							style="width: 94%"
							v-model="profileDetails.contacts.emergencyContact.name"
							placeholder="Enter Name">
					</div>
				</div>

				<div class="row w-100 mx-auto">
					<div class="col-12 col-lg-6 px-lg-3">
						<h5 :class="titleClass">Email</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="email"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="profileDetails.contacts.emergencyContact.email"
								placeholder="Enter Email">
						</div>
					</div>
					<div class="col-12 col-lg-6 px-lg-3">
						<h5 :class="titleClass">Relationship</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="text"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="profileDetails.contacts.emergencyContact.relationship"
								placeholder="Enter Relationship">
						</div>
					</div>
				</div>

				<div class="px-lg-3">
					<h5 :class="titleClass">Phone Number</h5>
					<div class="card w-100 my-card-border mt-3">
						<input
							type="text"
							class="ml-3 nl-email border-0 my-2"
							style="width: 94%"
							v-model="profileDetails.contacts.emergencyContact.phone"
							placeholder="Enter Phone Number">
					</div>
				</div>

			</div>

			<div id="edit-profile-05" class="px-3" v-if="getShowCard(5)">

				<h4 class="text-center">Language</h4>
				<hr>

				<div class="px-3">
					<h5 :class="titleClass" class="mb-4">Select the language(s) you are comfortable interacting in</h5>
					<b-form-checkbox
						v-for="language in hostLanguages"
						class="text-left mt-3 h6"
						style="line-height: 27px; margin-left: 1rem"
						v-model="profileDetails.language"
						:key="language"
						:value="language">
						{{ language }}
					</b-form-checkbox>
				</div>

			</div>

			<div id="edit-profile-06" class="px-3" v-if="getShowCard(6)">

				<h4 class="font-weight-bold text-center">Government Id</h4>
				<hr>

				<div class="px-lg-3">
					<h5 :class="titleClass">Id Number</h5>
					<div class="card w-100 my-card-border mt-3">
						<input
							type="text"
							class="ml-3 nl-email border-0 my-2"
							style="width: 94%"
							v-model="profileDetails.govtID"
							placeholder="Enter Government Id Number">
					</div>
				</div>

			</div>

			<div class="mt-4 ">
				<div class="row">
					<div class="col-12 col-lg-3 ml-lg-auto">
						<b-button @click="prevCard"
								  class="mt-5 my-card-border border-0 font-weight-bold custom-btn"
								  style="width: 150px">
							<h5 class="pt-1">Back</h5>
						</b-button>
					</div>
					<div class="col-12 col-lg-3 mr-lg-auto">
						<b-button @click="nextCard"
								  v-if="showCard<6"
								  class="mt-3 mt-lg-5 my-card-border border-0 bg-warning font-weight-bold custom-btn"
								  style="width: 150px">
							<h5 class="pt-1">Next</h5>
						</b-button>
						<b-button @click="save"
								  v-if="showCard===6"
								  class="mt-3 mt-lg-5 my-card-border border-0 bg-warning font-weight-bold custom-btn"
								  style="width: 150px">
							<h5 class="pt-1">Save</h5>
						</b-button>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';

import {Toast} from "../../store/Toast";

import axios from 'axios';

export default {
	name: "EditProfile",
	data() {
		return {
			profileDetails: {
				verified: false,
				image: '',
				name: {
					firstName: '',
					lastName: ''
				},
				gender: '',
				birthDate: '',
				contacts: {
					email: '',
					phone: '',
					address: {
						country: 'USA',
						state: '',
						city: '',
						zipCode: '',
						streetAddress: ''
					},
					emergencyContact: {
						name: '',
						email: '',
						relationship: '',
						phone: ''
					}
				},
				govtID: '',
				operatingTime: '',
				language: []
			},
			showCard: 1,
			titleClass: 'text-left font-weight-bold mt-4 ml-3',
			imageUploaded: false,
			uploadedImage: null,
			responseData: null,
			emergencyContactWarning: true,
			hostLanguages: [
				'English',
				'French',
				'German',
				'Japanese',
				'Italian',
				'Russian',
				'Spanish',
				'Chinese (Simplified)',
				'Arabic',
				'Hindi',
				'Portuguese',
				'Turkish',
				'Indonesian',
				'Dutch',
				'Korean',
				'Bengali',
				'Punjabi',
				'Sign',
				'Hebrew',
				'Polish',
				'Malay',
				'Tagalog',
				'Danish',
				'Swedish'
			]
		}
	},
	computed: {
		...mapGetters([
			'getSessionToken',
			'getSignupDetails',
			'getServerBaseURL',
			'getSessionDetails'
		])
	},
	methods: {
		...mapMutations([
			'setSessionToken',
			'setSessionDetails',
			'setLoggedIn'
		]),
		makeToast(variant = null, title, body) {
			this.$bvToast.toast(body, {
				title: title,
				variant: variant,
				toaster: 'b-toaster-bottom-left',
				solid: true
			})
		},
		onSelectedFile(event) {
			this.uploadedImage = event.target.files[0];
		},
		removeImage() {
			this.uploadedImage = null;
			this.profileDetails.image = '';
			this.imageUploaded = false;
		},
		uploadImage() {
			let fd = new FormData();
			fd.append('upload_preset', 'USE_YOUR_UPLOAD_PRESET');
			fd.append('folder', 'USE_YOUR_FOLDER');
			fd.append('file', this.uploadedImage);
			this.uploadedImage = null;
			axios.post('https://api.cloudinary.com/v1_1/USE_YOUR_USERNAME/upload', fd)
				.then(res => {
					this.responseData = res.data;
					this.profileDetails.image = res.data.secure_url;
					this.imageUploaded = true;
				})
				.catch(err => {
					// console.log(err);
				});
		},
		fetchProfileDetails() {
			let baseURL = this.getServerBaseURL;
			let sessionToken = this.getSessionToken;

			axios.post(baseURL + 'user/profile', {}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.profileDetails = res.data.userProfile;
				this.profileDetails.birthDate = new Date(this.profileDetails.birthDate);
				if (this.profileDetails.image !== '') this.imageUploaded = true;
				// console.log(this.profileDetails);
			}).catch(err => {
				// console.log(err);
			})
		},
		validateInputs() {
			if (this.showCard === 1) {
				if (this.profileDetails.contacts.address.country === '' ||
					this.profileDetails.contacts.address.area === '' ||
					this.profileDetails.contacts.address.city === '' ||
					this.profileDetails.contacts.address.streetAddress === '' ||
					this.profileDetails.contacts.address.zipCode === '') {
					this.makeToast('danger', 'Error', 'Please enter all location details before proceeding');
					return false;
				}
				return true;
			} else if (this.showCard === 2) {
				if (this.profileDetails.name.firstName === '' ||
					this.profileDetails.name.lastName === '' ||
					this.profileDetails.gender === '' ||
					this.profileDetails.birthDate === '' ||
					this.profileDetails.contacts.email === '' ||
					this.profileDetails.contacts.phone === '') {
					this.makeToast('danger', 'Error', 'Please enter all personal information before proceeding');
					return false;
				}
			} else if (this.showCard === 3) {
				if (this.profileDetails.image === '' || this.profileDetails.image === null) {
					this.makeToast('danger', 'Error', 'Please upload a photo before proceeding');
					return false;
				}
			} else if (this.showCard === 4) {
				if (this.emergencyContactWarning && (
					this.profileDetails.contacts.emergencyContact.name === '' ||
					this.profileDetails.contacts.emergencyContact.relationship === '' ||
					this.profileDetails.contacts.emergencyContact.phone === '' ||
					this.profileDetails.contacts.emergencyContact.email === ''
				)) {
					this.emergencyContactWarning = false;
					this.makeToast('warning', 'Warning', 'Do you want to proceed without entering all emergency contact information?');
					return false;
				}
				return true;
			} else if (this.showCard === 5) {
				if (this.profileDetails.govtID === '') {
					this.makeToast('danger', 'Error', 'Please enter government ID before proceeding');
					return false;
				}
				return true;
			}
			return true;
		},
		nextCard() {
			if (!this.validateInputs()) return;
			else this.showCard++;
		},
		prevCard() {
			if (this.showCard >= 2) this.showCard--;
			else this.$router.push('/profile');
		},
		getShowCard(id) {
			return this.showCard === id;
		},
		validEmail: function (email) {
			let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},
		save() {

			if (!this.validateInputs()) return;

			let sessionToken = this.getSessionToken;

			let baseURL = this.getServerBaseURL;

			axios.post(baseURL + 'user/update', {
				userDetailObject: this.profileDetails
			}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				let sessionDetails = this.getSessionDetails;
				sessionDetails.image = this.profileDetails.image;
				sessionDetails.userMode = 'GUEST';
				this.setSessionDetails(sessionDetails);
				// console.log(res.data);
				this.$router.push('/profile');
			}).catch(err => {
				// console.log(err.data);
			});

		}
	},
	mounted() {
		this.fetchProfileDetails();
	}
}
</script>

<style scoped>

.custom-btn:focus {
	outline: none;
	box-shadow: none;
}

input {
	font-size: medium
}
</style>
