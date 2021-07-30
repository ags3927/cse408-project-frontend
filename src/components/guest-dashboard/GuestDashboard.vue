<template>
  <div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-11 col-lg-7 text-left px-lg-3 mb-3 mx-auto">
          <div
            class="
              card
              my-card-border
              elux-custom-shadow
              text-left
              pl-5
              pr-4
              mb-3
            "
          >
            <div class="row mt-4 mb-3 pr-3 pr-lg-0">
              <div class="col-8 col-lg-10">
                <h4
                  class="text-left font-weight-bold"
                  style="line-height: 30px"
                >
                  Favorites
                </h4>
              </div>
              <div class="col-1 ml-auto mr-2">
                <h4
                  class="my-card-border text-white"
                  :class="{
                    'bg-secondary': favorites.length === 0,
                    'bg-warning': favorites.length >= 1,
                  }"
                  style="
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    font-size: large;
                  "
                >
                  {{ favorites.length }}
                </h4>
              </div>
            </div>

            <div :key="favorite + index" v-for="(favorite, index) in favorites">
              <div class="row mb-5" :class="{ 'mt-4': index >= 1 }">
                <div class="col-12 col-lg-2 text-left mb-3 mb-lg-0">
                  <img
                    :src="favorite.imagesOfProperty[0]"
                    alt="Property Image"
                    style="width: 80px; height: 60px; border-radius: 10px"
                  />
                </div>
                <div class="col-12 col-lg-7 text-left mb-3 mb-lg-0">
                  <h6>{{ favorite.title }}</h6>
                  <h6 class="font-weight-light">
                    <fa-icon :icon="['fas', 'star']" class="text-warning">
                    </fa-icon>
                    {{ favorite.rating.value }} ({{
                      favorite.rating.timesRated
                    }})
                  </h6>
                </div>
                <div class="col-12 col-lg-3 text-left pr-lg-3">
                  <button
                    @click="viewDetail(index)"
                    class="btn btn-warning px-3 text-white"
                    style="border-radius: 15px"
                  >
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            class="
              card
              my-card-border
              elux-custom-shadow
              text-left
              pl-5
              pr-4
              my-3
            "
          >
            <div class="row mt-4 mb-3">
              <div class="col-12">
                <h4
                  class="text-left font-weight-bold"
                  style="line-height: 30px"
                >
                  Properties You May Like
                </h4>
              </div>
            </div>

            <div
              :key="property + index"
              v-for="(property, index) in propertySuggestions"
            >
              <div class="row mb-5" :class="{ 'mt-4': index >= 1 }">
                <div class="col-12 col-lg-2 text-left mb-3 mb-lg-0">
                  <img
                    :src="property.image"
                    alt="Property Image"
                    style="width: 80px; height: 60px; border-radius: 10px"
                  />
                </div>
                <div class="col-12 col-lg-7 text-left pr-2 mb-3 mb-lg-0">
                  <h6>{{ property.title }}</h6>
                  <h6 class="font-weight-light">
                    <fa-icon :icon="['fas', 'star']" class="text-warning">
                    </fa-icon>
                    {{ property.rating.value }} ({{
                      property.rating.timesRated
                    }})
                  </h6>
                </div>
                <div class="col-12 col-lg-3 text-left">
                  <button
                    @click="viewDetailSuggestedProperty(index)"
                    class="btn btn-warning px-3 text-white"
                    style="border-radius: 15px"
                  >
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-11 col-lg-5 text-left px-lg-3 mb-3 mx-auto">
          <div
            class="
              card
              my-card-border
              elux-custom-shadow
              text-left
              px-5
              pr-4
              mb-3
            "
          >
            <div class="row mt-4 mb-3">
              <div class="col-8">
                <h4
                  class="text-left font-weight-bold"
                  style="line-height: 30px"
                >
                  Notifications
                </h4>
              </div>
              <div class="col-1 ml-auto">
                <h4
                  class="my-card-border bg-secondary text-white"
                  :class="{
                    'bg-secondary': unreadNotificationCount === 0,
                    'bg-warning': unreadNotificationCount >= 1,
                  }"
                  style="
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    font-size: large;
                  "
                >
                  {{ unreadNotificationCount }}
                </h4>
              </div>
            </div>

            <div
              class="row mb-3"
              :key="notification + index"
              v-for="(notification, index) in notifications"
            >
              <div class="col-12">
                <h6
                  class="text-left"
                  :class="{
                    'font-weight-bold': !notification.read,
                    'font-weight-light': notification.read,
                  }"
                >
                  {{ notification.text }}
                </h6>
                <hr class="mr-4 my-3" v-if="notifications.length - 1 > index" />
              </div>
            </div>

            <div class="row">
              <div class="col-12 sm-left-alignment my-4">
                <button
                  @click="$router.push('/notifications')"
                  class="btn btn-warning py-2 w-100 text-white"
                  style="border-radius: 15px"
                >
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

