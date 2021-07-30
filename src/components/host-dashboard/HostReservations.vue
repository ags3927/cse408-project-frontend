<template>
	<div class="container">

		<div class="row px-3 px-lg-5 py-3 mb-3 mt-5">
			<div class="col-12 text-left"
				 style="border-bottom: 1px solid rgba(200,200,200,0.9)">
				<button class="btn mr-1 mr-lg-5"
						@click="showReservations='Upcoming'"
						:class="{'custom-active': showReservations==='Upcoming'}">
					Upcoming
				</button>
				<button class="btn mr-1 mr-lg-5"
						@click="showReservations='Completed'"
						:class="{'custom-active': showReservations==='Completed'}">
					Completed
				</button>
				<button class="btn mr-1 mr-lg-5"
						@click="showReservations='Canceled'"
						:class="{'custom-active': showReservations==='Canceled'}">
					Canceled
				</button>
				<button class="btn mr-1 mr-lg-5"
						@click="showReservations='All'"
						:class="{'custom-active': showReservations==='All'}">
					All
				</button>
			</div>
		</div>



		<div class="card outer-card mb-5 card-overflow-x">

			<div class="row mt-3 px-5" style="min-width: 1000px">
				<div class="col-2 text-left pr-3">
					<h6 class="font-weight-bold">Status</h6>
				</div>
				<div class="col-3 text-left pr-3">
					<h6 class="font-weight-bold">Guest Details</h6>
				</div>
				<div class="col-3 text-left">
					<h6 class="font-weight-bold">Property Details</h6>
				</div>
				<div class="col-3 text-left px-4">
					<h6 class="font-weight-bold">Check In - Check Out</h6>
				</div>
				<div class="col-1 text-right">
					<h6 class="font-weight-bold">Pricing</h6>
				</div>
			</div>

			<hr class="mx-4">

			<div :key="reservation+index" v-for="(reservation, index) in getReservationsToShow">
				<div class="row px-5 mb-3" style="min-width: 1000px">

					<div class="col-2 text-left" v-if="new Date(reservation.checkIn) < new Date()">

						<h6>
							{{ reservation.status }}
						</h6>

					</div>

					<div class="col-2 text-left" v-if="new Date(reservation.checkIn) >= new Date()">
						<b-form-select
							class="w-75 pl-md-3 mx-auto small"
							:options="reservationStates"
							v-model="reservation.status">
						</b-form-select>

						<button
							:disabled="reservationStateChanged[index] === reservation.status"
							@click="updateReservationStatus(reservation, index)"
							class="btn btn-warning px-3 mt-3"
							style="border-radius: 15px">
							Update
						</button>
					</div>

					<div class="col-3 text-left pr-3">
						<h6 class="font-weight-light">
							{{ reservation.guestName.firstName }} {{ reservation.guestName.firstName }}
						</h6>
						<h6 class="font-weight-light">
							{{ reservation.guestContacts.phone }}
						</h6>
						<h6 class="font-weight-light">
							{{ reservation.guestContacts.email }}
						</h6>
					</div>

					<div class="col-3 text-left">
						<button
							@click="$router.push({
								path: '/details',
								query: {
									id: reservation.propertyID
								}
							})"
							class="h6 btn bg-transparent p-0 font-weight-light text-warning">
							{{ reservation.propertyTitle }}
						</button>
						<h6 class="font-weight-light">
							{{ reservation.propertyAddress.streetAddress }} {{ reservation.propertyAddress.area }}
							{{ reservation.propertyAddress.city }}
						</h6>
					</div>

					<div class="col-3 text-left px-4">
						<h6 class="font-weight-light">
							{{ getFormattedDate(reservation.checkIn) }} -
							{{ getFormattedDate(reservation.checkOut) }}
						</h6>
						<h6 class="font-weight-light">
						</h6>
					</div>
					<div class="col-1 text-right">
						<h6 class="font-weight-light">
							${{ getTotalPrice(reservation) }}
						</h6>
					</div>
				</div>

				<hr class="mx-4" v-if="index<reservations.length-1">
			</div>

		</div>
	</div>
</template>

<script>
import moment from 'moment';

import {mapGetters} from "vuex";
import axios from "axios";

export default {
	name: "Reservations",
	data() {
		return {
			reservationStates: [
				'PENDING',
				'APPROVED',
				'CANCELED'
			],
			reservationStateChanged: [],
			reservations: [
			],
			showReservations: 'All'
		}
	},
	computed: {
		...mapGetters([
			'getSessionToken',
			'getServerBaseURL'
		]),
		getReservationsToShow() {
			return this.reservations.filter(reservation => {
				if (this.showReservations === 'All') return true;
				else if (this.showReservations === 'Upcoming') {
					return new Date(reservation.checkIn) > new Date();
				} else if (this.showReservations === 'Completed') {
					return new Date(reservation.checkOut) < new Date();
				} else if (this.showReservations === 'Canceled') {
					return reservation.status === 'CANCELED';
				}
			})
		},
	},
	methods: {
		getFormattedDate(date) {
			let formattedDate = moment(new Date(date));
			return formattedDate.format('MMM DD, YYYY');
		},
		checkShowCondition(index) {
			if (this.showReservations === 'All') return true;
			else if (this.showReservations === 'Upcoming') {
				return new Date(this.reservations[index].checkIn) > new Date() && this.reservationStateChanged[index] !== 'CANCELED';
			} else if (this.showReservations === 'Completed') {
				return new Date(this.reservations[index].checkOut) < new Date() && this.reservationStateChanged[index] !== 'CANCELED';
			} else if (this.showReservations === 'Canceled') {
				return this.reservationStateChanged[index] === 'CANCELED';
			}
		},
		getTotalPrice(reservation) {
			let aD = moment(reservation.checkIn);
			let dD = moment(reservation.checkOut);
			let days = dD.diff(aD, 'days');
			return days * (reservation.price.basePrice - (reservation.price.discountPercentage / 100 * reservation.price.basePrice));
		},
		updateReservationStatus(reservation, index) {
			let sessionToken = this.getSessionToken;
			let baseURL = this.getServerBaseURL;

			// console.log(reservation);

			axios.post(baseURL + 'reservation/update', {
				reservationObject: {
					_id: reservation.reservationID,
					status: reservation.status
				}
			}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.reservationStateChanged = [];
				for (const reservation of this.reservations) {
					this.reservationStateChanged.push(reservation.status);
				}
				// console.log(res.data);
			}).catch(err => {
				// console.log(err.response.data);
			});
		}
	},
	mounted() {
		let sessionToken = this.getSessionToken;
		let baseURL = this.getServerBaseURL;

		axios.post(baseURL + 'user/reservations/owned', {}, {
			headers: {
				'x-auth': sessionToken
			}
		}).then(res => {
			// console.log(res.data.reservationList);
			this.reservations = res.data.reservationList;
			for (const reservation of this.reservations) {
				this.reservationStateChanged.push(reservation.status);
			}
		}).catch(err => {
			console.log(err.response);
		})
	}

}
</script>

<style scoped>
@media (max-width: 767px) {
	.card-overflow-x {
		overflow-x: scroll;
	}
}

.scroll {
	margin: 4px;
	padding: 4px;
	width: 1vw;
	overflow-x: auto;
	overflow-y: hidden;
	white-space: nowrap;
}

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

.message-unstarred {
	color: rgba(0, 0, 0, 0.2);
}

</style>
