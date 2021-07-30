<template>
	<div class="my-container">
		<div class="" style="z-index: 3;">
			<img class="mx-auto w-100" src="../../assets/img/home/jorg-angeli-1tyuLfDOnG0-unsplash.png"
				 alt="Sunset image of a beach"
				 style="min-height: 700px;">
		</div>
		<div class="my-bg-overlay"></div>
		<div class="my-text-centered">
			<div class="row my-4">
				<div class="col-12">
					<h2 class="text-white">
						Experience Luxury Properties Designed To Suit Your Needs
					</h2>
				</div>
			</div>

			<div class="row mb-4">
				<div class="col">
					<div id="home-search-bar" class="my-search-bar-home-filter">
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
													  class="dropdown-menu my-card-border px-4 my-guest-card-min-width">
													<div class="row">
														<button
															:key="city+idx"
															data-toggle="dropdown"
															@click.prevent="filterDetails.city = city"
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
                                                    class="dropdown-menu my-card-border px-4 my-guest-card-min-width">
													<div class="row">
														<button
															:key="area + idx"
															data-toggle="dropdown"
															@click.prevent="filterDetails.area = area"
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
													{{ filterDetails.property }}
												</a>

												<form id="home-filter-property-dd-menu"
													  class="dropdown-menu my-card-border px-4 my-guest-card-min-width">
													<div class="row">
														<button
															:key="property + idx"
															data-toggle="dropdown"
															@click.prevent="filterDetails.property = property"
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
												:columns="$screens({ default: 1, md: 2 })"
												mode="range"
												v-model="filterDetails.date"
												:min-date="new Date()"
												color="yellow">
												<b-input
													type="text"
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
													  class="dropdown-menu my-card-border px-4 my-guest-card-min-width">
													<div class="row">
														<div
															class="col-8 col-xl-3 align-self-center mx-auto my-2 font-weight-bold"
															style="line-height: 30px">
															Adults
														</div>
														<div class="col-8 col-xl-9 align-self-center mx-auto mb-2">
															<b-form-spinbutton
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

							<div class="col-12 col-xl-2 col-md-12 col-sm-12 py-2">
								<button
									@click="search"
									class="mx-auto btn btn-primary my-btn text-white">
									<i class="fa fa-search"></i>
									Search
								</button>
							</div>

						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import {mapMutations} from 'vuex';


export default {
	name: "HomeFilter",
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
				adults: 0,
				children: 0,
				infants: 0
			},
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
			]
		}
	},
	methods: {
		...mapMutations([
			'setHomeFilters'
		]),
		homeFiltersIsNull() {
			return (this.filterDetails.city === 'Select City'
				&& this.filterDetails.area === 'Select Area'
				&& this.filterDetails.property === 'Select Property'
				&& this.filterDetails.date === null
				&& this.filterDetails.adults === 0
				&& this.filterDetails.children === 0
				&& this.filterDetails.infants === 0);
		},
		makeToast(variant = null, title, body) {
			this.$bvToast.toast(body, {
				title: title,
				variant: variant,
				toaster: 'b-toaster-bottom-left',
				solid: true
			})
		},
		search() {
			if (this.homeFiltersIsNull() && !this.homeFiltersIsNull()) {
				this.makeToast('danger', 'Error', 'Please select at least one filter before proceeding');
			} else {
				this.setHomeFilters({
					city: this.filterDetails.city,
					area: this.filterDetails.area,
					property: this.filterDetails.property,
					data: this.filterDetails.date,
					adults: this.filterDetails.adults,
					children: this.filterDetails.children,
					infants: this.filterDetails.infants
				});

				this.$router.push('/search');
			}
		},
		incAdults() {
			this.filterDetails.adults = Math.min(this.filterDetails.adults + 1, 10);
		},
		decAdults() {
			this.filterDetails.adults = Math.max(this.filterDetails.adults - 1, 0);
		},
		incChildren() {
			this.filterDetails.children = Math.min(this.filterDetails.children + 1, 10);
		},
		decChildren() {
			this.filterDetails.children = Math.max(this.filterDetails.children - 1, 0);
		},
		incInfants() {
			this.filterDetails.infants = Math.min(this.filterDetails.infants + 1, 10);
		},
		decInfants() {
			this.filterDetails.infants = Math.max(this.filterDetails.infants - 1, 0);
		},
	},
	computed: {
		guests() {
			return parseInt(this.filterDetails.adults) + parseInt(this.filterDetails.children) + parseInt(this.filterDetails.infants);
		},
		formatDateForInputBox() {
			if (this.filterDetails.date === null || this.filterDetails.date.start === '' || this.filterDetails.date.end === '') {
				return 'Pick Date';
			}
			else return moment(this.filterDetails.date.start).format('MMM DD') + ' - ' + moment(this.filterDetails.date.end).format('MMM DD');
		}
	}
}
</script>

<style scoped>

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

.my-search-bar-home-filter {
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
	.my-border-right-home-filter-lg {
		border-right: 1px solid #dee2e6 !important;
		margin-top: auto;
		margin-bottom: auto;
		height: 55px;
	}
}

@media (max-width: 767px) {
	.my-border-right-home-filter-sm {
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

@media (max-width: 576px) {
	.my-border-right-home-filter-xs {
		border-right: 1px solid #dee2e6 !important;
		margin-top: auto;
		margin-bottom: auto;
	}
}

@media (max-width: 1000px) {
	.my-border-bottom-home-filter {
		border-bottom: 1px solid #dee2e6 !important;
		max-width: 90%;
	}
}
</style>
