<template>
	<div class="container px-2">
		<div class="card my-card-border my-5 elux-custom-shadow">
			<div class="row px-5 py-3 mb-3">
				<div class="col-12 text-left"
					 style="border-bottom: 1px solid rgba(200,200,200,0.9)">
					<button class="btn mr-3 mr-lg-5"
							@click="showMessageType='All'"
							:class="{'custom-active': showMessageType==='All'}">
						All
					</button>
					<button class="btn"
							@click="showMessageType='Starred'"
							:class="{'custom-active': showMessageType==='Starred'}">
						Starred
					</button>
				</div>
			</div>

			<div v-for="(message, index) in messages" v-if="checkMessageShow(message)">

				<div class="row px-5 mb-4">

					<div class="col-7 col-lg-10 text-left">
						<h6 >
							<button
								@click="$router.push({
									path: '/viewmessage',
									query: {
										messageID: message._id
									}
								})"
								class="btn border-0 bg-transparent">
								{{ message.messageDetails }}
							</button>
						</h6>
					</div>

					<div class="col-5 col-lg-2 text-right ml-auto">
						<button class="btn" @click="deleteMessage(index)">
							<fa-icon :icon="['fas', 'trash-alt']" class="text-secondary"></fa-icon>
						</button>
						<button class="btn"
								@click="toggleStarred(index)">
							<fa-icon
								:icon="['fas', 'star']"
								:class="{
									'text-warning': message.hasSenderStarred,
									'message-unstarred': !message.hasSenderStarred
								}">
							</fa-icon>
						</button>
					</div>


				</div>
				<hr class="mx-4 my-4" v-if="index<messages.length-1">
			</div>

		</div>
	</div>
</template>

<script>
import axios from 'axios';

import {mapGetters} from 'vuex';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

library.add(faStar);
library.add(faTrashAlt);

export default {
	name: "Inbox",
	data() {
		return {
			showMessageType: 'All',
			messages: []
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
		checkMessageShow(message) {
			if (this.showMessageType === 'All') return true;
			else if (this.showMessageType === 'Starred') return message.hasSenderStarred;
		},
		fetchMessages() {
			let sessionToken = this.getSessionToken;
			let serverBaseURL = this.getServerBaseURL;

			axios.post(serverBaseURL + 'message/sent', {}, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.messages = res.data.sentMessages;
				// console.log(this.messages);
			}).catch(err => {
				console.log(err);
			});
		},
		toggleStarred(index) {
			let sessionToken = this.getSessionToken;
			let serverBaseURL = this.getServerBaseURL;

			axios.post(serverBaseURL + 'message/togglestarredbysender', { messageID: this.messages[index]._id }, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.messages[index].hasSenderStarred = !this.messages[index].hasSenderStarred;
			}).catch(err => {
				this.makeToast('danger', 'Error', 'Could not mark message as starred/unstarred.');
				console.log(err);
			});

		},
		deleteMessage(index) {
			let sessionToken = this.getSessionToken;
			let serverBaseURL = this.getServerBaseURL;

			axios.post(serverBaseURL + 'message/delete', { messageID: this.messages[index]._id }, {
				headers: {
					'x-auth': sessionToken
				}
			}).then(res => {
				this.messages.splice(index, 1);
			}).catch(err => {
				this.makeToast('danger', 'Error', 'Could not delete message.');
				console.log(err);
			});
		}
	},
	computed: {
		...mapGetters([
			'getSessionToken',
			'getServerBaseURL'
		])
	},
	mounted() {
		this.fetchMessages();

	}
}

</script>

<style scoped>
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
