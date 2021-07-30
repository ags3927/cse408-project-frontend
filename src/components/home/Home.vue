<template>
	<div>
		<home-filter></home-filter>

		<section id="how-it-works" style="margin-top: 6rem;">
			<div class="container">
				<div class="my-heading-center text-left">
					<h3 class="text-left" style="font-size: 25px; font-weight: 600; margin-left: 20px;">
						<b>How it Works</b>
					</h3>

					<div class="row mt-4">

						<div class="col-8 col-lg-3 how-it-works-ml mr-auto mb-3">
							<div class="card h-100 shadow border-0 my-card-border">
								<div class="py-4">
									<div class="mx-auto my-card-image" style="width: 60%;">
										<img src="../../assets/img/home/undraw_web_search_eetr.png" alt=""
											 class="card-img-top">
									</div>
									<div class="card-body py-1">
										<h5><b>Search Your Need</b></h5>
										<h6 class="card-text font-weight-light">
											Lorem ipsum dolor sit amet.
										</h6>
									</div>
								</div>
							</div>
						</div>

						<div class="col-8 col-lg-3 mx-auto mb-3">
							<div class="card h-100 shadow border-0 my-card-border">
								<div class="py-4">
									<div class="mx-auto my-card-image" style="width: 60%;">
										<img src="../../assets/img/home/undraw_at_home_octe.png" alt=""
											 class="card-img-top">
									</div>
									<div class="card-body py-1">
										<h5><b>Find the Perfect</b></h5>
										<h6 class="card-text font-weight-light">
											Lorem ipsum dolor sit amet.
										</h6>
									</div>
								</div>
							</div>
						</div>

						<div class="col-8 col-lg-3 mx-auto mx-lg-0 ml-lg-auto mb-3">
							<div class="card h-100 shadow border-0 my-card-border">
								<div class="py-4">
									<div class="mx-auto my-card-image" style="width: 60%;">
										<img src="../../assets/img/home/Group 2363.png" alt="" class="card-img-top">
									</div>
									<div class="card-body py-1">
										<h5><b>Search Your Need</b></h5>
										<h6 class="card-text font-weight-light">
											Lorem ipsum dolor sit amet.
										</h6>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</section>

		<section id="lavish-stays" style="margin-top: 6rem;">
			<div class="container">
				<div class="my-heading-center text-left">
					<h3 class="text-left" style="font-size: 25px; font-weight: 600; margin-left: 20px;">
						<b>Select Your Lavish Stay</b>
					</h3>

					<div class="row mt-4">

						<div class="col-12 col-lg-3 px-3" v-for="(trendingStay, index) in trendingStays">
							<home-trending-card
								:typeOfProperty="trendingStay.propertyType"
								:type="'stays'"
								:name="trendingStay.img.imgTitle"
								:image="trendingStay.img.imgSrc">
							</home-trending-card>
						</div>

					</div>

				</div>
			</div>
		</section>

		<section id="trending-destinations" style="margin-top: 6rem;">
			<div class="container">
				<div class="my-heading-center">

					<h3 class="text-left" style="font-size: 25px; font-weight: 600; margin-left: 15px;">
						<b>Trending Destinations</b>
					</h3>

					<div class="row mt-4">
						<div class="col-12 col-lg-3 px-3"
							 v-for="(trendingDestination, index) in trendingDestinations">
							<home-trending-card
								:type="'destinations'"
								:destination-type="trendingDestination.type"
								:name="trendingDestination.name"
								:image="trendingDestination.image">
							</home-trending-card>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section id="featured-stays" style="margin-top: 6rem">
			<div class="container">
				<div class="my-heading-center">
					<div class="row px-4">
						<div class="col-10 col-md-6 col-lg-7 mx-auto mb-2 align-self-center text-left">
							<h3 style="font-size: 25px; font-weight: 600; padding-left: .3rem">
								<b>Featured B Lux's Stays</b>
							</h3>
						</div>

						<div class="col-8 col-md-4 col-lg-5 text-right">
							<button id="stays-btn"
									class="btn elux-custom-shadow font-weight-bold px-4 featured-btn-ml"
									style="border-radius: 15px"
									@click="featuredStaysBtn">
								{{ staysBtnText }}
							</button>
							<button
								class="btn elux-custom-shadow ml-2 ml-lg-3"
								@click="decStaysSlideBounds"
								style="width: 40px; height: 40px; border-radius: 50px"
								v-if="staysBtnShow">
								<i class="fa fa-angle-left fa-2x font-weight-light"
								   style="line-height: 30px">
								</i>
							</button>
							<button
								class="btn elux-custom-shadow ml-1 ml-lg-3"
								@click="incStaysSlideBounds"
								style="width: 40px; height: 40px; border-radius: 50px"
								v-if="staysBtnShow">
								<i class="fa fa-angle-right fa-2x font-weight-light"
								   style="line-height: 30px">
								</i>
							</button>
						</div>


					</div>

					<transition-group name="fade" mode="out-in" tag="div" class="row mt-4 mx-auto">
						<home-property-card
							:key="stay._id"
							v-for="(stay, index) in featuredStays" :info="stay"
							v-if="showFeaturedStays(index)">
						</home-property-card>
					</transition-group>


				</div>
			</div>
		</section>

		<section style="margin-top: 6rem">
			<div class="container">
				<div class="my-heading-center">
					<div class="row px-4">
						<div class="col-10 col-md-6 col-lg-7 mx-auto mb-2 align-self-center text-left">
							<h3 style="font-size: 25px; font-weight: 600; padding-left: .3rem">
								<b>Featured B Lux's Banquet Halls</b>
							</h3>
						</div>

						<div class="col-8 col-md-4 col-lg-5 text-right">
							<button id="halls-btn"
									class="btn elux-custom-shadow font-weight-bold px-4"
									style="border-radius: 15px"
									@click="featuredHallsBtn">
								{{ hallsBtnText }}
							</button>

							<button
								class="btn elux-custom-shadow ml-2 ml-lg-3"
								@click="decBanquetHallsSlideBounds"
								style="width: 40px; height: 40px; border-radius: 50px"
								v-if="hallsBtnShow">
								<i class="fa fa-angle-left fa-2x font-weight-light"
								   style="line-height: 30px">
								</i>
							</button>

							<button
								class="btn elux-custom-shadow ml-1 ml-lg-3"
								@click="incBanquetHallsSlideBounds"
								style="width: 40px; height: 40px; border-radius: 50px"
								v-if="hallsBtnShow">
								<i class="fa fa-angle-right fa-2x font-weight-light"
								   style="line-height: 30px">
								</i>
							</button>
						</div>

					</div>

					<transition-group name="fade" mode="out-in" tag="div" class="row mt-4 mx-auto">
						<home-property-card
							:key="hall._id"
							v-for="(hall, index) in featuredBanquetHalls" :info="hall"
							v-if="showFeaturedBanquetHalls(index)">
						</home-property-card>
					</transition-group>


				</div>
			</div>
		</section>

		<section style="margin-top: 6rem">
			<div class="container">
				<div class="my-heading-center">
					<div class="row px-4">
						<div class="col-10 col-md-6 col-lg-7 mx-auto mb-2 align-self-center text-left">
							<h3 style="font-size: 25px; font-weight: 600; padding-left: .3rem">
								<b>Featured B Lux's Event Spaces</b>
							</h3>
						</div>


						<div class="col-8 col-md-4 col-lg-5 text-right">
							<button id="event-spaces-btn"
									class="btn elux-custom-shadow font-weight-bold px-4"
									style="border-radius: 15px"
									@click="featuredEventSpacesBtn">
								{{ eventSpacesBtnText }}
							</button>

							<button
								class="btn elux-custom-shadow ml-2 ml-lg-3"
								@click="decEventSpacesSlideBounds"
								style="width: 40px; height: 40px; border-radius: 50px"
								v-if="eventSpacesBtnShow">
								<i class="fa fa-angle-left fa-2x font-weight-light"
								   style="line-height: 30px">
								</i>
							</button>

							<button
								class="btn elux-custom-shadow ml-1 ml-lg-3"
								@click="incEventSpacesSlideBounds"
								style="width: 40px; height: 40px; border-radius: 50px"
								v-if="eventSpacesBtnShow">
								<i class="fa fa-angle-right fa-2x font-weight-light"
								   style="line-height: 30px">
								</i>
							</button>
						</div>
					</div>

					<transition-group name="fade" mode="out-in" tag="div" class="row mt-4 mx-auto">
						<home-property-card
							:key="eventSpaces._id"
							v-for="(eventSpaces, index) in featuredEventSpaces" :info="eventSpaces"
							v-if="showFeaturedEventSpaces(index)">
						</home-property-card>
					</transition-group>


				</div>
			</div>
		</section>

	</div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';


