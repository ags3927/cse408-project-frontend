import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loggedIn: false,
        sessionDetails: {
            username: '',
            name: {
                firstName: '',
                lastName: ''
            },
            image: '',
            _id: '',
            userType: '',
            userMode: ''
        },
        profileDetails: {
            name: {
                firstName: '',
                lastName: ''
            },
            image: '',
            _id: '',
            verified: false,
            gender: '',
            birthDate: null,
            contacts: {
                email: '',
                phone: '',
                address: {
                    country: '',
                    city: '',
                    area: '',
                    zipCode: '',
                    streetAddress: ''
                },
                emergencyContact: {
                    name: '',
                    email: '',
                    relationship: '',
                    phone: ''
                }
            },
            govtID: '',
            favorites: []
        },
        sessionToken: '',
        signupDetails: {
            username: '',
            password: ''
        },
        // serverBaseURL: 'http://localhost:3000/api/',
        serverBaseURL: 'https://ags-test-project.as.r.appspot.com/api/',
        amenities: [],
        listingToEditID: "",
        homeFilters: {
            city: '',
            area: '',
            property: '',
            date: null,
            adults: 0,
            children: 0,
            infants: 0
        }
    },
    getters: {
        getSessionToken: state => {
            return state.sessionToken;
        },
        getSignupDetails: state => {
            return state.signupDetails;
        },
        getServerBaseURL: state => {
            return state.serverBaseURL;
        },
        getAmenities: state => {
            return state.amenities;
        },
        getLoggedIn: state => {
            return state.loggedIn;
        },
        getSessionDetails: state => {
            return state.sessionDetails;
        },
        getListingToEdit: state => {
            return state.listingToEdit;
        },
        getListingToEditID: state => {
            return state.listingToEditID;
        },
        getProfileDetails: state => {
            return state.profileDetails;
        },
        getHomeFilters: state => {
            return state.homeFilters;
        }
    },
    mutations: {
        setSessionToken: (state, sessionToken) => {
            state.sessionToken = sessionToken;
        },
        setSignupDetails: (state, signupDetails) => {
            state.signupDetails.username = signupDetails.username;
            state.signupDetails.password = signupDetails.password;
        },
        setAmenities: (state, amenities) => {
            state.amenities = amenities;
        },
        setLoggedIn: state => {
            state.loggedIn = true;
        },
        resetLoggedIn: state => {
            state.loggedIn = false;
        },
        resetSessionDetails: (state) => {
            state.sessionDetails = {
                username: '',
                name: {
                    firstName: '',
                    lastName: ''
                },
                image: '',
                _id: '',
                userType: '',
                userMode: ''
            };
        },
        resetSessionToken: state => {
            state.sessionToken = '';
        },
        setSessionDetails: (state, sessionDetails) => {
            state.sessionDetails = sessionDetails;
        },
        setProfileDetails: (state, profileDetails) => {
            state.profileDetails = profileDetails;
            state.profileDetails.birthDate = new Date(state.profileDetails.birthDate);
        },
        removeFavorite: (state, favorite) => {
            let idx = state.profileDetails.favorites.indexOf(favorite);
            state.profileDetails.favorites.splice(idx, 1);
        },
        addFavorite: (state, favorite) => {
            state.profileDetails.favorites.push(favorite);
        },
        setHomeFilters: (state, homeFilters) => {
            state.homeFilters = homeFilters;
        },
        resetHomeFilters: state => {
            state.homeFilters = {
				city: '',
                area: '',
                property: '',
                date: null,
                adults: 0,
                children: 0,
                infants: 0
            };
        }
    },
    plugins: [
        createPersistedState({
            getState: (key) => Cookies.getJSON(key),
            setState: (key, state) => Cookies.set(key, state),
            removeItem: key => Cookies.remove(key)
        })
    ]
});

export default store