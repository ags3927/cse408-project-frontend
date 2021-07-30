<template>
	<div class="container">

		<section>
			<div class="container mt-4">
				<div class="row p-4">
					<div class="col-12 col-lg-8 text-left mx-auto px-4 mb-5 mb-lg-0">

						<div class="my-card-border mb-5 overflow-hidden"
							 style="margin-left: -10px;">
							<b-carousel
								id="carousel-1"
								v-model="slide"
								:interval="0"
								indicators
								controls
								@sliding-start="onSlideStart"
								@sliding-end="onSlideEnd"
								style="border-radius: 20px; height: 350px;">
								<b-carousel-slide v-for="(image, index) in propertyDetails.imagesOfProperty"
												  style="border-radius: 20px!important; max-height: 350px"
												  :key="index"
												  :img-src="image"
												  :img-width="'fit-content'"
												  :img-height="'fit-content'">
								</b-carousel-slide>
							</b-carousel>
						</div>


						<div class="row px-2">
							<div class="col-9 text-left">
								<h4>About the Property</h4>
							</div>
							<div class="col-3 text-right">
								<button
									v-if="getSessionDetails.userType==='GENERAL' && getLoggedIn"
									@click="heartToggle"
									class="btn bg-white mr-3"
									style="height: 50px; width: 50px; border-radius: 200px">
									<fa-icon class="fa-2x" icon="heart" :style="favIconStyle"></fa-icon>
								</button>
							</div>
							<div class="col-12 text-left">
								<h6 class="mt-3 mb-3 w-75">
									{{ propertyDetails.description }}
								</h6>
							</div>
						</div>

						<div class="text-left mt-5">

							<h4 class="font-weight-bold">Features</h4>

							<ul style="list-style: none;" class="mt-5 text-secondary px-3">
								<li class="mr-5 my-4"
									style="margin-left: -15px">
									<i class="fa fa-bed-alt fa-2x mr-3"></i>
									<span class="h5">{{ getBedroomCount }} - {{ getBedCount }}</span>
								</li>
								<li class="mr-5 my-4"
									style="margin-left: -15px">
									<i class="fa fa-bath fa-2x mr-3"></i>
									<span class="h5">{{ getBathroomCount }}</span>
									<span class="h5"
										  v-if="propertyDetails.accommodationServices.bathroom.isPrivate">(Private)</span>
								</li>
							</ul>
						</div>

						<hr class="mt-5 mb-5">

						<div class="text-left" v-if="propertyDetails.accommodationServices.amenities.length > 0">

							<h4 class="font-weight-bold">Amenities</h4>

							<ul style="list-style: none;" class="mt-3 text-secondary px-3 list-inline">
								<li class="list-inline-item mr-5 my-4"
									style="margin-left: -15px"
									:key="amenity + idx"
									v-for="(amenity, idx) in propertyDetails.accommodationServices.amenities">
									<i class="fa fa-2x mr-3"
									   :class="amenity.className"></i>
									<span class="h5">{{ amenity.name }}</span>
								</li>
							</ul>

						</div>

						<hr class="mt-5 mb-5" v-if="propertyDetails.accommodationServices.amenities.length > 0">


						<div class="text-left">
							<h4 class="font-weight-bold">Availability</h4>

							<h6 class="my-4">{{ propertyDetails.stayTimeInNights.min }} night minimum stay</h6>

							<v-calendar
								:columns="$screens({ default: 1, lg: 2 })"
								:attributes="attributes"
								:disabled-dates="bookedDates"/>

							<div class="row">
								<div class="col-6 col-lg-3 text-left">
									<i class="fa fa-2x fa-square ml-3 mr-3 mt-4"
									   style="color: rgba(255,0,0,0.3); line-height: 25px"></i>
									<span class="h6">Booked</span>
								</div>
							</div>

						</div>


					</div>

					<div class="col-12 col-lg-4 text-left mx-lg-auto">
						<div id="sticky-price-card" class="card my-card-border shadow sticky-top" style="z-index: 0;">
							<div class="card-body h-100">
								<div class="p-3 h-100 text-left">
									<h5 class="font-weight-bold">
										{{ propertyDetails.title }}
									</h5>
									<h6 class="my-3 text-secondary">
										<i class="fa fa-map-marker-alt fa-lg mr-3"></i>
										{{ propertyDetails.location.area }}, {{ propertyDetails.location.city }}
									</h6>

									<h6 class="mt-3">
										<i id="details-booking-price" class="fa fa-star my-rating-star mr-2 fa-lg"></i>
										{{ propertyDetails.rating.value }} ({{ propertyDetails.rating.timesRated }})
									</h6>

									<h5 class="mt-3 font-weight-bold">${{ propertyDetails.price.basePrice }} /
										night</h5>

								</div>

								<button @click="bookNow" v-if="getLoggedIn && getSessionDetails.userType==='GENERAL'"
										class="my-card-border mx-auto pt-3 py-2 btn btn-warning text-white w-100">
									<h5>Book Now</h5>
								</button>

								<div class="row">
									<div class="col-4 mx-auto pl-3">
										<button
											v-if="!getLoggedIn"
											class="my-card-border mx-auto py-2 btn btn-primary text-white w-100"
											data-toggle="modal"
											data-target="#loginModal">
											Login
										</button>
									</div>
									<div class="col-4 mx-auto pr-3">
										<button
											v-if="!getLoggedIn"
											class="my-card-border mx-auto py-2 btn btn-primary text-white w-100"
											data-toggle="modal"
											data-target="#signupModal">
											Signup
										</button>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</section>

		<section class="mb-5">

			<div class="container text-left p-4">

				<hr class="mt-5 mb-5">

				<div class="text-left">
					<h4 class="font-weight-bold">Directions you need</h4>
					<h6 class="my-4 font-weight-light">
						It’s important to keep in mind that penalty-free cancellations are only available for
						extenuating circumstances that occur before the official check-in date for your reservation.
						Additionally, our Extenuating Circumstances Policy doesn’t apply to Luxe or Luxury Retreats
						reservations, which are subject to a separate
					</h6>

					<gmap-map
						:center="propertyDetails.location.coordinates"
						:zoom="10"
						style="width:100%; height: 400px;">
						<gmap-marker
							:position="propertyDetails.location.coordinates">
						</gmap-marker>
					</gmap-map>
				</div>

				<hr class="my-5">

				<div class="text-left" v-if="propertyDetails.rulesForGuests.length > 0">

					<h4 class="font-weight-bold">House Rules</h4>

					<ul style="list-style: none;"
						class="mt-3 text-secondary px-3 list-inline">
						<li class="list-inline-item mr-5 my-4"
							style="margin-left: -15px"
							:key="rule + idx"
							v-for="(rule, idx) in propertyDetails.rulesForGuests">
							<i class="fa fa-2x mr-3" :class="rule.className"></i>
							<span class="h5">{{ rule.name }}</span>
						</li>
					</ul>

				</div>

				<hr class="mt-5 mb-5" v-if="propertyDetails.rulesForGuests.length > 0">

				<h4 class="font-weight-bold">Cancellation Policy</h4>
				<h6 class="mt-3 mb-3 font-weight-light">
					{{ cancellationPolicy }}
				</h6>
				<a href="" class="h6 text-primary font-weight-bold">Read more about the policy.....</a>

				<hr class="mt-5 mb-5">

				<div class="text-left">
					<div class="row">
						<div class="col-8 text-left pl-3">
							<h4 class="font-weight-bold">Reviews</h4>
						</div>
						<div class="col-4 text-right pr-3">
							<button
								v-if="!reviewedAlready"
                                style="border-radius: 10px"
                                data-toggle="modal"
                                data-target="#reviewModal"
								class="btn btn-primary text-white px-3 py-2">
								Add Review
							</button>
							<button
								@click="resolveEditStatus"
								v-if="reviewedAlready"
                                style="border-radius: 10px"
                                data-toggle="modal"
                                data-target="#reviewModal"
								class="btn btn-secondary text-white px-3 py-2 mr-3">
								Edit Review
							</button>
							<button
								@click="deleteReview"
								v-if="reviewedAlready"
                                style="border-radius: 10px"
								class="btn btn-danger text-white px-3 py-2">
								Delete Review
							</button>
							
						</div>


                        <div class="modal" id="reviewModal" ref="reviewModal">
                            <div class="modal-dialog">
                                <div class="modal-content my-card-border">
                                    <div class="modal-header">
                                        <button id="login-close" class="close mr-auto ml-0" data-dismiss="modal">
                                            &times;
                                        </button>
                                        <h5 class="modal-title mr-auto" style="position: absolute; left: 35%;">Add a Review</h5>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div>
                                                <button @click.prevent="updateRating(1)" class="btn bg-transparent fa fa-star fa-2x ml-auto mr-2" :class="{'checked': review.rating >=1 }"></button>
                                                <button @click.prevent="updateRating(2)" class="btn bg-transparent fa fa-star fa-2x mx-2" :class="{'checked': review.rating >=2 }"></button>
                                                <button @click.prevent="updateRating(3)" class="btn bg-transparent fa fa-star fa-2x mx-2" :class="{'checked': review.rating >=3 }"></button>
                                                <button @click.prevent="updateRating(4)" class="btn bg-transparent fa fa-star fa-2x mx-2" :class="{'checked': review.rating >=4 }"></button>
                                                <button @click.prevent="updateRating(5)" class="btn bg-transparent fa fa-star fa-2x mr-auto ml-2" :class="{'checked': review.rating >=5 }"></button>
                                            </div>


                                            <div class="form-group">
                                                <input @submit="addReview" type="text" placeholder="Type your review" class="form-control border-0"
                                                       v-model.lazy="review.comment">
                                            </div>
                                            <h6 class="text-left pl-3" style="color: red" v-if="reviewError">
                                                Review text or rating cannot be empty
                                            </h6>

                                            <button @click.prevent="addReview" class="btn btn-primary"
                                                    :data-dismiss="reviewDataDismiss">
                                                Submit Review
                                            </button>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>



					</div>

					<h6 class="pl-4 mt-4">
						{{ getRatingText }}
					</h6>

					<guest-review
						v-for="(review, index) in reviews" :key="index"
						:review-object="review.reviewObject" :name="review.name" :user-image="review.userImage">
					</guest-review>

				</div>

				<hr class="mt-5 mb-5">

				<div class="row mt-3">
					<div class="col-12 text-left px-3">

						<h4 class="font-weight-bold mb-4">Still have a question?</h4>

						<div class="card my-card-border elux-custom-shadow text-left px-3 py-2">
							<b-form-textarea
								v-model="messageDetails"
								class="reply-text p-0 mt-3"
								id="textarea-rows"
								placeholder="Write message....."
								rows="8">
							</b-form-textarea>
						</div>


						<button
							@click.prevent="sendMessage"
							class="btn btn-primary text-white mr-5 px-5 mt-3"
							style="border-radius: 10px">
							Send
						</button>
					</div>
				</div>

				<hr class="mt-5 mb-5">


			</div>

			<h4 class="font-weight-bold text-left pl-3 mb-3">Some houses you may like</h4>
			<div class="row mx-auto">
				<property-card
					v-for="(property) in suggestedProperties" :info="property"
					:key="property._id">
				</property-card>

			</div>
		</section>

	</div>
