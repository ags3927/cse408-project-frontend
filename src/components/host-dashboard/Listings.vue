<template>
	<div class="container">

		<div class="row px-5 mt-5 mb-3">
			<div class="col-12 col-lg-3 text-left mr-auto">
				<h5 class="font-weight-bold">{{ getListingCount }}</h5>
			</div>
			<div class="col-12 col-lg-2 custom-text-align ml-auto mt-3 mt-lg-0">
				<button
					@click="$router.push('/addlisting')"
					class="btn btn-warning text-white" style="border-radius: 10px">
					<fa-icon :icon="['fas', 'plus']"></fa-icon>
					Add Listing
				</button>
			</div>
			<div class="col-12 col-lg-3 custom-text-align pl-lg-5 mt-3 mt-lg-0">
				<b-form-input
					placeholder="Search your listing"
					class="border-0 my-card-border elux-custom-shadow px-3"
					v-model="searchText">
				</b-form-input>
			</div>
		</div>

		<div class="row px-5 py-3 mb-3">
		<div class="col-12 text-left"
			 style="border-bottom: 1px solid rgba(200,200,200,0.9)">
			<button class="btn mr-3 mr-lg-5"
					@click="showListings='All'"
					:class="{'custom-active': showListings==='All'}">
				All
			</button>
			<button class="btn mr-3 mr-lg-5"
					@click="showListings='Approved'"
					:class="{'custom-active': showListings==='Approved'}">
				Approved
			</button>
			<button class="btn mr-3 mr-lg-5"
					@click="showListings='Pending'"
					:class="{'custom-active': showListings==='Pending'}">
				Pending
			</button>
		</div>
	</div>

		<div class="card outer-card mb-5 card-overflow-x">

			<div class="row mt-3 px-5" style="min-width: 1000px">
				<div class="col-3 text-left pr-3">
					<h6 class="font-weight-bold">Title</h6>
				</div>
				<div class="col-3 text-left">
					<h6 class="font-weight-bold">Location</h6>
				</div>
				<div class="col-2 text-left">
					<h6 class="font-weight-bold">Status</h6>
				</div>
				<div class="col-2 text-left">
					<h6 class="font-weight-bold">Type</h6>
				</div>
				<div class="col-2 text-left">
					<h6 class="font-weight-bold">Modification</h6>
				</div>
			</div>

			<hr class="mx-4">

			<div v-for="(listing, index) in listings" v-if="checkVisibility(listing)">
				<div class="row px-5 mb-3" style="min-width: 1000px">

					<div class="col-3 text-left pr-3">
						<button
							@click="$router.push({
								path: '/details',
								query: {
									id: listing._id
								}
							})"
							class="h6 btn bg-transparent p-0 font-weight-light text-warning text-left">
							{{ listing.title }}
						</button>
					</div>

					<div class="col-3 text-left">
						<h6 class="font-weight-light">{{ listing.location.streetAddress }}</h6>
						<h6 class="font-weight-light">{{ listing.location.area }}</h6>
						<h6 class="font-weight-light">{{ listing.location.city }}</h6>
					</div>

					<div class="col-2 text-left">
						<h6 class="font-weight-bold"
							:class="{'text-success': listing.isApproved, 'text-danger': !listing.isApproved}">
							{{ listing.isApproved ? 'Approved' : 'Pending' }}
						</h6>
					</div>

					<div class="col-2 text-left">
						<h6 class="font-weight-light">{{ listing.typeOfProperty }}</h6>
					</div>

					<div class="col-2 text-left">
						<button
							@click="editListing(listing)"
							class="btn btn-warning px-4 py-2 text-white"
							style="border-radius: 10px">
							Edit
						</button>
					</div>
					<hr class="mx-4 my-4 text-dark" v-if="index < listings.length-1">

				</div>
			</div>

		</div>
	</div>
</template>

<script>
import moment from 'moment';
import {mapGetters} from "vuex";

import {library} from '@fortawesome/fontawesome-svg-core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

library.add(faPlus);

export default {
	name: "Listings",
	data() {
		return {
			listings: [
			],
			searchText: '',
			showListings: 'All'
		}
	},
	computed: {
		...mapGetters([
			'getSessionToken',
			'getServerBaseURL'
		]),
		getListingCount() {
			return this.listings.length !== 1 ? this.listings.length.toString() + ' Listings' : '1 Listing';
		}
	},
	methods: {
		checkVisibility(listing) {
			if (this.showListings === 'All' && listing.title.includes(this.searchText)) return true;
			else if (this.showListings === 'Approved' && listing.title.includes(this.searchText)) return listing.isApproved;
			else if (this.showListings === 'Pending' && listing.title.includes(this.searchText)) return !listing.isApproved;
		},
		editListing(listing) {
			this.$router.push({
				path: '/editlisting',
				query: {
					id: listing._id
				}
			});
		},
		fetchProperties() {
			let sessionToken = this.getSessionToken;
			let baseURL = this.getServerBaseURL;

			axios.post(baseURL + 'user/properties', {}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				// console.log(res.data.properties);
				this.listings = res.data.properties;
			}).catch(err => {
				console.log(err.response);
			});
		},
		fetchFeaturedStays() {

		}
	},
	mounted() {
		this.fetchProperties();
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

@media (max-width: 767px) {
	.card-overflow-x {
		overflow-x: scroll;
	}
}

@media (max-width: 767px) {
	.custom-text-align {
		text-align: left!important;
	}
}

@media (min-width: 768px) {
	.custom-text-align {
		text-align: right!important;
	}
}

.elux-custom-shadow {
	box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}

.elux-color {
	color: #E4A620;
}

.custom-active {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	border-bottom: 3px solid #e0a800;
	font-weight: bold;
}


</style>