import HomeFilter from "./HomeFilter";
import TrendingCard from "./TrendingCard";
import PropertyCard from "../property/PropertyCard";

export default {
	name: "Home",
	components: {
		homeFilter: HomeFilter,
		homeTrendingCard: TrendingCard,
		homePropertyCard: PropertyCard
	},
	data() {
		return {
			trendingStays: [
				{
					propertyType: 'Banquet Hall',
					img: {
						imgSrc: 'https://i.postimg.cc/RZpDpfDr/banquet-hall-dark.png',
						imgTitle: 'Banquet Halls'
					}
				},
				{
					propertyType: 'House',
					img: {
						imgSrc: 'https://i.postimg.cc/ncHSH08b/house-dark.png',
						imgTitle: 'Houses'
					}
				},
				{
					propertyType: 'Villa',
					img: {
						imgSrc: 'https://i.postimg.cc/rwsh4sFf/villa-dark.png',
						imgTitle: 'Villas'
					}
				},
				{
					propertyType: 'Condo',
					img: {
						imgSrc: 'https://i.postimg.cc/vTyqxvcn/condo-dark.png',
						imgTitle: 'Condos'
					}
				},
				{
					propertyType: 'Cottage',
					img: {
						imgSrc: 'https://i.postimg.cc/PfbFs0RQ/cottage-dark.png',
						imgTitle: 'Cottages'
					}
				},
				{
					propertyType: 'Cabin',
					img: {
						imgSrc: 'https://i.postimg.cc/wMkWXsmG/cabin-dark.png',
						imgTitle: 'Cabins'
					}
				},
				{
					propertyType: 'Venue',
					img: {
						imgSrc: 'https://i.postimg.cc/8PtKsMDF/venue-dark.png',
						imgTitle: 'Venues'
					}
				}
			],
			trendingDestinations: [],
			featuredBanquetHalls: [],
			featuredStays: [],
			featuredEventSpaces: [],
			staysSlideBounds: {
				low: 0,
				high: 2
			},
			hallsSlideBounds: {
				low: 0,
				high: 2
			},
			eventSpacesSlideBounds: {
				low: 0,
				high: 2
			},
			staysBtnShow: true,
			hallsBtnShow: true,
			eventSpacesBtnShow: true,
			slideType: 'slide-right',
			staysBtnText: 'View More',
			hallsBtnText: 'View More',
			eventSpacesBtnText: 'View More'
		}
	},
	computed: {
		...mapGetters([
			'getServerBaseURL'
		])
	},
	methods: {
		...mapMutations([
			'setHomeFilters'
		]),
		showFeaturedStays(index) {
			return (index >= this.staysSlideBounds.low && index <= this.staysSlideBounds.high);
		},
		incStaysSlideBounds() {
			// this.slideType = 'slide-right';
			let staysCount = this.featuredStays.length;
			let check = this.staysSlideBounds.low;
			this.staysSlideBounds.low = check + 3 < staysCount ? this.staysSlideBounds.low + 3 : 0;
			this.staysSlideBounds.high = check + 3 < staysCount ? this.staysSlideBounds.high + 3 : 2;
		},
		decStaysSlideBounds() {
			// this.slideType = 'slide-left';
			let staysCount = Math.floor((this.featuredStays.length - 1) / 3) * 3;
			let check = this.staysSlideBounds.low;
			this.staysSlideBounds.low = check - 3 >= 0 ? this.staysSlideBounds.low - 3 : staysCount;
			this.staysSlideBounds.high = check - 3 >= 0 ? this.staysSlideBounds.high - 3 : staysCount + 2;

		},
		showFeaturedBanquetHalls(index) {
			return (index >= this.hallsSlideBounds.low && index <= this.hallsSlideBounds.high);
		},
		incBanquetHallsSlideBounds() {
			// this.slideType = 'slide-right';
			let staysCount = this.featuredBanquetHalls.length;
			let check = this.hallsSlideBounds.low;
			this.hallsSlideBounds.low = check + 3 < staysCount ? this.hallsSlideBounds.low + 3 : 0;
			this.hallsSlideBounds.high = check + 3 < staysCount ? this.hallsSlideBounds.high + 3 : 2;
		},
		decBanquetHallsSlideBounds() {
			// this.slideType = 'slide-left';
			let staysCount = Math.floor((this.featuredBanquetHalls.length - 1) / 3) * 3;
			let check = this.hallsSlideBounds.low;
			this.hallsSlideBounds.low = check - 3 >= 0 ? this.hallsSlideBounds.low - 3 : staysCount;
			this.hallsSlideBounds.high = check - 3 >= 0 ? this.hallsSlideBounds.high - 3 : staysCount + 2;
		},
		showFeaturedEventSpaces(index) {
			return (index >= this.eventSpacesSlideBounds.low && index <= this.eventSpacesSlideBounds.high);
		},
		incEventSpacesSlideBounds() {
			// this.slideType = 'slide-right';
			let staysCount = this.featuredBanquetHalls.length;
			let check = this.eventSpacesSlideBounds.low;
			this.eventSpacesSlideBounds.low = check + 3 < staysCount ? this.eventSpacesSlideBounds.low + 3 : 0;
			this.eventSpacesSlideBounds.high = check + 3 < staysCount ? this.eventSpacesSlideBounds.high + 3 : 2;
		},
		decEventSpacesSlideBounds() {
			// this.slideType = 'slide-left';
			let staysCount = Math.floor((this.featuredBanquetHalls.length - 1) / 3) * 3;
			let check = this.eventSpacesSlideBounds.low;
			this.eventSpacesSlideBounds.low = check - 3 >= 0 ? this.eventSpacesSlideBounds.low - 3 : staysCount;
			this.eventSpacesSlideBounds.high = check - 3 >= 0 ? this.eventSpacesSlideBounds.high - 3 : staysCount + 2;

		},
		executeSearch(typesOfProperties) {
			this.setHomeFilters({
				city: 'Select City',
				area: 'Select Area',
				property: typesOfProperties ? typesOfProperties : 'Select Property',
				arrivalDate: null,
				departureDate: null,
				adults: 0,
				children: 0,
				infants: 0
			});
			this.$router.push('/search');
		},
		featuredStaysBtn() {
			this.executeSearch();
		},
		featuredHallsBtn() {
			this.executeSearch('Banquet Hall');
		},
		featuredEventSpacesBtn() {
			this.executeSearch('Venue');
		},
		fetchFeaturedProperties() {
			let baseURL = this.getServerBaseURL;
			axios.post(baseURL + 'property/featured')
				.then(res => {
					// console.log(res.data.featuredProperties);
					this.featuredStays = [];
					this.featuredBanquetHalls = [];
					this.featuredEventSpaces = [];
					for (const property of res.data.featuredProperties) {
						if (property.typeOfProperty === 'Venue') {
							this.featuredEventSpaces.push(property);
						} else if (property.typeOfProperty === 'Banquet Hall') {
							this.featuredBanquetHalls.push(property);
						} else {
							this.featuredStays.push(property);
						}
					}
				})
				.catch(err => {
					// console.log(err.response.data);
				})
		},
		fetchTrendingDestinations() {
			let baseURL = this.getServerBaseURL;

			axios.post(baseURL + 'trenddest/viewall', {}, {})
				.then(res => {
					this.trendingDestinations = res.data.trendingDestinations;
					// console.log(this.trendingDestinations);
				})
				.catch(err => {
					// console.log(err.response.data);
				});
		}
	},
	mounted() {
		this.fetchFeaturedProperties();
		this.fetchTrendingDestinations();
	}
}
</script>

