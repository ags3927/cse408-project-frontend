<template>

	<div class="container">
		<div class="row">
			<div class="col-12 col-lg-6 mx-auto px-5">
				<div class="card my-card-border py-4 px-4 px-lg-5 my-5 elux-custom-shadow">
					<h4 class="font-weight-bold mt-3 mb-3">Welcome Back</h4>

					<hr class="mb-5">
					<img
						class="mx-auto mb-4"
						src="../../assets/img/flag.png"
						alt="Flag"
						style="width: 75px; height: 90px">
					<h6>Your password has been updated!</h6>
					<button
						@click="done"
						class="btn btn-warning mx-auto text-white mt-5 mb-3"
						style="border-radius: 15px; width: 300px">
						Done
					</button>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ResetPasswordConfirmation",
	methods: {
		done() {
			this.$router.push('/');
		}
	}
}
</script>

<style scoped>

</style>
