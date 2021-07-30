<template>
	<div class="container">
		<h4 class="ml-3 mt-5 text-left font-weight-bold">Trending Destinations</h4>
		<div class="row mt-5">
			<div class="col-12 col-lg-3 px-3"
				:key="trendingDestination+index"
				 v-for="(trendingDestination, index) in trendingDestinations">
				<div
					class="border-0 bg-white my-auto text-left">
					<img :src="trendingDestination.image"
						 :alt="trendingDestination.name"
						 class="my-card-border"
						 style="height: 275px; width: 265px">
					<div class="my-bg-overlay-text text-white font-weight-bold my-bg-overlay-text-bottom-2"
						 style="bottom: 50px;">
						{{ trendingDestination.name }}
					</div>
					<button
						class="btn elux-image-remove-button"
						@click="removeTrendingDestination(index)">
						<span style="font-size: 15px;">X</span>
					</button>
				</div>
			</div>
		</div>

		<hr class="my-5">

		<div class="card p-3 my-card-border">

			<h4 class="my-3 font-weight-bold">Add Trending Destination</h4>

			<div class="row">
				<div class="col-12 col-lg-6 mx-auto px-3">
					<h6 class="my-3 ml-3 text-left">Destination Name</h6>
					<input
						type="text"
						class="pl-3 py-2 h6 nl-email border-0 my-card-border elux-custom-shadow w-100"
						v-model="trendingObject.name"
						placeholder="Enter Destination Name">
				</div>
				<div class="col-12 col-lg-6 mx-auto px-3">
					<h6 class="my-3 ml-3 text-left">Destination Type</h6>
					<b-form-select
						class="border-0 my-card-border elux-custom-shadow pl-3"
						v-model="trendingObject.type"
						:options="[
							{value:'AREA', text:'Area'},
							{value:'CITY', text:'City'}
						]">
					</b-form-select>
				</div>


			</div>

			<div class="row mt-4">
				<div class="col-12 mx-auto px-3">
					<label
						for="trending-photo"
						v-if="!imageUploaded"
						class="bg-secondary mx-auto px-5 my-clickable"
						style="width: 250px; height: 250px; border-radius: 15px">

						<i class="fa fa-camera fa-4x text-white"
						   style="transform: translate(0, 110px)">
						</i>

					</label>

					<img
						v-if="imageUploaded"
						:src="trendingObject.image" alt="Profile Photo"
						style="width: 250px; height: 250px; border-radius: 15px">

					<hr class="w-75">
					<h5 class="font-weight-bold">Upload an image from your computer</h5>
					<b-form-file
						id="trending-photo"
						class="mt-3 h6"
						style="border-radius: 15px"
						v-model="uploadedImage"
						accept="image/jpeg, image/png"
						placeholder="Choose an image or drop it here..."
						drop-placeholder="Drop image here...">
					</b-form-file>
					<b-button :disabled="!imageUploaded" @click="removeImage" class="mt-3 mr-5">Remove Image</b-button>
					<b-button :disabled="uploadedImage === null" @click="uploadImage" class="mt-3">Upload Image
					</b-button>
				</div>
			</div>

			<div class="row mb-3">
				<div class="col-12">
					<b-button @click="uploadTrendingDestination"
							  class="mt-5 my-card-border border-0 bg-warning font-weight-bold custom-btn"
							  style="width: 150px">
						<h5 class="pt-1">Upload</h5>
					</b-button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import axios from 'axios';
import TrendingCard from "../home/TrendingCard";

import {mapGetters} from 'vuex';

export default {
	name: "TrendingControl",
	data() {
		return {
			trendingDestinations: [],
			trendingObject: {
				name: '',
				type: '',
				image: ''
			},
			imageUploaded: false,
			uploadedImage: null,
			responseData: null,
		}
	},
	components: {
		'trending-card': TrendingCard
	},
	computed: {
		...mapGetters([
			'getServerBaseURL',
			'getSessionToken'
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
		removeTrendingDestination(idx) {
			let baseURL = this.getServerBaseURL;
			let sessionToken = this.getSessionToken;

			axios.post(baseURL + 'trenddest/delete', {
				trendDestID: this.trendingDestinations[idx]._id
			}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.makeToast('success', 'Success', 'Trending destination removed successfully');
				this.trendingDestinations.splice(idx, 1);

			}).catch(err => {
				this.makeToast('danger', 'Error', err.response.data.message);
				console.log(err);
			});

			this.trendingDestinations.splice(idx, 1);
		},
		removeImage() {
			this.uploadedImage = null;
			this.trendingObject.image = '';
			this.imageUploaded = false;
		},
		uploadImage() {
			let fd = new FormData();
			fd.append('upload_preset', 'USE_YOUR_UPLOAD_PRESET');
			fd.append('folder', 'USE_YOUR_FOLDER');
			fd.append('file', this.uploadedImage);
			axios.post('https://api.cloudinary.com/v1_1/USE_YOUR_USERNAME/upload', fd)
				.then(res => {
					this.responseData = res.data;
					this.trendingObject.image = res.data.secure_url;
					this.imageUploaded = true;
				})
				.catch(err => {
					// console.log(err.response.data);
				});
			this.uploadedImage = null;
		},
		uploadTrendingDestination() {
			let baseURL = this.getServerBaseURL;
			let sessionToken = this.getSessionToken;

			axios.post(baseURL + 'trenddest/insert', {
				trendDestObject: this.trendingObject
			}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.makeToast('success', 'Success', 'Trending destination added successfully');
				this.fetchTrendingDestinations();
			}).catch(err => {
				this.makeToast('danger', 'error', err.response.data.message);
				console.log(err.response.data);
			});

			this.trendingDestinations.push(this.trendingObject);
			this.clearTrendingDestination();
		},
		clearTrendingDestination() {
			this.trendingObject = {
				name: '',
				type: '',
				image: ''
			};
			this.imageUploaded = false;
			this.uploadedImage = null;
		},
		fetchTrendingDestinations() {
			let baseURL = this.getServerBaseURL;

			axios.post(baseURL + 'trenddest/viewall', {}, {})
				.then(res => {
					this.trendingDestinations = res.data.trendingDestinations;
					console.log(this.trendingDestinations);
				})
				.catch(err => {
					console.log(err.response.data);
				});
		}
	},
	mounted() {
		this.fetchTrendingDestinations();
	}
}
</script>

<style scoped>

.elux-custom-shadow {
	box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}

.elux-image-remove-button {
	position: absolute;
	top: 7%;
	right: 7%;
	border: none;
	border-radius: 20px;
	background-color: rgba(0, 0, 0, 0.2);
	color: white;
}

.my-bg-overlay-text {
	position: relative;
	width: 100%;
	text-align: center;
}

.my-bg-overlay-text-bottom-1 {
	bottom: 50px;
	font-size: 23px;
}

.my-bg-overlay-text-bottom-2 {
	bottom: 35px;
	font-size: 18px;
}
</style>