<style scoped>

@media (min-width: 768px) {
	.how-it-works-ml {
		margin-left: 2rem;
	}
}

@media (max-width: 767px) {
	.how-it-works-ml {
		margin-left: auto;
	}
}

.elux-custom-shadow {
	box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}

.fade-enter {
	opacity: 0;
}

.fade-enter-active {
	transition: opacity 1s;
}

.fade-leave {

}

.fade-leave-active {
	opacity: 0;
}


.slide-right-enter {
	opacity: 1;
}

.slide-right-enter-active {
	/*transition: opacity 1s;*/
	opacity: 1;
	animation: slide-right-in 1s ease forwards;
}

.slide-right-leave {
}

.slide-right-leave-active {
	/*transition: opacity 1s;*/
	position: absolute;
	opacity: 1;
	animation: slide-right-out 1s ease forwards;
}


.slide-left-enter {
	opacity: 1;
}

.slide-left-enter-active {
	/*transition: opacity 1s;*/
	opacity: 1;
	animation: slide-left-in 1s ease forwards;
}

.slide-left-leave {
}

.slide-left-leave-active {
	/*transition: opacity 1s;*/
	position: absolute;
	opacity: 1;
	animation: slide-left-out 1s ease forwards;
}

.slide-right-move {
	transition: transform 1s;
}

.slide-left-move {
	transition: transform 1s;
}

@keyframes slide-right-in {
	from {
		transform: translateX(1440px);
	}
	to {
		transform: translateX(0);
	}
}

@keyframes slide-right-out {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-1440px);
	}
}

@keyframes slide-left-in {
	from {
		transform: translateX(-1440px);
	}
	to {
		transform: translateX(0);
	}
}

@keyframes slide-left-out {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(1440px);
	}
}
</style>
