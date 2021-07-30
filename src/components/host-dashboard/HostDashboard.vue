<template>
	<div>
		<div class="container">
			<div class="row mt-5">

				<div class="col-11 col-lg-7 text-left px-lg-3 mb-3 mx-auto">

					<div class="card my-card-border elux-custom-shadow px-5">

						<div class="row mt-4 mb-3">
							<div class="col-10">
								<h4 class="text-left font-weight-bold"
									style="line-height: 30px;">
									Requests
								</h4>
							</div>
							<div class="col-1 ml-auto">
								<h4 class="my-card-border text-white"
									:class="{'bg-secondary': reservationRequests.length===0, 'bg-warning': reservationRequests.length>=1}"
									style="width: 30px; height: 30px; line-height: 30px; font-size: large">
									{{ reservationRequests.length }}
								</h4>
							</div>
						</div>

						<div v-for="(reservationRequest, index) in reservationRequests">

							<div class="row mb-5">

								<div class="col-12 col-lg-2 mb-3 mb-lg-0 text-left">
									<img :src="reservationRequest.guestImage" alt="Profile Image"
										 style="width: 50px; height: 50px; border-radius: 60px">
								</div>

								<div class="col-12 col-lg-5 text-left pl-3 pl-lg-0" style="font-size: medium">
									<div class="row">
										<div class="col-10 text-left">
											{{ reservationRequest.guestName.firstName }} {{
												reservationRequest.guestName.lastName
											}}
										</div>
									</div>
									<div class="row">
										<div class="col-10 text-left">
											{{ reservationRequest.guestContacts.phone }}
										</div>
									</div>
									<div class="row">
										<div class="col-10 text-left">
											{{ reservationRequest.guestContacts.email }}
										</div>
									</div>
								</div>

								<div class="col-12 col-lg-5 my-3 my-lg-0 pl-3 pl-lg-0" style="font-size: medium">
									<div class="row">
										<div class="col-12 text-left">
											{{ getFormattedDate(reservationRequest.checkIn) }} to
											{{ getFormattedDate(reservationRequest.checkOut) }}
										</div>
									</div>
									<div class="row">
										<div class="col-12 text-left">
											{{ reservationRequest.title }}
										</div>
									</div>
									<div class="row">
										<div class="col-12 text-left">
											{{ reservationRequest.streetAddress }}
										</div>
									</div>
								</div>
							</div>
							<hr class="mr-4 my-3" v-if="reservationRequests.length - 1 > index">
						</div>
					</div>

					<div class="card my-card-border elux-custom-shadow text-left px-5 mt-3">
						<div class="row mt-4 mb-3">
							<div class="col-8">
								<h4 class="text-left"
									style="line-height: 30px;">
									Reservations
								</h4>
							</div>
							<div class="col-1 ml-auto">
								<h4 class="my-card-border bg-secondary text-white"
									:class="{'bg-secondary': reservations.length===0, 'bg-warning': reservations.length>=1}"
									style="width: 30px; height: 30px; line-height: 30px; font-size: large">
									{{ reservations.length }}
								</h4>
							</div>
						</div>


						<div v-for="(reservationRequest, index) in reservations">

							<div class="row mb-4">

								<div class="col-12 col-lg-2 mb-3 mb-lg-0 text-left">
									<img :src="reservationRequest.guestImage" alt="Profile Image"
										 style="width: 50px; height: 50px; border-radius: 60px">
								</div>

								<div class="col-12 col-lg-4 text-left pl-3 pl-lg-0" style="font-size: medium">
									<div class="row">
										<div class="col-10 text-left">
											{{ reservationRequest.guestName.firstName }} {{
												reservationRequest.guestName.lastName
											}}
										</div>
									</div>
									<div class="row">
										<div class="col-10 text-left">
											{{ reservationRequest.guestContacts.phone }}
										</div>
									</div>
									<div class="row">
										<div class="col-10 text-left">
											{{ reservationRequest.guestContacts.email }}
										</div>
									</div>
								</div>

								<div class="col-12 col-lg-6 my-3 my-lg-0 pl-3 pl-lg-0" style="font-size: medium">
									<div class="row">
										<div class="col-12 text-left">
											{{ getFormattedDate(reservationRequest.checkIn) }} -
											{{ getFormattedDate(reservationRequest.checkOut) }}
										</div>
									</div>
									<div class="row">
										<div class="col-12 text-left">
											{{ reservationRequest.title }}
										</div>
									</div>
									<div class="row">
										<div class="col-12 text-left">
											{{ reservationRequest.streetAddress }}
										</div>
									</div>
								</div>
							</div>
							<hr class="mr-4 my-3" v-if="reservationRequests.length - 1 > index">
						</div>
					</div>

				</div>

				<div class="col-11 col-lg-5 text-left px-lg-3 mb-3 mx-auto">
					<div class="card my-card-border elux-custom-shadow text-left px-5">
						<div class="row mt-4 mb-3">
							<div class="col-8">
								<h4 class="text-left"
									style="line-height: 30px;">
									Notifications
								</h4>
							</div>
							<div class="col-1 ml-auto">
								<h4 class="my-card-border bg-secondary text-white"
									:class="{'bg-secondary': unreadNotificationCount===0, 'bg-warning': unreadNotificationCount>=1}"
									style="width: 30px; height: 30px; line-height: 30px; font-size: large">
									{{ unreadNotificationCount }}
								</h4>
							</div>
						</div>

						<div class="row mb-3" v-for="(notification, index) in notifications">
							<div class="col-12">
								<h6 class="text-left"
									:class="{
										'font-weight-bold': !notification.read,
										'font-weight-light': notification.read
									}">
									{{ notification.text }}
								</h6>
								<hr class="mr-4 my-3" v-if="notifications.length - 1 > index">
							</div>
						</div>

						<div class="row">
							<div class="col-12 mx-auto my-4">
								<button
									@click="$router.push('/notifications')"
									class="btn btn-warning py-2 w-100 text-white" style="border-radius: 15px">
									View All
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
import moment from 'moment';
import axios from 'axios';

