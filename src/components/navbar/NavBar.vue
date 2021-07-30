<template>
	<div class="shadow">
		<nav-bar-logged-out v-if="!getLoggedIn"></nav-bar-logged-out>
		<nav-bar-guest
			v-if="getLoggedIn && getSessionDetails.userType==='GENERAL' && getSessionDetails.userMode==='GUEST'"></nav-bar-guest>
		<nav-bar-host
			v-if="getLoggedIn && getSessionDetails.userType==='GENERAL' && getSessionDetails.userMode==='HOST'"></nav-bar-host>
		<nav-bar-welcome
			v-if="getLoggedIn && getSessionDetails.userType==='GENERAL' && getSessionDetails.userMode==='WELCOME'">
		</nav-bar-welcome>
		<nav-bar-admin v-if="getLoggedIn && getSessionDetails.userType==='ADMIN'"></nav-bar-admin>
	</div>
</template>

<script>
import NavBarLoggedOut from "./NavBarLoggedOut";
import {mapGetters} from 'vuex';
import NavBarGuest from "./NavBarGuest";
import NavBarHost from "./NavBarHost";
import NavBarAdmin from "./NavBarAdmin";
import NavBarWelcome from "./NavBarWelcome";

export default {
	name: "Navbar",
	data() {
		return {
			loggedIn: false
		};
	},
	components: {
		navBarHost: NavBarHost,
		navBarGuest: NavBarGuest,
		navBarLoggedOut: NavBarLoggedOut,
		navBarAdmin: NavBarAdmin,
		navBarWelcome: NavBarWelcome
	},
	computed: {
		...mapGetters([
			'getLoggedIn',
			'getSessionDetails'
		])
	}
}
</script>

<style>
</style>
