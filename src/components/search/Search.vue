<template>
	<div class="container">
		<search-filter
			class="px-3 px-lg-0"
			:search-filters="parsedFilterDetails"
			@searchwithfilters="transferredEvent($event)">
		</search-filter>

		<section style="margin-top: 4rem">
			<div class="container">

				<div class="row text-left my-5 instant-book-left-margin">
					<div class="col-10 col-md-4 col-lg-3 col-xl-2 text-left mx-auto mx-md-0 mr-xl-4">

						<toggle-button
							class="mr-4 "
							color="#20a6e4"
							v-model="instantBook"/>

						<span style="font-weight: bold;" class="h6">
							Instant Book
						</span>

					</div>
					<div class="col-10 col-md-8 col-lg-6 text-left mx-auto mx-md-0">
					<span class="h6 text-secondary"
						  style="font-size: medium; line-height: 25px">
						Only see places that can be instantly booked.
					</span>
					</div>
				</div>


				<h3 class="text-left ml-4 ml-lg-0" style="font-size: 25px; font-weight: 600;">
					<b>{{ showingTitle }}</b>
				</h3>

				<div class="card overflow-hidden my-4"
					 style="border-radius: 15px"
					 v-show="instantBook">
					<gmap-map
						:center="fetchCurrentLocation"
						:zoom="10"
						style="width:100%; height: 400px;">
						<gmap-marker
							:clickable="true"
							@click="$router.push({
								path: '/details',
								query: {
									id: property._id
								}
							})"
							:key="property._id"
							v-for="property in properties"
							:position="property.location.coordinates">
						</gmap-marker>
					</gmap-map>
				</div>

				<div class="row px-1">
					<property-card
						v-for="(property, index) in properties"
						:info="property"
						:key="property._id"
						v-show="resolveShow(index)">
					</property-card>
				</div>

				<paginate
					class="justify-content-center mt-4 h6"
					:page-count="pageCount"
					:click-handler="clickCallback"
					:prev-text="'Prev'"
					:next-text="'Next'"
					:container-class="'pagination'"
					:page-class="'page-item'"
					:page-link-class="'page-link'"
					:prev-class="'page-item'"
					:next-class="'page-item'"
					:prev-link-class="'page-link'"
					:next-link-class="'page-link'"
					:active-class="'active'">
				</paginate>

			</div>
		</section>

	</div>
</template>

<script>
import _ from 'lodash';

import SearchFilter from "./SearchFilter";
import {eventBus} from "../../main";
import GoogleMap from "../details/GoogleMap";
import PropertyCard from "../property/PropertyCard";

import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';

import axios from 'axios';

