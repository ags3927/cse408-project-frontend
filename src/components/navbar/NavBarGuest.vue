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
						class="bg-white py-3 hide-sm"
						style="border-bottom-left-radius: 15px; border-bottom-right-radius: 15px">
						<b-nav-item to="/dashboard"
									v-if="dashboardView"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Dashboard
						</b-nav-item>
						<b-nav-item to="/inbox"
									v-if="dashboardView"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Inbox
						</b-nav-item>
						<b-nav-item to="/sentmessages"
									v-if="dashboardView"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Sent Messages
						</b-nav-item>
						<b-nav-item to="/favorites"
									v-if="dashboardView"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Favorites
						</b-nav-item>
						<b-nav-item to="/notifications"
									v-if="dashboardView"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Notifications
						</b-nav-item>
						<b-nav-item to="/guestreservations"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Reservations
						</b-nav-item>
						<b-nav-item to="/profile"
									v-if="!dashboardView"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Profile
						</b-nav-item>
						<b-nav-item to="/editpassword"
									v-if="!dashboardView"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Password
						</b-nav-item>
						<b-nav-item to="/wallet"
									v-if="!dashboardView"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium">
							Wallet
						</b-nav-item>
						<button
							@click="logout"
							class="btn hide-lg"
							style="color: rgba(0, 0, 0, .5);">
							Logout
						</button>

					</b-navbar-nav>

					<b-navbar-nav
						class="bg-white py-3 hide-lg"
						style="border-bottom-left-radius: 15px; border-bottom-right-radius: 15px">
						<b-nav-item to="/dashboard"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Dashboard
						</b-nav-item>
						<b-nav-item to="/inbox"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Inbox
						</b-nav-item>
						<b-nav-item to="/sentmessages"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Sent Messages
						</b-nav-item>
						<b-nav-item to="/favorites"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Favorites
						</b-nav-item>
						<b-nav-item to="/notifications"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Notifications
						</b-nav-item>
						<b-nav-item to="/profile"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium mr-lg-4">
							Profile
						</b-nav-item>
						<b-nav-item to="/editpassword"
									exact exact-active-class="nav-item-active"
									class="custom-font-medium">
							Password
						</b-nav-item>
						<button
							@click="switchToHost"
							class="btn hide-lg"
							style="color: rgba(0, 0, 0, .5);">
							Switch to host
						</button>
						<button
							@click="logout"
							class="btn hide-lg"
							style="color: rgba(0, 0, 0, .5);">
							Logout
						</button>

					</b-navbar-nav>

					<b-navbar-nav class="ml-auto hide-sm">
						<b-dropdown
							class="card"
							style="border-radius: 35px; z-index: 5"
							right
							text="Right align"
							size="sm"
							variant="link"
							toggle-class="text-decoration-none"
							no-caret>
							<template v-slot:button-content>
								<div
									class="scale-on-hover text-decoration-none text-dark"
									style="border-radius: 15px; height: 40px">
									<ul
										style="list-style: none; text-decoration: none"
										class="list-inline px-3">
										<li class="list-inline-item">
											<p class="h5 pt-1" style="transform: translateY(3px)">
												{{ getSessionDetails.name.firstName }}
											</p>
										</li>
										<li class="list-inline-item">
											<img
												class="d-inline-block "
												:src="getSessionDetails.image"
												alt="Profile Image"
												style="height: 100%; width: 25px; border-radius: 30px">
										</li>
									</ul>
								</div>
							</template>
							<b-nav-item to="/inbox"
										exact exact-active-class="nav-item-active"
										class="custom-font-medium px-3">
								Inbox
							</b-nav-item>
							<b-nav-item to="/favorites"
										exact exact-active-class="nav-item-active"
										class="custom-font-medium px-3">
								Favorites
							</b-nav-item>
							<b-nav-item to="/notifications"
										exact exact-active-class="nav-item-active"
										class="custom-font-medium px-3">
								Notifications
							</b-nav-item>
							<b-dropdown-item-button
								v-if="dashboardView"
								@click="toProfile">
								<span style="font-size: medium;">Profile</span>
							</b-dropdown-item-button>
							<b-dropdown-item-button
								v-if="!dashboardView"
								@click="toGuestDashboard">
								<span style="font-size: medium;">Guest Dashboard</span>
							</b-dropdown-item-button>
							<b-dropdown-item-button
								@click="switchToHost">
								<span style="font-size: medium;">Switch to host</span>
							</b-dropdown-item-button>
							<b-dropdown-item-button
								@click="logout">
								<span style="font-size: medium;">Logout</span>
							</b-dropdown-item-button>
						</b-dropdown>
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
	name: "NavBarGuest",
	data() {
		return {
			dashboardView: true
		}
	},
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
		},
		toProfile() {
			this.dashboardView = false;
			this.$router.push('/profile');
		},
		toGuestDashboard() {
			this.dashboardView = true;
			this.$router.push('/dashboard');
		},
		switchToHost() {
			let sessionDetails = this.getSessionDetails;
			sessionDetails.userMode = 'WELCOME';
			this.setSessionDetails(sessionDetails);
			this.$router.push('/welcome');
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
