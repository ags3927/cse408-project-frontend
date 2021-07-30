<template>
	<div>
		<div class="mt-5">
			<img class="img-dims" src="../../assets/img/welcome.png" alt="Welcome">
			<div class="row mb-5 mt-3">
				<div class="col-12 mx-auto">
					<h3 class="font-weight-bold">Welcome Back</h3>
				</div>
				<div class="col-12 mx-auto mt-5">
					<div class="btn btn-warning"
						 @click="goToDashboard"
						 style="color: white; border-radius: 12px">
						Go to Dashboard
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';

export default {
	name: "Welcome",
	computed: {
		...mapGetters([
			'getSessionDetails'
		])
	},
	methods: {
		...mapMutations([
			'setSessionDetails'
		]),
		goToDashboard() {
			let sessionDetails = this.getSessionDetails;
			sessionDetails.userMode = 'HOST';
			this.setSessionDetails(sessionDetails);
			this.$router.push('/dashboard');
		}
	}

}
</script>

<style scoped>
@media (max-width: 300px) {
	.img-dims {
		height: 150px;
		width: 270px;
	}
}

@media (min-width: 301px) and (max-width: 400px) {
	.img-dims {
		height: 200px;
		width: 380px;
	}
}

@media (min-width: 401px) and (max-width: 600px) {
	.img-dims {
		height: 200px;
		width: 380px;
	}
}

@media (min-width: 601px) {
	.img-dims {
		height: 300px;
		width: 600px;
	}
}
</style>
