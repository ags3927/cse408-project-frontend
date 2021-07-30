<template>
	<div>
		<b-navbar toggleable="lg" type="light">
			<div class="container" style="max-width: 1500px; max-height: 70px">
				<b-navbar-brand href="#">
					<router-link class="navbar-brand scale-on-hover" to="/">
						<img
                            src="../../assets/img/E-Lux-logo.png"
                            style="margin-left: auto;margin-right: auto; max-width: 50px; max-height: 50px" alt="E Luxurious Logo">
					</router-link>
				</b-navbar-brand>

				<b-navbar-toggle
					target="nav-collapse">
				</b-navbar-toggle>

				<b-collapse
					id="nav-collapse"
					style="border-bottom-left-radius: 15px; border-bottom-right-radius: 15px"
					is-nav>

					<b-navbar-nav
						class="bg-white py-3 ml-auto"
						style="border-bottom-left-radius: 15px; border-bottom-right-radius: 15px">

						<button
							id="home-login"
							class="btn login scale-on-hover mr-3 hide-sm"
							data-toggle="modal"
							data-target="#loginModal">
							Login
						</button>

						<b-nav-item to="/login"
									exact exact-active-class="nav-item-active"
									class="h6 custom-font-medium hide-lg">
							Login
						</b-nav-item>

						<button
							@click="navDisplay=true"
							id="home-signup"
							class="btn login scale-on-hover mr-3 hide-sm"
							data-toggle="modal"
							data-target="#signupModal">
							Sign Up
						</button>

						<b-nav-item to="/signupphone"
									exact exact-active-class="nav-item-active"
									class="h6 custom-font-medium hide-lg">
							Sign Up
						</b-nav-item>

						<router-link class="btn my-host-btn scale-on-hover hide-sm" to="/host">
							Become a Host
						</router-link>

						<b-nav-item to="/host"
									exact exact-active-class="nav-item-active hide-lg"
									class="h6 custom-font-medium hide-lg">
							Become a Host
						</b-nav-item>

					</b-navbar-nav>
				</b-collapse>
			</div>
		</b-navbar>


		<login-modal></login-modal>
		<signup-modal></signup-modal>
		<forgot-password-modal></forgot-password-modal>
	</div>
</template>

<script>
// import axios from 'axios';
import LoginModal from "../common/LoginModal";
import SignupModal from "../common/SignupModal";
import ForgotPassword from "../common/ForgotPassword";

import {eventBus} from "../../main";

export default {
	name: "NavBarLoggedOut",
	data() {
		return {
			signUpAsHost: '',
			navDisplay: false
		}
	},
	components: {
		forgotPasswordModal: ForgotPassword,
		loginModal: LoginModal,
		signupModal: SignupModal
	},
	created() {
		eventBus.$on('getStartedAsHost', () => {
			this.signUpAsHost = 'Host';
			// $("signupModal").modal('show');
		});
	}
}
</script>

<style scoped>
div#nav-collapse {
	z-index: 1 !important;
}

@media (max-width: 575px) {
	div#nav-collapse {
		box-shadow: 0 50px 50px rgba(0, 0, 0, 0.8);
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
