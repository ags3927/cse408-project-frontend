<template>
	<footer class="page-footer ">

		<!-- Footer Links -->
		<div class="container text-center text-sm-left">

			<!-- Grid row -->
			<div class="row px-5 mx-auto">

				<hr class="clearfix w-100 pb-3">

				<!-- Grid column -->
				<div class="col-12 col-md-6 col-lg-3 col-xl-3 mb-4 mx-auto text-left">

					<!-- Links -->
					<h5 class="text-uppercase mb-3">About</h5>

					<ul class="list-unstyled text-muted">
						<li>
							<router-link class="h6 footer-link underline-on-hover" to="/about">About Us</router-link>
						</li>
						<li>
							<a href="#!" class="h6 footer-link underline-on-hover">Services</a>
						</li>
					</ul>

				</div>
				<!-- Grid column -->

				<!-- Grid column -->
				<div class="col-12 col-md-6 col-lg-3 col-xl-3 mb-4 mx-auto text-left">

					<!-- Links -->
					<h5 class="text-uppercase mb-3">Host</h5>

					<ul class="list-unstyled ">
						<li>
							<router-link class="h6 footer-link underline-on-hover" to="/faq">FAQ</router-link>
						</li>
						<li>
							<router-link class="h6 footer-link underline-on-hover" to="/host">
								Become a Host
							</router-link>
						</li>
					</ul>

				</div>
				<!-- Grid column -->


				<!-- Grid column -->
				<div class="col-12 col-md-6 col-lg-3 col-xl-3 mb-4 mx-auto text-left">

					<!-- Links -->
					<h5 class="text-uppercase mb-3">Support</h5>

					<ul class="list-unstyled">
						<li>
							<router-link class="h6 footer-link underline-on-hover" to="/contact">
								Contact Us
							</router-link>
						</li>
					</ul>

				</div>
				<!-- Grid column -->


				<!-- Grid column -->
				<div class="col-12 col-md-6 col-lg-3 col-xl-3 mb-4 mx-auto text-left">

					<!-- Links -->
					<h5 class="mb-3">Sign Up Newsletter</h5>
					<div class="input-group nl-email my-card-border text-muted mx-auto" style="max-width: 350px;">
						<input type="email" class="ml-3 nl-email border-0 my-2 w-75" style="font-size: small"
							   placeholder="Enter your email"
							   required v-model="newsletterEmail">
						<button class="btn ml-auto align-self-center text-muted"
								style="width: 10%; margin-right: 0.85rem"
								@click="subscribeToNewsletter">
							<i class="fa fa-angle-right fa-2x"></i>
						</button>
					</div>

				</div>
				<!-- Grid column -->
				<hr class="clearfix w-100 pb-3">

			</div>
			<!-- Grid row -->

			<!-- Copyright -->
			<div class="footer-copyright my-text-muted mb-5 px-5">
				<div class="row">
					<div class="h6 col text-left pl-3">
						Copyright © 2020 - All rights reserved
					</div>
					<div class="col text-right pr-3">
						<a href="#" class="h6 text-dark mr-2">
							<fa-icon :icon="['fab', 'facebook']"></fa-icon>
						</a>
						<a href="#" class="h6 text-dark mr-2">
							<fa-icon :icon="['fab', 'twitter']"></fa-icon>
						</a>
						<a href="#" class="h6 text-dark mr-2">
							<fa-icon :icon="['fab', 'instagram']"></fa-icon>
						</a>
					</div>
				</div>
			</div>

			<!-- Copyright -->

		</div>
		<!-- Footer Links -->


	</footer>
</template>

<script>

import {library} from '@fortawesome/fontawesome-svg-core';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';

library.add(faFacebook);
library.add(faTwitter);
library.add(faInstagram);

import axios from 'axios';

export default {
	name: "Footer",
	data() {
		return {
			newsletterEmail: ''
		}
	},
	methods: {
		subscribeToNewsletter() {
			// axios.post('', this.newsletterEmail)
			// 	.then(res => {
			// 		console.log(res);
			// 	})
			// 	.catch(err => {
			// 		console.log(res);
			// 	});
		}
	}
}
</script>

<style scoped>
.underline-on-hover:hover {
	text-decoration: underline;
}
</style>
