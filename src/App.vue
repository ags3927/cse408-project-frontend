<template>
    <div>
        <app-nav-bar style="z-index: 3"></app-nav-bar>
        <router-view></router-view>
        <app-footer style="z-index: 1"></app-footer>
    </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';

import NavBar from "./components/navbar/NavBar.vue";
import Footer from "./components/common/Footer";

export default {
    name: 'app',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    computed: {
        ...mapGetters([
            'getSessionToken',
            'getServerBaseURL'
        ])
    },
    components: {
        appNavBar: NavBar,
        appFooter: Footer
    },
    methods: {
        ...mapMutations([
            'setAmenities'
        ])
    },
    mounted() {
        let baseURL = this.getServerBaseURL;

        axios.get(baseURL + 'misc/amenities')
            .then(res => {
                // console.log(res.data.amenities);
                this.setAmenities(res.data.amenities);
            })
            .catch(err => {
                console.log(err);
            });
    }
}
</script>

<style>
</style>
