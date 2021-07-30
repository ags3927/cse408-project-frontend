<template>
	<div class="container">
		<div class="card outer-card my-5">
			<div class="row px-5 py-3 mb-3">
				<div class="col-12 text-left"
					 style="border-bottom: 1px solid rgba(200,200,200,0.9)">
					<button class="btn mr-5 custom-active">
						Notifications
					</button>
				</div>
			</div>

			<div v-for="(notification, index) in notifications" v-if="(showUnreadOnly && notification.unread) || !showUnreadOnly">
				<div class="row px-5 mb-4">
					<div class="col-12 col-lg-10 text-left">
						<h6 :class="{'font-weight-bold':notification.unread, 'font-weight-light':!notification.unread}">
							{{ notification.message }}
						</h6>
					</div>

					<div class="col-12 col-lg-2 text-right ml-auto">
						<button class="btn" @click="notifications.splice(index, 1)">
							<fa-icon :icon="['fas', 'trash-alt']" class="text-secondary"></fa-icon>
						</button>
						<button class="btn text-secondary"
								@click="notification.unread=!notification.unread">
							o
						</button>
						<button class="btn"
								@click="notification.starred=!notification.starred">
							<fa-icon
								:icon="['fas', 'star']"
								:class="{
									'text-warning': notification.starred,
									'message-unstarred': !notification.starre
								}">
							</fa-icon>
						</button>
					</div>

				</div>
				<hr class="mx-4 my-4" v-if="index<notifications.length-1">
			</div>

		</div>
	</div>
</template>

<script>
import {library} from '@fortawesome/fontawesome-svg-core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

library.add(faStar);
library.add(faTrashAlt);

export default {
	name: "Notifications",
	data() {
		return {
			showUnreadOnly: false,
			notifications: [
				{
					message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh',
					time: new Date(),
					unread: true,
					starred: false
				},
				{
					message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh',
					time: new Date(),
					unread: false,
					starred: false
				},
				{
					message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh Loren ipsum dolor sit amet',
					time: new Date(),
					unread: false,
					starred: false
				},
			]
		}
	}
}

</script>

<style scoped>
@media (min-width: 768px) {
	.outer-card {
		box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3)!important;
		border-radius: 20px;
	}
}

@media (max-width: 767px) {
	.outer-card {
		border: none;
	}
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
	color: rgba(0,0,0,0.2);
}
</style>
