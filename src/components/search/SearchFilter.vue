box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
<template>
	<div class="mt-5">

		<div class="my-search-bar shadow mx-auto">

			<div class="row py-1">

				<div class="col-12 col-xl-2 col-md-4 col-sm-6 mx-auto pl-xl-3">

					<div class="my-border-right-home-filter py-2">
						<div class="row">
							<div class="col-12 mx-auto">

								<div class="dropdown show my-guest-btn">
									<a class="btn dropdown-toggle text-dark border-0 w-75"
									   href="#" role="button" id="home-filter-state-dd"
									   data-toggle="dropdown"
									   aria-haspopup="true" aria-expanded="false">
										{{ filterDetails.city }}
									</a>

									<form id="home-filter-state-dd-menu"
										  style="margin-top: 0.85rem"
										  class="dropdown-menu my-card-border px-4 my-guest-card-min-width">
										<div class="row">
											<button
												data-toggle="dropdown"
                                                :key="city+idx"
												@click.prevent="updateCity(city)"
												class="btn btn-light bg-white col-12 px-3"
												v-for="(city, idx) in cities">
												{{ city }}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>

					</div>

				</div>

				<div class="col-12 col-xl-2 col-md-4 col-sm-6 mx-auto">

					<div class="my-border-right-home-filter-md py-2">
						<div class="row">
							<div class="col mx-auto">
								<div class="dropdown show my-guest-btn">
									<a class="btn dropdown-toggle text-dark border-0 w-75"
									   href="#" role="button" id="home-filter-city-dd"
									   data-toggle="dropdown"
									   aria-haspopup="true" aria-expanded="false">
										{{ filterDetails.area }}
									</a>

									<form id="home-filter-city-dd-menu"
										  style="margin-top: 0.85rem"
										  class="dropdown-menu my-card-border px-4 my-guest-card-min-width">
										<div class="row">
											<button
												data-toggle="dropdown"
                                                :key="area+idx"
												@click.prevent="updateArea(area)"
												class="btn btn-light bg-white col-12 px-3"
												v-for="(area, idx) in areas">
												{{ area }}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>

				</div>

				<div class="col-12 col-xl-2 col-md-4 col-sm-6 mx-auto">

					<div class="my-property-border py-2">
						<div class="row">
							<div class="col-12 mx-auto">

								<div class="dropdown show my-guest-btn">
									<a class="btn dropdown-toggle text-dark border-0 w-75"
									   href="#" role="button" id="home-filter-property-dd"
									   data-toggle="dropdown"
									   aria-haspopup="true" aria-expanded="false">
										{{ getProperty }}
									</a>

									<form id="home-filter-property-dd-menu"
										  style="margin-top: 0.85rem"
										  class="dropdown-menu my-card-border px-4 my-guest-card-min-width">
										<div class="row">
											<button
												:key="property+idx"
												data-toggle="dropdown"
												@click.prevent="updateProperty(property)"
												class="btn btn-light bg-white col-12 px-3"
												v-for="(property, idx) in properties">
												{{ property }}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>

				</div>

				<div class="col-12 col-xl-2 col-md-6 col-sm-6 mx-auto">

					<div class="my-border-right-home-filter-md " style="padding-top: 0.6rem;">
						<div class="col mx-auto">
							<div class="mx-auto" style="width: 83%">
								<v-date-picker
									@change="done"
									:columns="$screens({ default: 1, md: 2 })"
									mode="range"
									v-model="filterDetails.date"
									:min-date="new Date()"
									color="yellow">
									<b-input
										type="text"
										icon="calendar"
										placeholder="Enter Date"
										:value="formatDateForInputBox"
										@change.native='props.updateValue($event.target.value)'>
									</b-input>
								</v-date-picker>
							</div>
						</div>
					</div>
				</div>

				<div class="col-12 col-xl-2 col-md-6 col-sm-12">

					<div class="my-guest-border py-2">
						<div class="row">
							<div class="col">
								<div class="dropdown show my-guest-btn">
									<a class="btn dropdown-toggle text-dark border-0 w-75"
									   href="#" role="button" id="guest-dd" data-toggle="dropdown"
									   aria-haspopup="true" aria-expanded="false">
										{{ guests }} Guests
									</a>

									<form id="guest-dd-menu"
										  style="margin-top: 0.85rem"
										  class="dropdown-menu my-card-border px-4 my-guest-card-min-width">
										<div class="row">
											<div
												class="col-8 col-xl-3 align-self-center mx-auto my-2 font-weight-bold"
												style="line-height: 30px">
												Adults
											</div>
											<div class="col-8 col-xl-9 align-self-center mx-auto mb-2">
												<b-form-spinbutton
													@change="done"
													class="ml-auto mt-2"
													style="max-width: 250px"
													v-model="filterDetails.adults"
													min="0"
													max="10">
												</b-form-spinbutton>
											</div>
										</div>
										<div class="row">
											<div
												class="col-8 col-xl-3 align-self-center mx-auto my-2 font-weight-bold">
												Children
											</div>
											<div class="col-8 col-xl-9 align-self-center mx-auto mb-2">

												<b-form-spinbutton
													@change="done"
													class="ml-auto mt-2"
													style="max-width: 250px"
													v-model="filterDetails.children"
													min="0"
													max="10">
												</b-form-spinbutton>
											</div>
										</div>
										<div class="row">
											<div
												class="col-8 col-xl-3 align-self-center mx-auto my-2 font-weight-bold">
												Infants
											</div>
											<div class="col-8 col-xl-9 align-self-center mx-auto mb-2">
												<b-form-spinbutton
													@change="done"
													class="ml-auto mt-2"
													style="max-width: 250px"
													v-model="filterDetails.infants"
													min="0"
													max="10">
												</b-form-spinbutton>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>


					</div>

				</div>

				<div class="col-12 col-lg-2 col-md-12 col-sm-12 py-2">
					<div class="dropdown position-relative show my-guest-btn">
						<a class="btn dropdown-toggle text-dark border-0"
						   data-flip="false"
						   href="#" role="button" id="more-filters-dd"
						   data-toggle="dropdown"
						   aria-haspopup="true">
							More Filters
						</a>

						<form id="more-filters-dd-menu"
							  style="margin-top: 0.85rem"
							  class="dropdown-menu dropdown-menu-right my-card-border more-filters-dropdown-width">

							<div class="row mt-4">
								<div class="col-12">
									<span class="h5 font-weight-bold">More Filters</span>
									<button
										@click.prevent="done"
										class="btn pull-right"
										style="position: absolute; right: 4%; top: -5px"
										data-toggle="dropdown">
										<i class="fa fa-close fa-lg font-weight-light"></i>
									</button>
								</div>
							</div>

							<div id="filters-modal-body"
								 style="height: fit-content"
								 class="modal-body">
								<form class="px-4">

									<div class="form-group text-left">

										<h5 class="my-3 font-weight-bold">More Filters</h5>

										<div class="px-3">
											<div class="row my-3">
												<div class="col-6 text-left pt-2">
													<h6 class="font-weight-light">Beds</h6>
												</div>
												<div class="col-6 ml-auto text-right">
													<b-form-spinbutton
														class="ml-auto"
														style="max-width: 250px"
														v-model="filterDetails.moreFilters.bedCount"
														min="0"
														max="10">
													</b-form-spinbutton>
												</div>
											</div>

											<div class="row my-3">
												<div class="col-6 text-left pt-2">
													<h6 class="font-weight-light">Bedrooms</h6>
												</div>
												<div class="col-6 ml-auto text-right">
													<b-form-spinbutton
														class="ml-auto"
														style="max-width: 250px"
														v-model="filterDetails.moreFilters.bedrooms"
														min="0"
														max="10">
													</b-form-spinbutton>
												</div>
											</div>

											<div class="row my-3">
												<div class="col-6 text-left pt-2">
													<h6 class="font-weight-light">Bathrooms</h6>
												</div>
												<div class="col-6 ml-auto text-right">
													<b-form-spinbutton
														class="ml-auto"
														style="max-width: 250px"
														v-model="filterDetails.moreFilters.bathrooms"
														min="0"
														max="10">
													</b-form-spinbutton>
												</div>
											</div>
										</div>
									</div>

									<hr class="mt-5 mb-5">

									<div class="form-group text-left">
										<h5 class="my-3 font-weight-bold">For Business</h5>
										<div class="px-3">
											<div class="row">
												<div class="col text-left">
													<h6 class="font-weight-light">
														Event Venue and Banquet Halls with 5-star ratings for business
														needs
													</h6>
												</div>
												<div class="col text-right">
													<toggle-button
														color="#20a6e4"
														v-model="filterDetails.moreFilters.forBusiness"/>
												</div>
											</div>
										</div>
									</div>

									<hr class="mt-5 mb-5">

									<div class="form-group text-left">
										<h5 class="my-3 font-weight-bold">More options</h5>
										<div class="px-3">
											<div class="row">
												<div class="col text-left">
													<h6 class="font-weight-light">
														Stay with recognized guests
													</h6>
												</div>
												<div class="col text-right">
													<toggle-button
														color="#20a6e4"
														v-model="filterDetails.moreFilters.recognizedGuests"/>
												</div>
											</div>
										</div>
										<a href="" class="h6 text-secondary" style="text-decoration: underline;">Learn
											more</a>
									</div>

									<hr class="mt-5 mb-5">

									<div class="form-group text-left">
										<h5 class="my-4 font-weight-bold">Amenities</h5>

										<div class="row px-5">
											<div class="col-12 col-lg-6 px-2 my-2"
												:key="amenity + index"
												v-for="(amenity, index) in getAmenities"
												v-if="index < amenityCap">
												<b-form-checkbox
													class="text-left"
													style="margin-left: -40px; font-size: 16px; color: rgba(0, 0, 0, 0.6);"
													v-model="filterDetails.moreFilters.amenities"
													:key="amenity"
													:value="amenity">
													{{ amenity }}
												</b-form-checkbox>
											</div>
										</div>

										<button
											@click.prevent="toggleAmenityDisplay"
											class="btn p-0 bg-transparent mt-2 text-secondary"
											style="text-decoration: underline">
											{{ amenityButtonText }}
										</button>

									</div>

									<hr class="mt-5 mb-5">

									<div class="form-group text-left">
										<div class="px-3 mb-3">
											<div class="row my-2">
												<div class="col-6 text-left" style="font-size: large;">
													<button class="btn border-0 bg-white"
															style="text-decoration: underline; margin-left: -13px"
															@click="clearFilters">
														Clear All
													</button>
												</div>
												<div class="col-6 text-right">
													<button
														data-toggle="dropdown"
														class="btn btn-primary text-white font-weight-bold py-2"
														style="width: 150px; border-radius: 15px"
														data-dismiss="modal"
														@click.prevent="done">
														Done
													</button>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';

