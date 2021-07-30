<template>
	<div class="container">
		<div class="row px-5 py-3 mt-5 mb-3">
			<div class="col-12 text-left"
				 style="border-bottom: 1px solid rgba(200,200,200,0.9)">
				<button class="btn mr-5"
						@click="isApprovedCheck=false"
						:class="{'custom-active': !isApprovedCheck}">
					Pending
				</button>
				<button class="btn mr-5"
						@click="isApprovedCheck=true"
						:class="{'custom-active': isApprovedCheck}">
					Approved
				</button>
			</div>
		</div>

		<div class="row mt-3 px-5">
			<div class="col-2 text-left pr-3">
				<h6 class="font-weight-bold">Status</h6>
			</div>
			<div class="col-3 text-left pr-3">
				<h6 class="font-weight-bold">Host</h6>
			</div>
			<div class="col-3 text-left">
				<h6 class="font-weight-bold">Title</h6>
			</div>
		</div>

		<div class="row my-3 px-5"
			 v-for="(property, index) in properties"
			 v-if="property.isApproved===isApprovedCheck">
			<div class="col-lg-2 text-left pr-3">
				<h6 class="font-weight-bold"
					style="line-height: 50px"
					:class="{
					'text-danger':isApprovedCheck===false,
					'text-success':isApprovedCheck===true
				}">
					{{ property.isApproved ? 'Approved' : 'Pending' }}
				</h6>
			</div>
			<div class="col-lg-3 text-left">
				<button
					@click="$router.push({
						path: '/hostprofile',
						query: {
							hostID: hosts[index]._id
						}
					})"
					class="btn bg-transparent p-0 h6 font-weight-bold text-warning"
					style="line-height: 50px">
					{{ hosts[index].name.firstName }} {{ hosts[index].name.lastName }}
				</button>
			</div>
			<div class="col-lg-4 text-left">
				<button
					class="btn bg-transparent p-0"
					@click="$router.push({
						path:'/details',
						query: {
							id: property._id
						}
					})">
					<span class="h6 font-weight-bold text-warning"
						  style="line-height: 50px">
						{{ property.title }}
					</span>
				</button>
			</div>
			<div class="col-lg-3 text-right">
				<button
					@click="executeApprovalChange(index)"
					class="btn"
					:class="{
						'btn-danger': isApprovedCheck===true,
						'btn-success': isApprovedCheck===false
					}">
					{{ isApprovedCheck ? 'Revoke' : 'Approve' }}
				</button>
			</div>
		</div>

	</div>
</template>

<script>
import {mapGetters} from 'vuex';

import axios from "axios";

export default {
	name: "ApproveListing",
	data() {
		return {
			isApprovedCheck: false,
			properties: [],
			hosts: []
		}
	},
	computed: {
		...mapGetters([
			'getServerBaseURL',
			'getSessionToken'
		])
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
		fetchProperties() {
			let baseURL = this.getServerBaseURL;


			// console.log(filterObject);

			axios.post(baseURL + 'property/viewall', {}, {
				headers: {
					'x-auth': this.getSessionToken
				}
			}).then(res => {

				let tempProperties = res.data.properties;
				this.parseAmenities(tempProperties);

				for (const property of this.properties) {
					// console.log(property);
					axios.post(baseURL + 'user/viewbyid', {
						userDetailID: property.ownerID
					}, {
						headers: {
							'x-auth': this.getSessionToken
						}
					}).then(res => {
						this.hosts.push(res.data.userProfile);
					}).catch(err => {
						console.log(err.response.data);
					});
				}
				// console.log(this.hosts);
				// console.log(tempProperties);

			}).catch(err => {
				// console.log('in error');
				// console.log(err.response.data);
			});
		},
		parseAmenities(tempProperties) {
			for (let i = 0; i < tempProperties.length; i++) {
				for (let j = 0; j < tempProperties[i].accommodationServices.amenities.length; j++) {
					tempProperties[i].accommodationServices.amenities[j] = JSON.parse(tempProperties[i].accommodationServices.amenities[j]).name;
				}
				for (let j = 0; j < tempProperties[i].rulesForGuests.length; j++) {
					tempProperties[i].rulesForGuests[j] = JSON.parse(tempProperties[i].rulesForGuests[j]).name;
				}
			}
			this.properties = tempProperties;
			// console.log(this.properties.length);
		},
		executeApprovalChange(idx) {

			let baseURL = this.getServerBaseURL;
			let sessionToken = this.getSessionToken;

			this.properties[idx].isApproved = !this.isApprovedCheck;

			console.log(this.properties[idx]);

			axios.post(baseURL + 'property/update', {
				propertyID: this.properties[idx]._id,
				propertyObject: {
					isApproved: this.properties[idx].isApproved
				}
			}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				// console.log(res);
				this.makeToast('success', 'Success', 'Property status has been updated successfully');
				this.fetchProperties();
			}).catch(err => {
				this.makeToast('danger', 'Error', err.response);
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
