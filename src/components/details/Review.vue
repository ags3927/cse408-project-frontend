<template>
	<div>
		<hr class="mt-5 mb-5">
		<div class="row px-4 mb-5">
			<div class="col-2 col-md-1 text-left">
				<img :src="userImage" class="w-100">
			</div>
			<div class="col-9 col-lg-7 text-left ml-3 ml-lg-5">
				<h5>{{ name.firstName }} {{ name.lastName }}</h5>
				<h6 style="color: rgba(128, 128, 128, 0.6)" class="font-weight-bold">{{ getFormattedDate }}</h6>
				<h6 class="mt-3 font-weight-light">
					{{ reviewObject.comment }}
				</h6>
				<h6 href="" class="text-warning font-weight-bold">Read more</h6>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';

export default {
	name: "Review",
	props: ['reviewObject', 'name', 'userImage'],
	computed: {
		getFormattedDate() {
			let formattedDate = new moment(this.reviewObject.date);
			return formattedDate.format('MMMM D');
		}
	}
}
</script>

<style scoped>

</style>
