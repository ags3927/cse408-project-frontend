<template>
	<div class="container">
		<div class="card my-card-border p-4 my-5">

			<div id="signup-01" class="px-3" v-if="getShowCard(1)">

				<h4 class="text-center">Address</h4>
				<hr>

				<div class="px-3">
					<h5 :class="titleClass">Country</h5>
					<div class="card w-100 my-card-border mt-3">
						<input
							type="text"
							class="ml-3 nl-email border-0 my-2"
							style="width: 96%"
							v-model="signupDetails.contacts.address.country"
							placeholder="Enter Street Address">
					</div>
				</div>

				<div class="row w-100 mx-auto">
					<div class="col-12 col-lg-6 px-3">
						<h5 :class="titleClass">Area</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="text"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="signupDetails.contacts.address.area"
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
								v-model="signupDetails.contacts.address.city"
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
							style="width: 96%"
							v-model="signupDetails.contacts.address.zipCode"
							placeholder="Enter Street Address">
					</div>
				</div>

				<div class="px-3">
					<h5 :class="titleClass">Street Address</h5>
					<div class="card w-100 my-card-border mt-3">
						<input
							type="text"
							class="ml-3 nl-email border-0 my-2"
							style="width: 96%"
							v-model="signupDetails.contacts.address.streetAddress"
							placeholder="Enter Street Address">
					</div>
				</div>
			</div>

			<div id="signup-02" class="px-3" v-if="getShowCard(2)">

				<h4 class="text-center">Information</h4>
				<hr>

				<div class="row w-100 mx-auto">
					<div class="col-12 col-lg-6 px-3">
						<h5 :class="titleClass">First Name</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="text"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="signupDetails.name.firstName"
								placeholder="Enter First Name">
						</div>
					</div>
					<div class="col-12 col-lg-6 px-3">
						<h5 :class="titleClass">Last Name</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="text"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="signupDetails.name.lastName"
								placeholder="Enter Last Name">
						</div>
					</div>
				</div>

				<div class="row w-100 mx-auto">
					<div class="col-12 col-lg-6 px-3">
						<h5 :class="titleClass">Gender</h5>
						<div class="card my-card-border mt-3 w-100">
							<b-form-select
								class="border-0 bg-transparent"
								v-model="signupDetails.gender"
								:options="[
									{value:'MALE', text: 'Male'},
									{value:'FEMALE', text: 'Female'},
									{value: 'OTHER', text: 'Other'}
								]">
							</b-form-select>
						</div>
					</div>
					<div class="col-12 col-lg-6 px-3">
						<h5 :class="titleClass">Date of Birth</h5>
						<div class="card my-card-border mt-3 w-100">
							<v-date-picker
								mode="single"
								v-model="signupDetails.birthDate"
								style="border: transparent">
							</v-date-picker>
						</div>
					</div>
				</div>

				<div class="row w-100 mx-auto">
					<div class="col-12 col-lg-6 px-3">
						<h5 :class="titleClass">Email Address</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="text"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="signupDetails.contacts.email"
								placeholder="Enter Email Address">
						</div>
					</div>
					<div class="col-12 col-lg-6 px-3">
						<h5 :class="titleClass">Phone Number</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="text"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="signupDetails.contacts.phone"
								placeholder="Enter Phone Number">
						</div>
					</div>
				</div>

			</div>

			<div id="signup-03" class="px-3 align-items-center" v-if="getShowCard(3)">

				<h4 class="text-center">Photo</h4>

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
					:src="signupDetails.image" alt="Profile Photo"
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
				<b-button :disabled="!imageUploaded" @click="removeImage" class="mt-3 mr-5">Remove Image</b-button>
				<b-button :disabled="uploadedImage === null" @click="uploadImage" class="mt-3">Upload Image</b-button>
			</div>

			<div id="signup-04" class="px-3" v-if="getShowCard(4)">

				<h4 class="text-center">Emergency Contact</h4>
				<hr>

				<div class="px-3">
					<h5 :class="titleClass">Contact Name</h5>
					<div class="card w-100 my-card-border mt-3">
						<input
							type="text"
							class="ml-3 nl-email border-0 my-2"
							style="width: 96%"
							v-model="signupDetails.contacts.emergencyContact.name"
							placeholder="Enter Name">
					</div>
				</div>

				<div class="row w-100 mx-auto">
					<div class="col-12 col-lg-6 px-3">
						<h5 :class="titleClass">Email</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="email"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="signupDetails.contacts.emergencyContact.email"
								placeholder="Enter Email">
						</div>
					</div>
					<div class="col-12 col-lg-6 px-3">
						<h5 :class="titleClass">Relationship</h5>
						<div class="card my-card-border mt-3 w-100">
							<input
								type="text"
								class="ml-3 nl-email border-0 my-2"
								style="width: 94%"
								v-model="signupDetails.contacts.emergencyContact.relationship"
								placeholder="Enter Relationship">
						</div>
					</div>
				</div>

				<div class="px-3">
					<h5 :class="titleClass">Phone Number</h5>
					<div class="card w-100 my-card-border mt-3">
						<input
							type="text"
							class="ml-3 nl-email border-0 my-2"
							style="width: 96%"
							v-model="signupDetails.contacts.emergencyContact.phone"
							placeholder="Enter Phone Number">
					</div>
				</div>

			</div>

			<div id="signup-05" class="px-3" v-if="getShowCard(5)">

				<h4 class="text-center">Language</h4>
				<hr>

				<div class="px-3">
					<h5 :class="titleClass" class="mb-4">Select the language(s) you are comfortable interacting in</h5>
					<b-form-checkbox
						v-for="language in hostLanguages"
						class="text-left mt-3 h6"
						style="line-height: 27px; margin-left: 1rem"
						v-model="signupDetails.language"
						:key="language"
						:value="language">
						{{ language }}
					</b-form-checkbox>
				</div>

			</div>

			<div id="signup-06" class="px-3" v-if="getShowCard(6)">

				<h4 class="text-center">Government Id</h4>
				<hr>

				<div class="px-3">
					<h5 :class="titleClass">Id Number</h5>
					<div class="card w-100 my-card-border mt-3">
						<input
							type="text"
							class="ml-3 nl-email border-0 my-2"
							style="width: 96%"
							v-model="signupDetails.govtID"
							placeholder="Enter Government Id Number">
					</div>
				</div>

			</div>

			<div class="mt-4 align-items-center">
				<b-button @click="prevCard"
						  class="mt-5 mr-5 my-card-border border-0 font-weight-bold custom-btn"
						  style="width: 150px">
					<h5 class="pt-1">Back</h5>
				</b-button>
				<b-button @click="nextCard"
						  v-if="showCard<6"
						  class="mt-5 my-card-border border-0 bg-warning font-weight-bold custom-btn"
						  style="width: 150px">
					<h5 class="pt-1">Next</h5>
				</b-button>
				<b-button @click="signup"
						  v-if="showCard===6"
						  class="mt-5 my-card-border border-0 bg-warning font-weight-bold custom-btn"
						  style="width: 150px">
					<h5 class="pt-1">Finish</h5>
				</b-button>
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
	name: "Signup",
	data() {
		return {
			signupDetails: {
				username: '',
				password: '',
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
			'getSignupDetails',
			'getServerBaseURL'
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
			this.signupDetails.image = '';
			this.imageUploaded = false;
		},
		uploadImage() {
			let fd = new FormData();
			fd.append('upload_preset', 'USE_YOUR_UPLOAD_PRESET');
			fd.append('folder', 'USE_YOUR_FOLDER');
			fd.append('file', this.uploadedImage);
			axios.post('https://api.cloudinary.com/v1_1/USER_YOUR_USERNAME/upload', fd)
				.then(res => {
					this.responseData = res.data;
					this.signupDetails.image = res.data.secure_url;
					this.imageUploaded = true;
				})
				.catch(err => {
					console.log(err);
				});
			this.uploadedImage = null;
		},
		populateFields() {
			let stateInfo = this.getSignupDetails;
			this.signupDetails.username = stateInfo.username;
			this.signupDetails.password = stateInfo.password;
		},
		validateInputs() {
			if (this.showCard === 1) {
				if (this.signupDetails.contacts.address.country === '' ||
					this.signupDetails.contacts.address.area === '' ||
					this.signupDetails.contacts.address.city === '' ||
					this.signupDetails.contacts.address.streetAddress === '' ||
					this.signupDetails.contacts.address.zipCode === '') {
					this.makeToast('danger', 'Error', 'Please enter all location details before proceeding');
					return false;
				}
				return true;
			} else if (this.showCard === 2) {
				if (this.signupDetails.name.firstName === '' ||
					this.signupDetails.name.lastName === '' ||
					this.signupDetails.gender === '' ||
					this.signupDetails.birthDate === '' ||
					this.signupDetails.contacts.email === '' ||
					this.signupDetails.contacts.phone === '') {
					this.makeToast('danger', 'Error', 'Please enter all personal information before proceeding');
					return false;
				}
			} else if (this.showCard === 3) {
				if (this.signupDetails.image === '' || this.signupDetails.image === null) {
					this.makeToast('danger', 'Error', 'Please upload a photo before proceeding');
					return false;
				}
			} else if (this.showCard === 4) {
				if (this.emergencyContactWarning && (
					this.signupDetails.contacts.emergencyContact.name === '' ||
					this.signupDetails.contacts.emergencyContact.relationship === '' ||
					this.signupDetails.contacts.emergencyContact.phone === '' ||
					this.signupDetails.contacts.emergencyContact.email === ''
				)) {
					this.emergencyContactWarning = false;
					this.makeToast('warning', 'Warning', 'Do you want to proceed without entering all emergency contact information?');
					return false;
				}
				return true;
			} else if (this.showCard === 5) {
				if (this.signupDetails.language.length === 0) {
					this.makeToast('danger', 'Error', 'Please select at least one language before proceeding');
					return false;
				}
				return true;
			} else if (this.showCard === 6) {
				if (this.signupDetails.govtID === '') {
					this.makeToast('danger', 'Error', 'Please enter government ID before proceeding');
					return false;
				}
				return true;
			}
			return true;
		},
		nextCard() {
			if (!this.validateInputs()) return;
			this.showCard++;
		},
		prevCard() {
			if (this.showCard > 1) this.showCard--;
		},
		getShowCard(id) {
			return this.showCard === id;
		},
		validEmail: function (email) {
			let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},
		login(baseURL, userObject) {
			axios.post(baseURL + 'login', userObject)
				.then(res => {
					// console.log(res.data);
					if (res.status === 201) {
						this.setSessionToken(res.data.token);
						axios.post(baseURL + 'user/details', {}, {
							headers: {
								'x-auth': res.data.token
							}
						}).then(res => {
							let sessionDetails = res.data.sessionDetails;
							sessionDetails.userMode = 'GUEST';
							this.setSessionDetails(sessionDetails);
							this.setLoggedIn();
						}).catch(err => {
							// console.log(err);
						});
					} else {
						// console.log(res);
					}
				})
				.catch(err => {
					// console.log(err);
				});
		},
		signup() {
			console.log(this.signupDetails);

			if (this.signupDetails.username === '' || this.signupDetails.password === '') {
				this.makeToast('danger', 'Error', 'There was an error, please start signup process again.');
				return;
			}

			if (!this.validateInputs()) return;


			let signupState = this.getSignupDetails;

			let userObject = {
				username: signupState.username,
				password: signupState.password,
				userEmail: this.signupDetails.contacts.email
			};

			let userDetailObject = {
				username: signupState.username,
				verified: false,
				image: this.signupDetails.image,
				name: {
					firstName: this.signupDetails.name.firstName,
					lastName: this.signupDetails.name.lastName
				},
				gender: this.signupDetails.gender.toUpperCase(),
				birthDate: this.signupDetails.birthDate,
				contacts: this.signupDetails.contacts,
				govtID: this.signupDetails.govtID,
				language: this.signupDetails.language
			};

			let baseURL = this.getServerBaseURL;

			axios.post(baseURL + 'user/register', {
				userObject,
				userDetailObject
			}).then(res => {
				this.login(baseURL, userObject);
				this.makeToast('success', 'Success', 'Signed up successfully!');
				this.$router.push('/');
			}).catch(err => {
				console.log(err.response.data);
			});
		}
	},
	mounted() {
		this.populateFields();
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
