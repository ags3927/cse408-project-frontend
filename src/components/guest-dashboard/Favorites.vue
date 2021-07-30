<template>
	<div class="container">
		<div class="card outer-card my-5">
			<div class="row px-5 py-3 mb-3">
				<div class="col-12 text-left"
					 style="border-bottom: 1px solid rgba(200,200,200,0.9)">
					<button class="btn custom-active">
						Favorites
					</button>
				</div>
			</div>

			<div :key="favorite + index" v-for="(favorite, index) in favorites">
				<div class="row px-5 mb-4">

					<div class="col-12 col-lg-3 text-left my-3 my-lg-0">
						<img :src="favorite.imagesOfProperty[0]" alt="Property Image"
							 style="width: 80%; height: 240px; border-radius: 12px">
					</div>

					<div class="col-12 col-lg-6 text-left my-3 my-lg-0">
						<h6 class="font-weight-bold">{{ favorite.title }}</h6>
						<h6 class="font-weight-light">
							<fa-icon :icon="['fas', 'star']" class="text-warning"></fa-icon>
							{{ favorite.rating.value }} ({{ favorite.rating.timesRated }})
						</h6>
						<h6 class="font-weight-light">
							{{ favorite.title }}
						</h6>

						<div class="card text-white"
							 style="background-color: black; border-radius: 4px; width: 150px; height: 40px">
							<h6 style="line-height: 40px">
								${{ numberWithCommas(favorite.price.basePrice) }} / night
							</h6>
						</div>

					</div>

					<div class="col-12 col-lg-3 text-left my-3 my-lg-0">
						<div class="row mb-3">
							<div class="col-6 text-left pl-3 pl-lg-0">
								<button
									@click="viewDetails(favorite)"
									class="btn detail-btn-bg elux-custom-shadow mb-3"
									style="border-radius: 15px; width: 130px">
									View Detail
								</button>
								<button
									@click="bookNow(favorite)"
									class="btn btn-warning elux-custom-shadow text-white"
									style="border-radius: 15px; width: 130px">
									Book Now
								</button>
							</div>
							<div class="col-6 text-left">
								<button class="btn" @click="deleteFavorite(index)">
									<fa-icon :icon="['fas', 'trash-alt']"
											 class="text-secondary"
											style="font-size: 30px">
									</fa-icon>
								</button>
							</div>
						</div>
					</div>

				</div>
				<hr class="mx-4 my-4" v-if="index<favorites.length-1">
			</div>

			<div class="mb-4"></div>

		</div>
	</div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

library.add(faStar);
library.add(faTrashAlt);

export default {
	name: "Favorites",
	data() {
		return {
			favorites: []
		}
	},
	methods: {
		...mapMutations([
			'removeFavorite'
		]),
		numberWithCommas(number) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		viewDetails(favorite) {
			this.$router.push({
				path: '/details',
				query: {
					id: favorite._id
				}
			});
		},
		bookNow(favorite) {
			this.$router.push({
				path: '/booking',
				query: {
					id: favorite._id
				}
			});
		},
		deleteFavorite(index) {
			this.removeFavorite(this.favorites[index]._id);

			let sessionToken = this.getSessionToken;
			let baseURL = this.getServerBaseURL;


			axios.post(baseURL + 'user/updatefavorites', {
				action: 'DELETE',
				propertyID: this.favorites[index]._id
			}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				// console.log(res);
			}).catch(err => {
				// console.log(err);
			});

			this.favorites.splice(index, 1);
		}
	},
	computed: {
		...mapGetters([
			'getSessionToken',
			'getServerBaseURL',
		])
	},
	mounted() {
		let sessionToken = this.getSessionToken;
		let baseURL = this.getServerBaseURL;
		axios.post(baseURL + 'user/favorites', {}, {
			headers: {
				'x-auth': sessionToken
			}
		}).then(res => {
			// console.log(res.data.favorites);
			this.favorites = res.data.favorites;
		}).catch(err => {
			// console.log(err.data);
		})
	}
}
</script>

<style scoped>
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

.custom-active {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	font-weight: bold;
}

.message-unstarred {
	color: rgba(0, 0, 0, 0.2);
}

.detail-btn-bg {
	background-color: #F3F3F3;
}

.detail-btn-bg:hover {
	background-color: #E3E3E3;
}

</style>
