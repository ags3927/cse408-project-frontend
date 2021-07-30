<template>
	<div class="col col-10 col-md-8 col-lg-4 p-2 mb-2 property-card-margin">
		<div class="card my-card-border h-100 shadow border-0 overflow-hidden">
			<b-carousel
				style="height: 400px;"
				v-model="slide"
				:interval="0"
				controls
				@sliding-start="onSlideStart"
				@sliding-end="onSlideEnd">
				<b-carousel-slide
					v-for="(image, index) in info.imagesOfProperty"
					:key="index"
					:img-src="image">
				</b-carousel-slide>
			</b-carousel>

			<div style="z-index: 2;">
				<p class="text-white my-price-box" style="font-size: 13px; line-height: 25px">
					${{ numberWithCommas }} / Night
				</p>
				<p
					class="my-bg-overlay-text text-dark my-off-box pt-3 font-weight-bold text-center small"
					v-if="info.price.discountPercentage > 0 && info.price.discountDuration > 0">
					{{ info.price.discountPercentage }}% OFF
				</p>

				<button
					v-if="getSessionDetails.userType==='GENERAL' && getLoggedIn"
					@click="heartToggle"
					class="btn my-bg-overlay-text my-favorite-icon pt-3 text-center">
					<fa-icon class="fa-2x" icon="heart" :style="favIconStyle"></fa-icon>
				</button>
			</div>

			<div role="button" @click="viewDetail" class="card-body text-left">
				<h5 class="font-weight-bold" style="padding-left: 0.7rem; padding-right: 0.7rem; margin-top: -1rem">
					{{ info.title }}
				</h5>
				<div class="card-text mb-4 text-left" style="padding-left: 0.7rem; padding-right: 0.7rem">
					<i class="fa fa-star my-rating-star mr-2" style="line-height: 25px; font-size: 1.5em"></i>
					<span class="h5" style="line-height: 25px; font-size: 1.5em">
						{{ info.rating.value }} ({{ info.rating.timesRated }})
					</span>
				</div>
				<h6 class="card-text font-weight-light pb-2" style="padding-left: 0.7rem; padding-right: 0.7rem">
					{{ info.description }}
				</h6>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';


import {library} from '@fortawesome/fontawesome-svg-core'
import {faHeart} from '@fortawesome/free-solid-svg-icons'

library.add(faHeart);


export default {
	name: "PropertyCard",
	props: ['info'],
	data() {
		return {
			slide: 0,
			sliding: null,
			heartFilled: false,
			favIconStyle: {
				color: 'white'
			}
		}
	},
	computed: {
		...mapGetters([
			'getSessionToken',
			'getServerBaseURL',
			'getSessionDetails',
			'getLoggedIn'
		]),
		numberWithCommas() {
			return this.info.price.basePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	},
	methods: {
		...mapMutations([
			'removeFavorite',
			'addFavorite',
		]),
		onSlideStart(slide) {
			this.sliding = true;
		},
		onSlideEnd(slide) {
			this.sliding = false;
		},
		heartToggle() {
			this.heartFilled = !this.heartFilled;

			if (this.favIconStyle.color === 'white') {

				this.favIconStyle.color = 'red';
				this.addFavorite(this.info._id);

				let sessionToken = this.getSessionToken;
				let baseURL = this.getServerBaseURL;

				axios.post(baseURL + 'user/updatefavorites', {
					action: 'INSERT',
					propertyID: this.info._id
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
				this.favIconStyle.color = 'white';

				let sessionToken = this.getSessionToken;
				let baseURL = this.getServerBaseURL;

				this.removeFavorite(this.info._id);

				axios.post(baseURL + 'user/updatefavorites', {
					action: 'DELETE',
					propertyID: this.info._id
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
		viewDetail() {
			this.$router.push({
				path: '/details',
				query: {
					id: this.info._id
				}
			});
		},
		checkIfFavorite() {
			if (this.getLoggedIn && this.getSessionDetails.userType === 'GUEST') {
				let baseURL = this.getServerBaseURL;
				let sessionToken = this.getSessionToken;

				axios.post(baseURL + "user/favorites", {}, {
					headers: {
						'x-auth': sessionToken
					}
				}).then(res => {
					for (const favorite of res.data.favorites) {
						if (favorite._id === this.info._id) {
							this.favIconStyle = 'red';
							return;
						}
					}
				}).catch(err => {
					console.log(err);
				});
			}
		}
	},
	mounted() {
		this.checkIfFavorite();
	}
}
</script>

<style scoped>

@media (max-width: 992px) {
	.property-card-margin {
		margin-left: auto;
		margin-right: auto;
	}
}

@media (min-width: 1199px) {
	.my-price-box {
		position: absolute;
		background-color: #000;
		padding: 0.5rem;
		border-radius: 5px;
		height: 40px;
		vertical-align: middle;
		width: fit-content;
		top: 300px;
		right: 25px;
	}
}

@media (min-width: 992px) and (max-width: 1199px) {
	.my-price-box {
		position: absolute;
		background-color: #000;
		padding: 0.5rem;
		border-radius: 5px;
		height: 40px;
		vertical-align: middle;
		width: fit-content;
		top: 300px;
		right: 25px;
	}
}


@media (min-width: 601px) and (max-width: 991px) {
	.my-price-box {
		position: absolute;
		background-color: #000;
		padding: 0.5rem;
		border-radius: 5px;
		height: 40px;
		vertical-align: middle;
		width: fit-content;
		top: 300px;
		right: 25px;
	}
}

@media (min-width: 501px) and (max-width: 600px) {
	.my-price-box {
		position: absolute;
		background-color: #000;
		padding: 0.5rem;
		border-radius: 5px;
		height: 40px;
		vertical-align: middle;
		width: fit-content;
		top: 300px;
		right: 25px;
	}
}

@media (min-width: 451px) and (max-width: 500px) {
	.my-price-box {
		position: absolute;
		background-color: #000;
		padding: 0.5rem;
		border-radius: 5px;
		height: 40px;
		vertical-align: middle;
		width: fit-content;
		top: 300px;
		right: 25px;
	}
}

@media (min-width: 396px) and (max-width: 450px) {
	.my-price-box {
		position: absolute;
		background-color: #000;
		padding: 0.5rem;
		border-radius: 5px;
		height: 40px;
		vertical-align: middle;
		width: fit-content;
		top: 300px;
		right: 25px;
	}
}

@media (min-width: 367px) and (max-width: 395px) {
	.my-price-box {
		position: absolute;
		background-color: #000;
		padding: 0.5rem;
		border-radius: 5px;
		height: 40px;
		vertical-align: middle;
		width: fit-content;
		top: 300px;
		right: 15px;
	}
}

@media (min-width: 321px) and (max-width: 366px) {
	.my-price-box {
		position: absolute;
		background-color: #000;
		padding: 0.5rem;
		border-radius: 5px;
		height: 40px;
		vertical-align: middle;
		width: fit-content;
		top: 300px;
		right: 15px;
	}
}

@media (max-width: 320px) {
	.my-price-box {
		position: absolute;
		background-color: #000;
		padding: 0.5rem;
		border-radius: 5px;
		height: 40px;
		vertical-align: middle;
		width: fit-content;
		top: 300px;
		right: 15px;
	}
}

</style>
