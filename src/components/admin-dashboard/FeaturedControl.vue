<template>
	<div class="container">

		<div class="row my-5 px-5">
			<div class="col-6 text-left">
				<b-form-input
					style="line-height: 50px"
					placeholder="Search your listing"
					class="border-0 my-card-border elux-custom-shadow px-3 w-75"
					v-model="searchText">
				</b-form-input>
			</div>
			<div class="col-6 text-right">
				<div class="dropdown show my-guest-btn">
					<a class="btn dropdown-toggle text-dark border-0 w-75 elux-custom-shadow text-left my-card-border px-3"
					   style="line-height: 30px"
					   href="#" role="button" id="featured-control-property-dd"
					   data-toggle="dropdown"
					   aria-haspopup="true" aria-expanded="false">
						{{ searchPropertyType }}
					</a>

					<form id="featured-control-property-dd-menu"
						  class="dropdown-menu my-card-border px-4 my-guest-card-min-width">
						<div class="row">
							<button
								data-toggle="dropdown"
								@click.prevent="searchPropertyType = propertyType"
								class="btn btn-light bg-white col-12 px-3"
								v-for="propertyType in propertyTypes">
								{{ propertyType }}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		<div class="row px-5 py-3 mt-5 mb-3">
			<div class="col-12 text-left"
				 style="border-bottom: 1px solid rgba(200,200,200,0.9)">
				<button class="btn mr-5"
						@click="isFeaturedCheck=true"
						:class="{'custom-active': isFeaturedCheck}">
					Featured
				</button>
				<button class="btn mr-5"
						@click="isFeaturedCheck=false"
						:class="{'custom-active': !isFeaturedCheck}">
					Not Featured
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
			 v-if="visibilityCheck(property)">
			<div class="col-lg-2 text-left pr-3">
				<h6 class="font-weight-bold"
					style="line-height: 50px"
					:class="{
					'text-danger': isFeaturedCheck===false,
					'text-success': isFeaturedCheck===true
				}">
					{{ property.isFeatured ? 'Featured' : 'Not Featured' }}
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
					@click="executeFeatureChange(index)"
					class="btn"
					:class="{
						'btn-danger': isFeaturedCheck===true,
						'btn-success': isFeaturedCheck===false
					}">
					{{ isFeaturedCheck ? 'Remove From Featured' : 'Feature This Property' }}
				</button>
			</div>
		</div>

	</div>
</template>

<script>
import {mapGetters} from 'vuex';

import axios from "axios";

export default {
	name: "FeaturedControl",
	data() {
		return {
			isFeaturedCheck: true,
			properties: [],
			hosts: [],
			searchText: '',
			searchPropertyType: 'Select Property',
			propertyTypes: [
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
	computed: {
		...mapGetters([
			'getServerBaseURL',
			'getSessionToken'
		])
	},
	methods: {
		matchPropertyType(property) {
			if (this.searchPropertyType === 'Select Property') return true;
			else return this.searchPropertyType === property.typeOfProperty;
		},
		visibilityCheck(property) {
			return (property.isFeatured === this.isFeaturedCheck
					&& property.title.includes(this.searchText)
					&& this.matchPropertyType(property));
		},
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

			let filterObject = {
				location: {
					city: null,
					area: null
				},
				typeOfProperty: [],
				date: {
					start: null,
					end: null
				},
				isFeatured: null,
				accommodationServices: {
					bedroom: {
						count: null,
						bedCount: null,
					},
					bathroom: {
						count: null
					},
					amenities: []
				},
				accommodationCapacity: {
					adults: null,
					children: null,
					infants: null
				}
			};

			// console.log(filterObject);

			axios.post(baseURL + 'property/viewall', {}, {
				headers: {
					'x-auth': this.getSessionToken
				}
			}).then(res => {
                // console.log(res.data.properties);
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
						// console.log(err.response.data);
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
		executeFeatureChange(idx) {

			let baseURL = this.getServerBaseURL;
			let sessionToken = this.getSessionToken;

			this.properties[idx].isFeatured = !this.properties[idx].isFeatured;

			axios.post(baseURL + 'property/update', {
				propertyID: this.properties[idx]._id,
				propertyObject: {
					isFeatured: this.properties[idx].isFeatured
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
				// console.log('WTF')
				this.makeToast('danger', 'Error', err.response.data.message);
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

.dropdown-toggle#featured-control-property-dd:hover{
	background-color: rgba(153, 153, 153, 0.3);
}

.dropdown-toggle#featured-control-property-dd{
	background-color: white;
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

</style>
