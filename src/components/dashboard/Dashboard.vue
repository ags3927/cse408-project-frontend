<template>
	<div>
		<host-dashboard v-if="getSessionDetails.userMode==='HOST'"></host-dashboard>
		<guest-dashboard v-if="getSessionDetails.userMode==='GUEST'"></guest-dashboard>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import HostDashboard from "../host-dashboard/HostDashboard";
import GuestDashboard from "../guest-dashboard/GuestDashboard";


export default {
	name: "Dashboard",
	components: {
		'host-dashboard': HostDashboard,
		'guest-dashboard': GuestDashboard
	},
	data() {
		return {}
	},
	computed: {
		...mapGetters([
			'getLoggedIn',
			'getSessionDetails'
		])
	}
}
</script>

<style scoped>

</style>
