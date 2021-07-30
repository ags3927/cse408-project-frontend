<template>
	<div>
		<div class="my-container">
			<div class="" style="z-index: 3;">
				<img class="mx-auto w-100 banner-img" src="../../assets/img/contact/markus-winkler-q3QPw37J6Xs-unsplash.png" alt="">
			</div>
			<div class="my-bg-overlay-light"></div>
		</div>


		<div class="container">
			<div class="row my-mt-6 mb-5">
				<div class="col-11 col-xl-6 mx-auto mb-5 mb-xl-3">
					<div class="card shadow border-0 my-card-border w-100 px-3 mx-auto ">
						<div class="py-4">
							<div class="card-body py-1">
								<h3><b>Contact Us</b></h3>
								<h6 class="card-text px-sm-5">
									A break from all your worries sure would help a lot and you know where you were then
									a
									tale
									of a fateful trip.
								</h6>
								<form class="mt-4">
									<div class="form-group">
										<input type="text" placeholder="Name" class="form-control border-dark"
											   required v-model="contactObject.name">
									</div>
									<div class="form-group">
										<input type="text" placeholder="Phone" class="form-control border-dark"
											   required v-model="contactObject.phone">
									</div>
									<div class="form-group">
										<input type="text" placeholder="Email" class="form-control border-dark"
											   required v-model="contactObject.email">
									</div>
									<div class="form-group">
										<input type="text" placeholder="Message"
											   class="form-control border-dark my-card-border" style="height: 150px;"
											   v-model="contactObject.message">
									</div>
									<button class="btn btn-warning text-white w-100 mb-3" style="border-radius: 10px;"
											@click.prevent="contactUs">
										CONTACT US
									</button>
								</form>

							</div>
						</div>
					</div>
				</div>
				<div class="col-12 col-xl-6 px-4 mx-auto mb-xl-3">
					<div class="mx-auto card shadow border-0 my-card-border w-100 h-100">
						<div class="card-body py-1">
							<img src="../../assets/img/contact/office.png" alt="" class="mt-5">
							<h3 class="font-weight-normal mt-3">Corporate Office</h3>
							<h5 class="font-weight-light">Dhaka, Bangladesh</h5>
							<hr class="mt-5 mb-5">
							<img src="../../assets/img/contact/multimedia.png" alt="">
							<h3 class="font-weight-normal mt-3">Direct Contact</h3>
							<h5 class="font-weight-light mb-5">bluxuriousproperty@gmail.com</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';

export default {
	name: "Contact",
	data() {
		return {
			contactObject: {
				name: '',
				phone: '',
				email: '',
				message: ''
			}
		}
	},
	computed: {
		...mapGetters([
			'getServerBaseURL'
		])
	},
	methods: {
		makeToast(variant = null, title, body) {
			this.$bvToast.toast(body, {
				title: title,
				variant: variant,
				toaster: 'b-toaster-bottom-left',
				solid: true
			})
		},
		contactUs() {
			let baseURL = this.getServerBaseURL;

			axios.post(baseURL + 'misc/contactus', { contactObject: this.contactObject })
				.then(res => {
					console.log(res.data);
					this.makeToast('success', 'Success', 'Message sent successfully');
					this.clearContactObject();
				})
				.catch(err => {
					console.log(err);
				});
		},
		clearContactObject() {
			this.contactObject = {
				name: '',
				phone: '',
				email: '',
				message: ''
			}
		}
	}
}
</script>

<style scoped>

@media (max-width: 767px) {
	.hide-sm {
		display: none;
	}
}


@media (max-width: 767px) {
	.banner-img {
		height: 300px;
	}
}

@media (min-width: 768px) {
	.banner-img {
		height: fit-content;
	}
}
</style>
