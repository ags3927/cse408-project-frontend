<template>
	<div class="container">
		<div class="card my-card-border my-5 elux-custom-shadow">
			<div class="row px-5 py-3 mb-3">
				<div class="col-12 text-left"
					 style="border-bottom: 1px solid rgba(200,200,200,0.9)">
					<button class="btn mr-5"
							@click="showReservations='Upcoming'"
							:class="{'custom-active': showReservations==='Upcoming'}">
						Upcoming
					</button>
					<button class="btn mr-5"
							@click="showReservations='Completed'"
							:class="{'custom-active': showReservations==='Completed'}">
						Completed
					</button>
					<button class="btn mr-5"
							@click="showReservations='Canceled'"
							:class="{'custom-active': showReservations==='Canceled'}">
						Canceled
					</button>
					<button class="btn mr-5"
							@click="showReservations='All'"
							:class="{'custom-active': showReservations==='All'}">
						All
					</button>
				</div>
			</div>

			<div class="row mt-3 px-5">
				<div class="col-2 text-left pr-3">
					<h6 class="font-weight-bold">Status</h6>
				</div>
				<div class="col-5 text-left">
					<h6 class="font-weight-bold">Property Details</h6>
				</div>
				<div class="col-3 text-left">
					<h6 class="font-weight-bold">Check In - Check Out</h6>
				</div>
				<div class="col-2 text-left">
					<h6 class="font-weight-bold">Pricing</h6>
				</div>
			</div>

			<hr class="mx-4">

			<div :key="reservation+index" v-for="(reservation, index) in getReservationsToShow">
				<div class="row px-5 mb-3">

					<div class="col-2 text-left">
						<h6 class="font-weight-bold">
							{{ reservation.status }}
						</h6>
					</div>

					<div class="col-5 text-left">
						<button
							@click="$router.push({
								path: '/details',
								query: {
									id: reservation.propertyID
								}
							})"
							class="btn h6 font-weight-light text-left my-clickable text-warning"
							style="padding: 0">
							{{ reservation.propertyTitle }}
						</button>

						<h6 class="font-weight-light">
							{{ reservation.propertyAddress.streetAddress }} {{ reservation.propertyAddress.area }}
							{{ reservation.propertyAddress.city }}
						</h6>
					</div>

					<div class="col-3 text-left">
						<h6 class="font-weight-light">
							{{ getFormattedDate(reservation.checkIn) }}
						</h6>
						<h6 class="font-weight-light">
							{{ getFormattedDate(reservation.checkOut) }}
						</h6>
					</div>
					<div class="col-2 text-left">
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
			reservations: [],
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
			return formattedDate.format('YYYY-MM-DD');
		},
		checkShowCondition(index) {
			if (this.showReservations === 'All') return true;
			else if (this.showReservations === 'Upcoming') {
				return new Date(this.reservations[index].checkIn) > new Date();
			} else if (this.showReservations === 'Completed') {
				return new Date(this.reservations[index].checkOut) < new Date();
			} else if (this.showReservations === 'Canceled') {
				return this.reservations[index].status === 'CANCELED';
			}
		},
		getTotalPrice(reservation) {
			let aD = moment(reservation.checkIn);
			let dD = moment(reservation.checkOut);
			let days = dD.diff(aD, 'days');
			return days * (reservation.price.basePrice - (reservation.price.discountPercentage / 100 * reservation.price.basePrice));
		}
	},
	mounted() {
		let sessionToken = this.getSessionToken;
		let baseURL = this.getServerBaseURL;

		axios.post(baseURL + 'user/reservations/reserved', {}, {
			headers: {
				'x-auth': sessionToken
			}
		}).then(res => {
			// console.log(res.data.reservationList);
			this.reservations = res.data.reservationList;

		}).catch(err => {
			console.log(err.response);
		})
	}

}
</script>

<style scoped>

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
