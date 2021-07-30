import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Home from "../components/home/Home";
import About from "../components/about-us/About";
import Contact from "../components/contact/Contact";
import FAQ from "../components/faq/FAQ";
import BecomeAHost from "../components/host/BecomeAHost";
import Details from "../components/details/Details";
import Search from "../components/search/Search";
import Signup from "../components/signup/Signup";
import Booking from "../components/booking/Booking";
import AddListing from "../components/property/AddListing";
import Dashboard from "../components/dashboard/Dashboard";
import Inbox from "../components/dashboard/Inbox";
import Calendar from "../components/host-dashboard/Calendar";
import Listings from "../components/host-dashboard/Listings";
import EditListing from "../components/property/EditListing";
import Notifications from "../components/dashboard/Notifications";
import Favorites from "../components/guest-dashboard/Favorites";
import Profile from "../components/dashboard/Profile";
import EditProfile from "../components/dashboard/EditProfile";
import Verification from "../components/dashboard/Verification";
import EditPassword from "../components/dashboard/EditPassword";
import LoginPhone from "../components/common/LoginPhone";
import SignupPhone from "../components/common/SignupPhone";
import TrendingControl from "../components/admin-dashboard/TrendingControl";
import ApproveListing from "../components/admin-dashboard/ApproveListing";
import HostProfile from "../components/admin-dashboard/HostProfile";
import FeaturedControl from "../components/admin-dashboard/FeaturedControl";
import GuestReservations from "../components/guest-dashboard/GuestReservations";
import HostReservations from "../components/host-dashboard/HostReservations";
import Welcome from "../components/common/Welcome";
import Reply from "../components/dashboard/Reply";
import ResetPassword from "../components/common/ResetPassword";
import ResetPasswordConfirmation from "../components/common/ResetPasswordConfirmation";
import SentMessages from "../components/dashboard/SentMessages";
import ViewMessage from "../components/dashboard/ViewMessage";
import VerificationRedirect from "../components/dashboard/VerificationRedirect";
import Wallet from "../components/guest-dashboard/Wallet";

Vue.use(VueRouter)


export const routes = [
	{
		path: '/',
		meta: {
			requireLoggedIn: false
		},
		component: Home
	},
	{
		path: '/about',
		meta: {
			requireLoggedIn: false
		},
		component: About
	},
	{
		path: '/contact',
		meta: {
			requireLoggedIn: false
		},
		component: Contact
	},
	{
		path: '/faq',
		meta: {
			requireLoggedIn: false
		},
		component: FAQ
	},
	{
		path: '/host',
		meta: {
			requireLoggedIn: false
		},
		component: BecomeAHost
	},
	{
		path: '/details',
		meta: {
			requireLoggedIn: false
		},
		component: Details
	},
	{
		path: '/search',
		meta: {
			requireLoggedIn: false
		},
		component: Search
	},
	{
		path: '/signup',
		meta: {
			requireLoggedIn: false
		},
		component: Signup
	},
	{
		path: '/booking',
		meta: {
			requireLoggedIn: true
		},
		component: Booking
	},
	{
		path: '/addlisting',
		meta: {
			requireLoggedIn: true
		},
		component: AddListing
	},
	{
		path: '/dashboard',
		meta: {
			requireLoggedIn: true
		},
		component: Dashboard
	},
	{
		path: '/inbox',
		meta: {
			requireLoggedIn: true
		},
		component: Inbox
	},
	{
		path: '/guestreservations',
		meta: {
			requireLoggedIn: true
		},
		component: GuestReservations
	},
	{
		path: '/hostreservations',
		meta: {
			requireLoggedIn: true
		},
		component: HostReservations
	},
	{
		path: '/calendar',
		meta: {
			requireLoggedIn: true
		},
		component: Calendar
	},
	{
		path: '/listings',
		meta: {
			requireLoggedIn: true
		},
		component: Listings
	},
	{
		path: '/editlisting',
		meta: {
			requireLoggedIn: true
		},
		component: EditListing
	},
	{
		path: '/notifications',
		meta: {
			requireLoggedIn: true
		},
		component: Notifications
	},
	{
		path: '/favorites',
		meta: {
			requireLoggedIn: true
		},
		component: Favorites
	},
	{
		path: '/profile',
		meta: {
			requireLoggedIn: true
		},
		component: Profile
	},
	{
		path: '/editprofile',
		meta: {
			requireLoggedIn: true
		},
		component: EditProfile
	},
	{
		path: '/editpassword',
		meta: {
			requireLoggedIn: true
		},
		component: EditPassword
	},
	{
		path: '/login',
		meta: {
			requireLoggedIn: false
		},
		component: LoginPhone
	},
	{
		path: '/signupphone',
		meta: {
			requireLoggedIn: false
		},
		component: SignupPhone
	},
	{
		path: '/trending',
		meta: {
			requireLoggedIn: true
		},
		component: TrendingControl
	},
	{
		path: '/approve',
		meta: {
			requireLoggedIn: true
		},
		component: ApproveListing
	},
	{
		path: '/featured',
		meta: {
			requireLoggedIn: true
		},
		component: FeaturedControl
	},
	{
		path: '/hostprofile',
		meta: {
			requireLoggedIn: true
		},
		component: HostProfile
	},
	{
		path: '/welcome',
		meta: {
			requireLoggedIn: true
		},
		component: Welcome
	},
	{
		path: '/reply',
		meta: {
			requireLoggedIn: true
		},
		component: Reply
	},
	{
		path: '/sentmessages',
		meta: {
			requireLoggedIn: true
		},
		component: SentMessages
	},
	{
		path: '/viewmessage',
		meta: {
			requireLoggedIn: true
		},
		component: ViewMessage
	},
	{
		path: '/wallet',
		meta: {
			requireLoggedIn: true
		},
		component: Wallet
	}
]


const router = new VueRouter({
    routes: routes,
    mode: 'history',
    history: 'enable',
    scrollBehavior() {
        return {x: 0, y: 0}
    }
});


router.beforeEach((to, from, next) => {
    if (to.meta.requireLoggedIn && !store.getters.getLoggedIn) {
        next({
            path: '/'
        });
    } else {
        next();
    }
})

export default router
