<template>
	<div class="container">
		<div class="row">
			<div class="col-12 mx-auto">
				<div class="card my-card-border py-5 px-4 px-lg-5 my-5 elux-custom-shadow">
					<div class="row">
						<div class="col-1">
							<img :src="userDetails.image" alt="Alice"
								 style="height: 60px; width: 60px; border-radius: 60px">
						</div>
						<div class="col-6 col-lg-9 text-left py-2">
							<h6 class="font-weight-bold">{{ userDetails.name.firstName }} {{ userDetails.name.lastName }}</h6>
							<h6> {{ getFormattedTime }}</h6>
						</div>
						<div class="col-5 col-lg-2 text-right">
							<button class="btn"
									@click="message.starred=!message.starred">
								<fa-icon
									:icon="['fas', 'star']"
									:class="{
									'text-warning': message.starred,
									'message-unstarred': !message.starred
								}">
								</fa-icon>
							</button>
							<button class="btn" @click="">
								<fa-icon :icon="['fas', 'trash-alt']" class="text-secondary"></fa-icon>
							</button>
						</div>
					</div>

					<div class="row mt-3">
						<div class="col-12 text-left px-4">
							<div class="card message-card-border-radius elux-custom-shadow text-left px-3 px-lg-5 py-3">
								<h6 style="white-space: pre-wrap">
									{{ getMessageBody }}
								</h6>
							</div>
						</div>
					</div>

					<div class="row mt-3">
						<div class="col-12 text-left px-4">
							<div class="card reply-card-border-radius elux-custom-shadow text-left px-3 px-lg-5 py-3">
								<b-form-textarea
									v-model="replyText"
									class="reply-text p-0 mt-3"
									id="textarea-rows"
									placeholder="Write message....."
									rows="8">
								</b-form-textarea>
								<div
									style="line-height: 70px"
									class="card-bottom-bg text-right mt-3">
									<button
										@click="sendMessage"
										class="btn btn-warning text-white my-card-border mr-5 px-4">
										Send
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import {mapGetters} from 'vuex';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

library.add(faStar);
library.add(faTrashAlt);

export default {
	name: "Reply",
	data() {
		return {
			message: null,
			userDetails: {},
			replyText: ''
		}
	},
	computed: {
		...mapGetters([
			'getSessionToken',
			'getServerBaseURL'
		]),
		getMessageBody() {
			if (this.message === null) return '';
			if (this.message.messageDetails[0] !== '\n') {
				this.message.messageDetails = '\n' + this.message.messageDetails;
			}
			return this.message.messageDetails;
		},
		getFormattedTime() {
			if (this.message === null) return '';
			let messageTimestamp = moment(this.message.timestamp);
			return messageTimestamp.format('MMM DD, YYYY, hh:mm a');
		}
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
		fetchMessage() {
			let sessionToken = this.getSessionToken;
			let serverBaseURL = this.getServerBaseURL;

			axios.post(serverBaseURL + 'message/findbyid', {messageID: this.$route.query.messageID}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.message = res.data.messageObject;
				this.userDetails = res.data.userDetailsObject;
			}).catch(err => {
				console.log(err);
			});
		},
		sendMessage() {
			let messageObject = {
				propertyID: this.message.propertyID,
				messageDetails: this.replyText,
				receiverID: this.message.senderID
			}

			// console.log(messageObject);

			let sessionToken = this.getSessionToken;
			let serverBaseURL = this.getServerBaseURL;

			console.log(serverBaseURL);

			axios.post(serverBaseURL + 'message/insertreply', {messageObject}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.makeToast('success', 'Success', 'Message sent!');
				this.replyText = '';
			}).catch(err => {
				this.makeToast('danger', 'Error', 'Message could not be sent!');
				console.log(err);
			});
		}
	},
	mounted() {
		this.fetchMessage();
	}
}
</script>

<style scoped>
.card-bottom-bg {
	background-color: #F3F3F3;
	width: 110.1%;
	height: 70px;
	transform: translate(-4.57%, 22%);
	border-radius: 0 0 2px 30px;
}

textarea.reply-text, textarea.reply-text:focus, textarea.reply-text:active {
	-webkit-box-shadow: none;
	box-shadow: none;
	outline: none;
	border: none;
}

.message-card-border-radius {
	border-radius: 2px 30px 30px 30px;
}

.reply-card-border-radius {
	border-radius: 30px 30px 2px 30px;
}

.elux-custom-shadow {
	box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}

.custom-active {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	border-bottom: 3px solid #e0a800;
	font-weight: bold;
}

.message-unstarred {
	color: rgba(0, 0, 0, 0.2);
}

</style>