import {mapGetters} from "vuex";

export default {
	name: "HostDashboard",
	data() {
		return {
			reservationRequests: [
			],
			reservations: [
			],
			notifications: [
				{
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh ',
					read: false
				},
				{
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh ',
					read: true
				},
				{
					text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh ',
					read: true
				}
			]
		}
	},
	methods: {
		getFormattedDate(date) {
			let newDate = moment(date);
			return newDate.format('YYYY-MM-DD');
		}
	},
	computed: {
		...mapGetters([
			'getSessionToken',
			'getServerBaseURL'
		]),
		unreadNotificationCount() {
			let count = 0;
			for (const notification of this.notifications) {
				if (!notification.read) {
					count = count + 1;
				}
			}
			return count;
		}
	},
	// mounted() {
	// 	let sessionToken = this.getSessionToken;
	// 	let baseURL = this.getServerBaseURL;
	//
	// 	axios.post(baseURL + 'host/reservations', {}, {
	// 		headers: {
	// 			'x-auth': sessionToken
	// 		}
	// 	}).then(res => {
	// 		console.log(res.data.reservationList);
	// 		this.reservationRequests = res.data.reservationList;
	// 	}).catch(err => {
	// 		console.log(err);
	// 	})
	// },
	mounted() {
		let sessionToken = this.getSessionToken;
		let baseURL = this.getServerBaseURL;

		axios.post(baseURL + 'user/reservations/owned', {}, {
			headers: {
				'x-auth': sessionToken
			}
		}).then(res => {
			console.log(res.data.reservationList);
			for (const reservation of res.data.reservationList) {
				if (new Date(reservation.checkIn) > new Date()) {
					this.reservationRequests.push(reservation);
				}
				else {
					this.reservations.push(reservation);
				}
			}

		}).catch(err => {
			// console.log(err);
		})
	}
}
</script>

<style scoped>

.elux-custom-shadow {
	box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}

</style>