</template>

<script>
import moment from 'moment';
import {mapGetters} from 'vuex';

import GoogleMap from "./GoogleMap";
import Review from "./Review";
import PropertyCard from "../property/PropertyCard";
import axios from "axios";

import {library} from '@fortawesome/fontawesome-svg-core'
import {faHeart} from '@fortawesome/free-solid-svg-icons'

library.add(faHeart);

export default {
	name: "Details",
	components: {
		'google-map': GoogleMap,
		'guest-review': Review,
		'property-card': PropertyCard
	},
	props: ['info'],
	data() {
		return {
			suggestedProperties: [],
			propertyDetails: {},
			reviews: [],
			cancellationPolicy: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, porro minus sint optio nihil fugit accusamus quae id neque culpa error, enim magnam eveniet excepturi minima ipsum voluptatibus. Corporis, dolores quibusdam quis nihil earum accusamus',
			slide: 0,
			sliding: null,
			bookedDates: [
				{
					start: null,
					end: new Date()
				}
			],
			attributes: [],
			favIconStyle: {
				color: 'grey'
			},
			bookingDetails: {
				arrivalDate: new Date(),
				departureDate: new Date(),
				guests: 0,
				nights: 0
			},
			messageDetails: '',
			reviewedAlready: false,
            review: {
			    rating: 0,
			    comment: ''
            },
            reviewError: false,
            reviewDataDismiss: ''
		}
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
		heartToggle() {
			this.heartFilled = !this.heartFilled;

			if (this.favIconStyle.color === 'grey') {

				this.favIconStyle.color = 'red';
				// this.addFavorite(this.info._id);

				let sessionToken = this.getSessionToken;
				let baseURL = this.getServerBaseURL;

				axios.post(baseURL + 'user/updatefavorites', {
					action: 'INSERT',
					propertyID: this.propertyDetails._id
				}, {
					headers: {
						'x-auth': sessionToken
					}
				}).then(res => {
					// console.log(res);
				}).catch(err => {
					// console.log(err);
				})

			} else {
				this.favIconStyle.color = 'grey';

				let sessionToken = this.getSessionToken;
				let baseURL = this.getServerBaseURL;

				// this.removeFavorite(this.info._id);

				axios.post(baseURL + 'user/updatefavorites', {
					action: 'DELETE',
					propertyID: this.propertyDetails._id
				}, {
					headers: {
						'x-auth': sessionToken
					}
				}).then(res => {
					// console.log(res);
				}).catch(err => {
					// console.log(err);
				});
			}
		},
		bookNow() {
			this.$router.push({
				path: '/booking',
				query: {
					id: this.propertyDetails._id
				}
			});
		},
		onSlideStart(slide) {
			this.sliding = true;
		},
		onSlideEnd(slide) {
			this.sliding = false;
		},
		fetchReservedDates() {
			let baseURL = this.getServerBaseURL;
			axios.post(baseURL + 'property/reservations', {propertyID: this.$route.query.id})
				.then(res => {
					if (res.status === 200) {
						// console.log(res.data.reservationDates);
						this.attributes = [];

						for (const date of res.data.reservationDates) {
							let formattedDate = {
								key: 'booked-dates',
								highlight: {
									color: 'red',
									fillMode: 'light'
								},
								dates: {
									start: new Date(date.start),
									end: new Date(date.end)
								}
							};

							this.attributes.push(formattedDate);
						}

					} else {
						// console.log(res);
					}
				}).catch(err => {
				console.log(err);
			});

		},
		parseAmenities(tempProperty) {
			for (let j = 0; j < tempProperty.accommodationServices.amenities.length; j++) {
				tempProperty.accommodationServices.amenities[j] = JSON.parse(tempProperty.accommodationServices.amenities[j]);
			}
			for (let j = 0; j < tempProperty.rulesForGuests.length; j++) {
				tempProperty.rulesForGuests[j] = JSON.parse(tempProperty.rulesForGuests[j]);
			}
			this.propertyDetails = tempProperty;
			// console.log(this.properties[0]);
		},
		parseAndReturnAmenities(tempProperty) {
			for (let j = 0; j < tempProperty.accommodationServices.amenities.length; j++) {
				tempProperty.accommodationServices.amenities[j] = JSON.parse(tempProperty.accommodationServices.amenities[j]);
			}
			for (let j = 0; j < tempProperty.rulesForGuests.length; j++) {
				tempProperty.rulesForGuests[j] = JSON.parse(tempProperty.rulesForGuests[j]);
			}
			return tempProperty;
			// console.log(this.properties[0]);
		},
		getFormattedDate(date) {
			return date.format('MMMM D');
		},
		fetchPropertyDetails() {
			let baseURL = this.getServerBaseURL;

			axios.post(baseURL + 'property/viewbyid', {
				propertyID: this.$route.query.id
			}).then(res => {
				let tempProperty = res.data.property;
				this.parseAmenities(tempProperty);
				this.fetchSuggestedProperties();
				// console.log(this.propertyDetails);
			}).catch(err => {
				console.log(err);
			});
		},
		checkIfFavorite() {
			if (this.getLoggedIn && this.getSessionDetails.userMode === 'GUEST') {
				let baseURL = this.getServerBaseURL;
				let sessionToken = this.getSessionToken;

				axios.post(baseURL + "user/favorites", {}, {
					headers: {
						'x-auth': sessionToken
					}
				}).then(res => {
                    // console.log(res.data);
					for (const favorite of res.data.favorites) {
						if (favorite._id === this.propertyDetails._id) {
							this.favIconStyle.color = 'red';
							return;
						}
					}
				}).catch(err => {
					console.log(err);
				});
			}
		},
		fetchSuggestedProperties() {
			let serverBaseURL = this.getServerBaseURL;

			// console.log(filterObject);

			axios.post(serverBaseURL + 'property/sample', {typeOfProperty: this.propertyDetails.typeOfProperty})
				.then(res => {
					// let tempProperties = res.data.properties;
					// console.log(tempProperties);
					this.suggestedProperties = res.data.properties;
				})
				.catch(err => {
					// console.log('in error');
					// console.log(err.response.data);
				});
		},
		getRandomInt(num, max) {
			if (max < num) num = max;
			let arr = [];
			while (arr.length < num) {
				let r = Math.floor(Math.random() * max);
				if (arr.indexOf(r) === -1) arr.push(r);
			}
			return arr;
		},
		sendMessage() {
			let messageObject = {
				propertyID: this.$route.query.id,
				messageDetails: this.messageDetails
			}

			let sessionToken = this.getSessionToken;
			let serverBaseURL = this.getServerBaseURL;

			axios.post(serverBaseURL + 'message/insert', {messageObject}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.makeToast('success', 'Success', 'Message sent!');
				this.messageDetails = '';
			}).catch(err => {
				this.makeToast('danger', 'Error', 'Message could not be sent!');
				console.log(err);
			});
		},
		fetchReviews() {
			let sessionToken = this.getSessionToken;
			let serverBaseURL = this.getServerBaseURL;

			axios.post(serverBaseURL + 'property/reviews', {propertyID: this.$route.query.id}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.reviews = res.data.reviewList;
				if(this.reviews.length > 0) {
					// console.log(this.reviews[0].username);
					// console.log(this.getSessionDetails.username);
					if(this.reviews[0].username === this.getSessionDetails.username) {
						this.reviewedAlready = true;
					}
				}
				// console.log("In details fetchReviews");
				// console.log(this.reviews);
			}).catch(err => {
				console.log(err.response);
			});
		},
        updateRating(rating) {
		    this.review.rating = rating;
        },
        addReview() {
		    if (this.review.comment === '' || this.review.rating < 1) {
		        this.reviewError = true;
		        return;
            }
            this.reviewError = false;

            let sessionToken = this.getSessionToken;
            let serverBaseURL = this.getServerBaseURL;
			let reqBody = {};
			let routePostfix = 'review/';

			if (!this.reviewedAlready) {
				let reviewObject = {
					propertyID: this.$route.query.id,
					comment: this.review.comment,
					rating: this.review.rating
				};
				reqBody.reviewObject = reviewObject;
				routePostfix += 'insert';
			} else {
				let reviewUpdate = this.review;
				reqBody.reviewUpdate = reviewUpdate;
				routePostfix += 'update';
			}

            axios.post(serverBaseURL + routePostfix, reqBody, {
                headers: {
                    'x-auth': sessionToken
                }
            }).then(res => {
                this.fetchReviews();
				this.fetchPropertyDetails();
                this.reviewedAlready = true;
                this.reviewDataDismiss = '';
                this.review = {
                    rating: 0,
                    comment: ''
                }
				this.makeToast('success', 'Success', 'Review added successfully!');
            }).catch(err => {
                console.log(err.response);
            });
            this.reviewDataDismiss = 'modal';
        },
		resolveEditStatus() {
			if (this.reviewedAlready) this.review = this.reviews[0].reviewObject;
		},
		deleteReview() {
			let sessionToken = this.getSessionToken;
            let serverBaseURL = this.getServerBaseURL;
			let reviewID = this.reviews[0].reviewObject._id;

			axios.post(serverBaseURL + 'review/delete', {
				reviewID
			}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				// console.log(res.data);
				this.fetchReviews();
				this.fetchPropertyDetails();
				this.makeToast('success', 'Success', 'Review deleted successfully!');
			})
		}
	},
	computed: {
		...mapGetters([
			'getLoggedIn',
			'getServerBaseURL',
			'getSessionToken',
			'getSessionDetails'
		]),
		guestCount() {
			if (this.bookingDetails.guests === '1' || this.bookingDetails.guests === 1) return '1 Person';
			else return this.bookingDetails.guests.toString() + ' Persons';
		},
		totalPrice() {
			return this.propertyDetails.price.basePrice * this.getTotalNights;
		},
		getArrivalDate() {
			let aD = new moment(this.bookingDetails.arrivalDate);
			return aD.format('MMMM D');
		},
		getDepartureDate() {
			let dD = new moment(this.bookingDetails.departureDate);
			return dD.format('MMMM D');
		},
		getTotalNights() {
			let aD = new moment(this.bookingDetails.arrivalDate);
			let dD = new moment(this.bookingDetails.departureDate);
			return Math.max(dD.diff(aD, 'days'), 1);
		},
		getBedroomCount() {
			if (this.propertyDetails.accommodationServices.bedroom.count <= 1) return '1 Bedroom';
			else return this.propertyDetails.accommodationServices.bedroom.count.toString() + ' Bedrooms';
		},
		getBathroomCount() {
			if (this.propertyDetails.accommodationServices.bathroom.count <= 1) return '1 Bathroom';
			else return this.propertyDetails.accommodationServices.bathroom.count.toString() + ' Bathrooms';
		},
		getBedCount() {
			if (this.propertyDetails.accommodationServices.bedroom.bedCount <= 1) return '1 Bed';
			else return this.propertyDetails.accommodationServices.bedroom.bedCount.toString() + ' Beds';
		},
		getRatingText() {
			if (this.propertyDetails.rating.timesRated === 0) {
				return 'No reviews';
			}
			return 'Rating: ' + this.propertyDetails.rating.value + ' (' + this.propertyDetails.rating.timesRated + ' reviews)';
		}
	},
	mounted() {
		this.fetchPropertyDetails();
		this.checkIfFavorite();
		this.fetchReservedDates();
		this.fetchReviews();
	}
}
</script>

<style scoped>

#sticky-price-card {
	top: 30px !important;
}

textarea.reply-text, textarea.reply-text:focus, textarea.reply-text:active {
	-webkit-box-shadow: none;
	box-shadow: none;
	outline: none;
	border: none;
}

.elux-custom-shadow {
	box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}

.custom-active {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	border-bottom: 3px solid #e0a800;
	font-weight: bold;
}

.message-unstarred {
	color: rgba(0, 0, 0, 0.2);
}

.checked {
     color: orange;
 }

</style>