library.add(faStar);

export default {
  name: "GuestDashboard",
  data() {
    return {
      favorites: [],
      propertySuggestions: [
        {
          image:
            "https://res.cloudinary.com/ags3927/image/upload/v1598003570/property-images/osagfaysm2yvx3qljkyy.jpg",
          title: "Stylish, Modern 2 Bed Apartment in Islington",
          rating: {
            value: 4.8,
            timesRated: 58,
          },
        },
        {
          image:
            "https://res.cloudinary.com/ags3927/image/upload/v1598003570/property-images/osagfaysm2yvx3qljkyy.jpg",
          title: "Stylish, Modern 2 Bed Apartment in Islington",
          rating: {
            value: 4.8,
            timesRated: 58,
          },
        },
        {
          image:
            "https://res.cloudinary.com/ags3927/image/upload/v1598003570/property-images/osagfaysm2yvx3qljkyy.jpg",
          title: "Stylish, Modern 2 Bed Apartment in Islington",
          rating: {
            value: 4.8,
            timesRated: 58,
          },
        },
        {
          image:
            "https://res.cloudinary.com/ags3927/image/upload/v1598003570/property-images/osagfaysm2yvx3qljkyy.jpg",
          title: "Stylish, Modern 2 Bed Apartment in Islington",
          rating: {
            value: 4.8,
            timesRated: 58,
          },
        },
      ],
      reservationRequests: [
        {
          img: "https://res.cloudinary.com/ags3927/image/upload/v1597024637/e-lux/qlrd4aifraeddaggjgft.jpg",
          name: {
            firstName: "Aniruddha",
            lastName: "Ganguly",
          },
          contacts: {
            phone: "+8801816394369",
            email: "aniruddhags3927@gmail.com",
          },
          checkIn: new Date("2020-09-11"),
          checkOut: new Date("2020-09-14"),
          title: "Villa Suburb",
          streetAddress: "0000 st, Detroit dta 2393",
        },
        {
          img: "https://res.cloudinary.com/ags3927/image/upload/v1597024637/e-lux/qlrd4aifraeddaggjgft.jpg",
          name: {
            firstName: "Aniruddha",
            lastName: "Ganguly",
          },
          contacts: {
            phone: "+8801816394369",
            email: "aniruddhags3927@gmail.com",
          },
          checkIn: new Date("2020-09-11"),
          checkOut: new Date("2020-09-14"),
          title: "Apartment Town",
          streetAddress: "0000 st, Detroit dta 2393",
        },
      ],
      notifications: [
        {
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh ",
          read: false,
        },
        {
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh ",
          read: true,
        },
        {
          text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh ",
          read: true,
        },
      ],
      reservations: [
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
      ],
      profileDetails: {},
    };
  },
  methods: {
    fetchProfileDetails() {
      let baseURL = this.getServerBaseURL;
      let sessionToken = this.getSessionToken;

      axios
        .post(
          baseURL + "user/profile",
          {},
          {
            headers: {
              "x-auth": sessionToken,
            },
          }
        )
        .then((res) => {
          this.profileDetails = res.data.userProfile;
        })
        .catch((err) => {
          // console.log(err.response.data);
        });
    },
    getFormattedDate(date) {
      let newDate = moment(date);
      return newDate.format("YYYY-MM-DD");
    },
    viewDetail(index) {
      this.$router.push({
        path: "/details",
        query: {
          id: this.favorites[index]._id,
        },
      });
    },
    viewDetailSuggestedProperty(index) {
      this.$router.push({
        path: "/details",
        query: {
          id: this.propertySuggestions[index]._id,
        },
      });
    },
  },
  computed: {
    ...mapGetters(["getSessionToken", "getServerBaseURL"]),
    unreadNotificationCount() {
      let count = 0;
      for (const notification of this.notifications) {
        if (!notification.read) {
          count = count + 1;
        }
      }
      return count;
    },
  },
  mounted() {
    let sessionToken = this.getSessionToken;
    let baseURL = this.getServerBaseURL;
    axios
      .post(
        baseURL + "user/favorites",
        {},
        {
          headers: {
            "x-auth": sessionToken,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.favorites);
        this.favorites = res.data.favorites;
      })
      .catch((err) => {
        // console.log(err.data);
      });
  },
};
</script>

<style scoped>
@media (max-width: 767px) {
  .sm-left-alignment {
    text-align: left !important;
  }
}

.elux-custom-shadow {
  box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}
</style>