export default {
	name: "Search",
	components: {
		'search-filter': SearchFilter,
		'google-map': GoogleMap,
		'property-card': PropertyCard
	},
	data() {
		return {
			currentLocation: null,
			filterDetails: {
				fromHome: false,
				city: 'Select City',
				area: 'Select Area',
				property: 'Select Property',
				date: {
					start: '',
					end: ''
				},
				moreFilters: {
					bedCount: 0,
					bedrooms: 0,
					bathrooms: 0,
					forBusiness: false,
					recognizedGuests: false,
					amenities: []
				},
				adults: 0,
				children: 0,
				infants: 0
			},
			instantBook: false,
			showStart: 0,
			showEnd: 12,
			properties: [],
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
			'getServerBaseURL',
			'getAmenities',
			'getHomeFilters'
		]),
		pageCount() {
			return this.properties === undefined ? 0 : Math.ceil(this.properties.length / 12);
		},
		showingTitle() {
			if (this.properties.length === 0) return 'No Properties Found';
			let s = this.showStart + 1;
			let e = Math.min(this.showEnd, this.properties.length);
			return 'Showing ' + s.toString() + ' to ' + e.toString() + ' Results';
		},
		fetchCurrentLocation() {
			return this.currentLocation === null ? {
				lat: 23,
				lng: 90
			} : this.currentLocation;
		},
		parsedFilterDetails() {
			this.populateFilterDetails();
			return this.filterDetails;
		}

	},
	methods: {
		...mapMutations([
			'resetHomeFilters'
		]),
		transferredEvent(data) {
			// console.log('in transferred event');
			this.filterDetails = data;
			// console.log("In search transferred event");
			// console.log(this.filterDetails);
			// this.$forceUpdate();
			this.fetchProperties();
		},
		getCurrentLocation() {
			this.$getLocation({
				enableHighAccuracy: true,
				timeout: 10
			}).then(coordinates => {
				this.currentLocation = {
					lat: coordinates.lat,
					lng: coordinates.lng
				};
			}).catch(err => {
				// console.log(err);
			});
		},
		homeFiltersIsNull(homeFilters) {
			return (homeFilters.city === ''
				&& homeFilters.area === ''
				&& homeFilters.property === ''
				&& homeFilters.date === null
				&& homeFilters.adults === 0
				&& homeFilters.children === 0
				&& homeFilters.infants === 0);
		},
		populateFilterDetails() {
			let homeFilters = this.getHomeFilters;

			if (this.homeFiltersIsNull(homeFilters)) {
				// console.log('Found home filters to be null');
				return;
			}
			// console.log('Found home filters to be not null');

			// console.log(homeFilters);

			this.filterDetails.city = homeFilters.city;
			this.filterDetails.area = homeFilters.area;
			this.filterDetails.property = homeFilters.property;
			this.filterDetails.date = homeFilters.date;
			this.filterDetails.adults = parseInt(homeFilters.adults.toString());
			this.filterDetails.children = parseInt(homeFilters.children.toString());
			this.filterDetails.infants = parseInt(homeFilters.infants.toString());

			// console.log(this.filterDetails);

		},
		fetchProperties() {
			// console.log("fetching properties");

			let serverBaseURL = this.getServerBaseURL;
			let filterObject = {
				location: {
					city: this.filterDetails.city === 'Select City' ? null : this.filterDetails.city,
					area: this.filterDetails.area === 'Select Area' ? null : this.filterDetails.area,
				},
				typeOfProperty: this.filterDetails.property === 'Select Property' ? [] : [this.filterDetails.property],
				date: {
					start: this.filterDetails.date === null || this.filterDetails.date === undefined ? null : this.filterDetails.date.start,
					end: this.filterDetails.date === null || this.filterDetails.date === undefined ? null : this.filterDetails.date.end
				},
				isFeatured: null,
				accommodationServices: {
					bedroom: {
						count: this.filterDetails.moreFilters.bedrooms === 0 ? null : this.filterDetails.moreFilters.bedrooms,
						bedCount: this.filterDetails.moreFilters.bedCount === 0 ? null : this.filterDetails.moreFilters.bedCount,
					},
					bathroom: {
						count: this.filterDetails.moreFilters.bathrooms === 0 ? null : this.filterDetails.moreFilters.bathrooms
					},
					amenities: this.filterDetails.moreFilters.amenities
				},
				accommodationCapacity: {
					adults: this.filterDetails.adults === 0 ? null : this.filterDetails.adults,
					children: this.filterDetails.children === 0 ? null : this.filterDetails.children,
					infants: this.filterDetails.infants === 0 ? null : this.filterDetails.infants
				},
				ownerLanguage: []
			};

			// console.log(filterObject);

			axios.post(serverBaseURL + 'property/filtered', {filterObject})
				.then(res => {
					let tempProperties = res.data.properties;
					this.parseAmenities(tempProperties);
					this.showStart = 0;
					this.showEnd = Math.min(this.properties.length, 12);
					// console.log(tempProperties);
				})
				.catch(err => {
					// console.log('in error');
					console.log(err.response.data);
				});
		},
		parseAmenities(tempProperties) {
			for (let i = 0; i < tempProperties.length; i++) {
				for (let j = 0; j < tempProperties[i].accommodationServices.amenities.length; j++) {
					tempProperties[i].accommodationServices.amenities[j] = JSON.parse(tempProperties[i].accommodationServices.amenities[j]);
				}
				for (let j = 0; j < tempProperties[i].rulesForGuests.length; j++) {
					tempProperties[i].rulesForGuests[j] = JSON.parse(tempProperties[i].rulesForGuests[j]);
				}
			}
			this.properties = tempProperties;
			// console.log(this.properties[0]);
		},
		clickCallback(pageNum) {
			this.showStart = (pageNum - 1) * 12;
			this.showEnd = pageNum * 12;
		},
		resolveShow(index) {
			return index >= this.showStart && index < this.showEnd;
		}
	},
	mounted() {
		this.populateFilterDetails();
		// this.fetchProperties();
		this.getCurrentLocation();
	}
}
</script>

<style scoped>

@media (min-width: 992px) {
	.instant-book-left-margin {
		margin-left: 0;
	}
}

@media (min-width: 768px) and (max-width: 991px) {
	.instant-book-left-margin {
		margin-left: 0.95rem;
	}
}

@media (min-width: 430px) and (max-width: 767px) {
	.instant-book-left-margin {
		margin-left: -1.5rem;
	}
}

</style>
