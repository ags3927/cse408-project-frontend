<template>
	<div class="container">
		<div class="row">

			<div class="col-10 px-3 px-lg-0 mx-auto">
				<div class="card my-card-border mt-5 mb-3 elux-custom-shadow py-5 text-left">
					<div class="row px-5">
						<div class="col-12 col-lg-9 mx-auto custom-text-left">
							<h5 class="font-weight-bold">
								{{ getTodaysDate }}
							</h5>
							<h6 class="font-weight-light">
								Operating Time: {{ hostObject.operatingTime }}
							</h6>
						</div>

						<div class="col-12 col-lg-3 mt-3 mt-lg-0 ml-lg-auto custom-btn-right">
							<button
								v-if="!hostObject.blockServices.status"
								@click="blockTime"
								class="btn btn-danger px-4 py-2" style="border-radius: 15px">
								Block Time
							</button>
							<button
								v-if="hostObject.blockServices.status"
								@click="unblockTime"
								class="btn btn-success px-4 py-2" style="border-radius: 15px">
								Unblock Time
							</button>
						</div>

					</div>

				</div>
			</div>

			<div class="col-12 col-lg-4 px-5 px-lg-0 pr-lg-3 ml-auto">
				<div class="card my-card-border my-3 elux-custom-shadow text-left">
					<h5 class="font-weight-bold mx-auto mt-4">Calendar</h5>
					<hr class="mb-3 mx-auto" style="width: 90%">
					<v-calendar
						class="mx-auto border-0 px-3 mb-4"
						:attributes="attributes"
						:disabled-dates="bookedDates"/>

				</div>
			</div>

			<div class="col-12 col-lg-6 mr-auto px-5 px-lg-0 pl-lg-3">

				<div class="card my-card-border my-3 elux-custom-shadow text-left">

					<h5 class="font-weight-bold mx-auto mt-4">Select Property</h5>
					<hr class="mb-3 mx-auto" style="width: 90%">

					<div class="dropdown show my-guest-btn mb-4">
						<a class="btn dropdown-toggle text-dark border-0 w-75 elux-custom-shadow my-card-border px-3"
						   style="line-height: 30px"
						   href="#" role="button" id="calendar-property-dd"
						   data-toggle="dropdown"
						   aria-haspopup="true" aria-expanded="false">
							{{ calendarSelectedProperty.title }}
						</a>

						<form id="calendar-property-dd-menu"
							  class="dropdown-menu my-card-border px-4 my-guest-card-min-width">
							<div class="row">
								<button
									data-toggle="dropdown"
									@click.prevent="updateCalendar(hostProperty)"
									class="btn btn-light bg-white col-12 px-3"
									v-for="hostProperty in hostProperties">
									{{ hostProperty.title }}
								</button>
							</div>
						</form>
					</div>

				</div>

				<div class="card my-card-border my-3 elux-custom-shadow text-left">
					<h5 class="font-weight-bold mx-auto mt-4">Operating Hours</h5>
					<hr class="mb-3 mx-auto" style="width: 90%">
					<b-form-input
						:disabled="!editOperatingTime"
						class="w-75 mx-auto border-0 elux-custom-shadow my-card-border"
						v-model="hostObject.operatingTime">
					</b-form-input>

					<button
						@click="opTimeBtnClick"
						style="border-radius: 12px"
						class="btn btn-warning px-5 py-2 mx-auto text-white my-3">
						{{ btnText }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';

import moment from 'moment';

export default {
	name: "Calendar",
	data() {
		return {
			hostObject: {
				blockServices: {
					status: false
				},
				operatingTime: "All Day"
			},
			editOperatingTime: false,
			btnText: 'Edit',
			calendarSelectedProperty: 'Select Property',
			hostProperties: [],
			bookedDates: [
				{
					start: null,
					end: new Date()
				}
			],
			attributes: [

			]
		}
	},
	computed: {
		...mapGetters([
			'getSessionToken',
			'getServerBaseURL'
		]),
		getTodaysDate() {
			let today = moment(new Date());
			return today.format('dddd, MMM DD');
		}
	},
	methods: {
		...mapMutations([
			'setProfileDetails'
		]),
		updateCalendar(hostProperty) {
			this.calendarSelectedProperty = hostProperty;
			this.fetchReservedDates();
		},
		fetchReservedDates() {
			let baseURL = this.getServerBaseURL;
			axios.post(baseURL + 'property/reservations', {propertyID: this.calendarSelectedProperty._id})
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

						// console.log(this.bookedDates);
					} else {
						console.log(res);
					}
				}).catch(err => {
				console.log(err);
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
				this.hostProperties = res.data.properties;
			}).catch(err => {
				// console.log(err);
			});
		},
		opTimeBtnClick() {
			if (this.editOperatingTime) this.btnText = 'Edit';
			else this.btnText = 'Save';
			this.editOperatingTime = !this.editOperatingTime;
		},
		blockTime() {
			let sessionToken = this.getSessionToken;
			let baseURL = this.getServerBaseURL;

			axios.post(baseURL + 'host/update', {
				hostObject: {
					blockServices: {
						status: true
					}
				}
			}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.hostObject.blockServices.status = true;
				// console.log(res);
			}).catch(err => {
				// console.log(err);
			});
		},
		unblockTime() {

			let sessionToken = this.getSessionToken;
			let baseURL = this.getServerBaseURL;

			axios.post(baseURL + 'host/update', {
				hostObject: {
					blockServices: {
						status: false
					}
				}
			}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.hostObject.blockServices.status = false;
				// console.log(res);
			}).catch(err => {
				// console.log(err);
			});
		}
	},
	mounted() {
		this.fetchProperties();
	}
}
</script>

<style scoped>

.dropdown-toggle#calendar-property-dd:hover{
	background-color: rgba(153, 153, 153, 0.3);
}

.dropdown-toggle#calendar-property-dd{
	background-color: white;
}

@media (min-width: 576px) {
	.custom-text-left {
		text-align: left!important;
	}
}
@media (min-width: 992px) {
	.custom-btn-right {
		text-align: right!important;
	}
}

.elux-custom-shadow {
	box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}


</style>
