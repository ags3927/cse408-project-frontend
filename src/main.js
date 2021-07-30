import Vue from 'vue'
import App from './App.vue'

// Vuex
import store from './store/index'

// Route Imports
import router from "./router/index";

// Event Bus
export const eventBus = new Vue();

//// Module Imports

// V-Calendar
import VCalendar from 'v-calendar';

Vue.use(VCalendar);


// Bootstrap-vue
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap-vue/dist/bootstrap-vue.css'

// VueGoogleMaps
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
    load: {
        key: "USE_YOUR_API_KEY_HERE",
        libraries: "places" // necessary for places input
    }
});


// Toggle Button
import ToggleButton from 'vue-js-toggle-button'

Vue.use(ToggleButton)


// Paginate
import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)


// Font Awesome
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

Vue.component('fa-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

// Cloudinary
import Cloudinary from "cloudinary-vue";

Vue.use(Cloudinary, {
    configuration: {
        cloudName: "ags3927",
        api_key: 'USE_YOUR_API_KEY_HERE',
        api_secret: 'USE_YOUR_API_SECRET_HERE'
    }
});

// Vue Browser Geolocation
import VueGeolocation from 'vue-browser-geolocation';

Vue.use(VueGeolocation);


// Vue Country Region Select
import vueCountryRegionSelect from 'vue-country-region-select'

Vue.use(vueCountryRegionSelect)


// Vue Monthpicker
import { MonthPicker } from 'vue-month-picker'
import { MonthPickerInput } from 'vue-month-picker'

Vue.use(MonthPicker)
Vue.use(MonthPickerInput)


new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
