<template>
	<div>
		<b-navbar toggleable="lg" type="light">
			<div class="container" style="max-width: 1500px; max-height: 70px">
				<b-navbar-brand href="#">
					<router-link class="navbar-brand scale-on-hover" to="/">
						<img src="../../assets/img/E-Lux-logo.png"
							 style="margin-left: auto; margin-right: auto; max-width: 50px; max-height: 50px"
							 alt="E Luxurious Logo">
					</router-link>
				</b-navbar-brand>

				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

				<b-collapse id="nav-collapse" is-nav>
					<b-navbar-nav
						class="bg-white py-3"
						style="border-bottom-left-radius: 15px; border-bottom-right-radius: 15px">
						<b-nav-item to="/trending"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Trending
						</b-nav-item>
						<b-nav-item to="/approve"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Approve Listings
						</b-nav-item>
						<b-nav-item to="/featured"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Featured
						</b-nav-item>


					</b-navbar-nav>

					<b-navbar-nav class="ml-auto hide-sm">

						<button
							@click="logout"
							class="btn"
							style="color: rgba(0, 0, 0, .5);">
							Logout
						</button>
					</b-navbar-nav>
				</b-collapse>
			</div>
		</b-navbar>

	</div>
</template>

<script>
import axios from 'axios';

import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
import {Toast} from "../../store/Toast";

export default {
	name: "NavBarAdmin",
	computed: {
		...mapGetters([
			'getLoggedIn',
			'getSessionDetails',
			'getServerBaseURL',
			'getSessionToken'
		])
	},
	methods: {
		...mapMutations([
			'resetSessionToken',
			'resetSessionDetails',
			'setSessionDetails',
			'resetLoggedIn'
		]),
		makeToast(variant = null, title, body) {
			this.$bvToast.toast(body, {
				title: title,
				variant: variant,
				toaster: 'b-toaster-bottom-left',
				solid: true
			})
		},
		home() {
			this.$router.push('/');
		},
		logout() {
			let baseURL = this.getServerBaseURL;
			let token = this.getSessionToken;
			axios.post(baseURL + 'logout', {}, {
				headers: {
					'x-auth': token
				}
			}).then(res => {

				this.resetSessionToken();
				this.resetSessionDetails();
				this.resetLoggedIn();
				this.$router.push('/');

			}).catch(err => {
				// console.log(err);
			});
		},
		populateUserData() {
			let baseURL = this.getServerBaseURL;
			let token = this.getSessionToken;
		}
	},
	mounted() {

	}
}
</script>

<style scoped>
.custom-font-medium {
	font-size: medium;
}

.nav-item-active {
	border-bottom: 3px solid #e0a800;
	font-weight: bold;
	color: black;
}

@media (max-width: 575px) {
	.nav-item-active {
		width: 50%;
		margin-right: auto;
		margin-left: auto;
	}
}

@media (max-width: 575px) {
	div#nav-collapse {
		z-index: 1!important;
		box-shadow: 0 50px 50px rgba(0, 0, 0, 0.8);
		border-bottom-left-radius: 15px;
		border-bottom-right-radius: 15px;
	}
}

@media (max-width: 575px) {
	.hide-sm {
		display: none;
	}
}

@media (min-width: 576px) {
	.hide-lg {
		display: none;
	}
}
</style>