import moment from "moment";

export default {
	name: "SearchFilter",
	props: ['searchFilters'],
	data() {
		return {
			filterDetails: {
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
			amenityButtonText: 'Show More',
			amenityCap: 4,
			cities: [
				'Select City',
				'Dhaka',
				'Sylhet',
				'Barisal',
				'Chittagong'
			],
			areas: [
				'Select Area',
				"Azimpur",
				"Dhanmondi",
				"Kalabagan",
				"Palashi",
				"Paragon",
				"Uttara"
			],
			properties: [
				'Select Property',
				'Banquet Hall',
				'House',
				'Condo',
				'Apartment',
				'Villa',
				'Cottage',
				'Cabin',
				'Venue'
			],
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
	methods: {
		...mapMutations([
			'resetHomeFilters'
		]),
		toggleAmenityDisplay() {
			if (this.amenityCap === 4) {
				this.amenityCap = this.getAmenities.length;
				this.amenityButtonText = 'Show Less';
			} else {
				this.amenityCap = 4;
				this.amenityButtonText = 'Show More';
			}
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
				return false;
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
			// console.log("IN SEARCH FILTER");
			// console.log(this.filterDetails);
			this.$forceUpdate();
			return true;
		},
		updateCity(city) {
			this.filterDetails.city = city;
			this.done();
		},
		updateArea(area) {
			this.filterDetails.area = area;
			this.done();
		},
		updateProperty(property) {
			this.filterDetails.property = property;
			this.done();
		},
		clearFilters() {
			this.filterDetails = {
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
			};
			this.done();
		},
		done() {
			// console.log('in search filters done');
			// console.log(this.filterDetails);
			this.$emit('searchwithfilters', this.filterDetails);
			// console.log('in search filters done');
			// console.log(this.filterDetails);
			this.resetHomeFilters();
		}
	},
	computed: {
		...mapGetters([
			'getAmenities',
			'getHomeFilters'
		]),
		getFilteredAmenities() {
			let filteredAmenities = [];
			for (let i=0; i < this.amenityCap; i++) filteredAmenities.push(this.amenities[i]);
			return filteredAmenities;
		},
		guests() {
			return parseInt(this.filterDetails.adults) + parseInt(this.filterDetails.children) + parseInt(this.filterDetails.infants);
		},
		formatDateForInputBox() {
			if (this.filterDetails.date === null
				|| this.filterDetails.date.start === ''
				|| this.filterDetails.date.end === ''
				|| this.filterDetails.date.start === 'Invalid Date'
				|| this.filterDetails.date.end === 'Invalid Date') {
				return 'Pick Date';
			} else return moment(this.filterDetails.date.start).format('MMM DD') + ' - ' + moment(this.filterDetails.date.end).format('MMM DD');
		},
		getProperty() {
			// this.populateFilterDetails();
			return this.filterDetails.property;
		}
	},
	mounted() {
		// console.log("in search filters mounted");
		// console.log(this.searchFilters);
		this.filterDetails = this.searchFilters;
		this.filterDetails.date = {
			start: null,
			end: null
		};
		this.done();
	}
}
</script>

<style scoped>
.dropdown-menu {
	max-height: fit-content;
	max-width: 800px;
	overflow-y: auto;
	overflow-x: hidden;

}

.dropdown-toggle#guest-dd:hover, .dropdown-toggle#home-filter-state-dd:hover, .dropdown-toggle#home-filter-city-dd:hover,
.dropdown-toggle#home-filter-property-dd:hover {
	background-color: rgba(153, 153, 153, 0.3);
}

.dropdown-toggle#guest-dd, .dropdown-toggle#home-filter-state-dd, .dropdown-toggle#home-filter-city-dd,
.dropdown-toggle#home-filter-property-dd {
	background-color: white;
}

.elux-custom-shadow {
	box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}

@media (min-width: 1200px) {
	.my-counter-btn-width {
		width: 7%;
	}
}

@media (max-width: 1199px) {
	.my-counter-btn-width {
		width: 12%;
	}
}

@media (max-width: 991px) {
	.my-counter-btn-width {
		width: 15%;
	}
}

@media (min-width: 1200px) {
	.my-counter-width {
		width: 77%;
	}
}

@media (max-width: 1199px) {
	.my-counter-width {
		width: 67%;
	}
}

@media (max-width: 991px) {
	.my-counter-width {
		width: 60%;
	}
}


.my-search-bar {
	width: 100%;
	height: auto;
	border-radius: 8px;
	background-color: #fff;
	margin-left: auto;
	margin-right: auto;
	-ms-flex-preferred-size: 0;
	flex-basis: 0;
	-ms-flex-positive: 1;
	flex-grow: 1;
}

@media (min-width: 576px) {
	.my-border-right-home-filter {
		border-right: 1px solid #dee2e6 !important;
		margin-top: auto;
		margin-bottom: auto;
	}
}

@media (min-width: 1200px) {
	.my-guest-border {
		border-right: 1px solid #dee2e6 !important;
		margin-top: auto;
		margin-bottom: auto;
	}
}

@media (min-width: 768px) {
	.my-border-right-home-filter-md {
		border-right: 1px solid #dee2e6 !important;
		height: 55px;
	}
}

@media (min-width: 576px) and (max-width: 767px) {
	.my-property-border {
		border-right: 1px solid #dee2e6 !important;
		margin-top: auto;
		margin-bottom: auto;
	}
}

@media (min-width: 1200px) {
	.my-property-border {
		border-right: 1px solid #dee2e6 !important;
		margin-top: auto;
		margin-bottom: auto;
	}
}


@media (min-width: 992px) {
	.my-border-right-lg {
		border-right: 1px solid #dee2e6 !important;
		margin-top: auto;
		margin-bottom: auto;
		height: 55px;
	}
}

@media (max-width: 767px) {
	.my-border-right-sm {
		border-right: 1px solid #dee2e6 !important;
		margin-top: auto;
		margin-bottom: auto;
	}
}

@media (min-width: 768px) {
	.my-border-right-md {
		border-right: 1px solid #dee2e6 !important;
		height: 55px;
	}
}

@media (max-width: 576px) {
	.my-border-right-xs {
		border-right: 1px solid #dee2e6 !important;
		margin-top: auto;
		margin-bottom: auto;
	}
}

@media (max-width: 1000px) {
	.my-border-bottom {
		border-bottom: 1px solid #dee2e6 !important;
		max-width: 90%;
	}
}

@media (min-width: 1200px) {
	.more-filters-dropdown-width {
		width: 1100px;
	}
}

@media (min-width: 992px) and (max-width: 1199px) {
	.more-filters-dropdown-width {
		width: 750px;
	}
}

@media (min-width: 576px) and (max-width: 991px) {
	.more-filters-dropdown-width {
		width: 500px;
	}
}

</style>
