<template>
	<button
		@click="executeSearch"
		class="btn border-0 bg-white my-auto text-left custom-scale-on-hover">
		<img :src="image" alt="Destination" class="my-card-border trending-card-hw">
		<div class="my-bg-overlay-text text-white font-weight-bold my-bg-overlay-text-bottom-2"
			 style="bottom: 50px;">
			{{ name }}
		</div>
	</button>
</template>

<script>
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';

export default {
	name: "FeatureCard",
	props: ['image', 'name', 'type', 'typeOfProperty', 'destinationType'],
	methods: {
		...mapMutations([
			'setHomeFilters'
		]),
		executeSearch() {
			if (this.type === 'stays') {
				this.setHomeFilters({
					city: 'Select City',
					area: 'Select Area',
					property: this.typeOfProperty,
					arrivalDate: null,
					departureDate: null,
					adults: 0,
					children: 0,
					infants: 0
				});
			}
			else {
				this.setHomeFilters({
					city: this.destinationType === 'CITY'? this.name : 'Select City',
					area: this.destinationType === 'AREA'? this.name : 'Select Area',
					property: 'Select Property',
					arrivalDate: null,
					departureDate: null,
					adults: 0,
					children: 0,
					infants: 0
				})
			}
			this.$router.push('/search');
		}
	}
}
</script>

<style scoped>
@media (min-width: 768px) {
	.trending-card-hw {
		height: 275px;
		width: 265px;
	}
}

@media (max-width: 767px) {
	.trending-card-hw {
		height: 345px;
		width: 335px;
	}
}

.custom-scale-on-hover {
	transition: transform .2s;
}

.custom-scale-on-hover:hover {
	transform: scale(1.05)
}

.my-bg-overlay-text {
	position: relative;
	width: 100%;
	text-align: center;
}

.my-bg-overlay-text-bottom-1 {
	bottom: 50px;
	font-size: 23px;
}

.my-bg-overlay-text-bottom-2 {
	bottom: 35px;
	font-size: 18px;
}
</style>
