<template>
  <div class="container">
    <section>
      <div class="container mt-4 mb-5">
        <div class="row p-4">
          <div
            id="booking-card-1"
            class="col-12 col-lg-8 text-left mx-auto px-4 mb-5 mb-lg-0"
            v-if="bookingCard === 1"
          >
            <h2 class="font-weight-bold mb-5" style="max-width: 85%">
              Review Features and House Rules
            </h2>

            <h4 class="font-weight-bold" style="max-width: 85%">
              {{ propertyDetails.title }}
            </h4>
            <h5 class="mt-4 text-secondary">
              <i class="fa fa-map-marker-alt fa-lg mr-4"></i>
              {{ propertyDetails.location.area }},
              {{ propertyDetails.location.city }}
            </h5>
            <h6 class="card-text mb-2 mt-4" style="font-weight: 500">
              <i class="fa fa-star my-rating-star mr-3 fa-lg"></i>
              <span class="h6 ml-2"
                >{{ propertyDetails.rating.value }} ({{
                  propertyDetails.rating.timesRated
                }})</span
              >
            </h6>

            <hr class="mt-5 mb-5" />

            <div class="text-left">
              <h4>About the Property</h4>
              <h6 class="mt-3 mb-3 w-75">
                {{ propertyDetails.description }}
              </h6>
              <a href="" class="h6 text-warning font-weight-bold"
                >Read more about the property.....</a
              >
              <hr class="mt-5" />
              <h4 class="font-weight-bold">Features</h4>
              <ul style="list-style: none" class="mt-5 text-secondary px-3">
                <li class="mr-5 my-4">
                  <i class="fa fa-bed-alt fa-2x mr-3"></i>
                  <span class="h5"
                    >{{ getBedroomCount }} - {{ getBedCount }}</span
                  >
                </li>
                <li class="mr-5 my-4">
                  <i class="fa fa-bath fa-2x mr-3"></i>
                  <span class="h5">{{ getBathroomCount }}</span>
                  <span
                    class="h5"
                    v-if="
                      propertyDetails.accommodationServices.bathroom.isPrivate
                    "
                    >(Private)</span
                  >
                </li>
              </ul>
            </div>
            <hr
              class="mt-5 mb-5"
              v-if="propertyDetails.accommodationServices.amenities.length > 0"
            />

            <div
              class="text-left"
              v-if="propertyDetails.accommodationServices.amenities.length > 0"
            >
              <h4 class="font-weight-bold">Amenities</h4>
              <ul
                style="list-style: none"
                class="mt-3 text-secondary px-3 list-inline"
              >
                <li
                  class="list-inline-item mr-5 my-4"
                  :key="amenity + idx"
                  v-for="(amenity, idx) in propertyDetails.accommodationServices
                    .amenities"
                >
                  <i class="fa fa-2x mr-3" :class="amenity.className"></i>
                  <span class="h5">{{ amenity.name }}</span>
                </li>
              </ul>
            </div>

            <hr
              class="mt-5 mb-5"
              v-if="propertyDetails.rulesForGuests.length > 0"
            />

            <div
              class="text-left"
              v-if="propertyDetails.rulesForGuests.length > 0"
            >
              <h4 class="font-weight-bold">House Rules</h4>
              <ul
                style="list-style: none"
                class="mt-3 text-secondary px-3 list-inline"
              >
                <li
                  class="list-inline-item mr-5 my-4"
                  :key="rule + idx"
                  v-for="(rule, idx) in propertyDetails.rulesForGuests"
                >
                  <i class="fa fa-2x mr-3" :class="rule.className"></i>
                  <span class="h5">{{ rule.name }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            id="booking-card-2"
            class="col-12 col-lg-8 text-left mx-auto px-4 mb-5 mb-lg-0"
            v-if="bookingCard === 2"
          >
            <h2 class="font-weight-bold mb-5" style="max-width: 85%">
              Review Check-in Details
            </h2>

            <h4 class="mb-3">Check-in Time</h4>

            <b-input-group class="mb-3 my-card-border">
              <b-form-input
                class="h6 pl-4 my-card-border"
                id="example-input"
                v-model="checkinTime"
                type="text"
                placeholder="HH:mm:ss	(Type or click the button on right)"
              ></b-form-input>

              <b-input-group-append>
                <b-form-timepicker
                  v-model="checkinTime"
                  button-only
                  reset-button
                  right
                  locale="en"
                  aria-controls="example-input"
                ></b-form-timepicker>
              </b-input-group-append>
            </b-input-group>

            <div class="text-left mt-5">
              <h4 class="d-inline-flex">Travelling for Business?</h4>
              <toggle-button
                class="d-inline-flex pull-right"
                color="#ffc107"
                v-model="forBusiness"
              />
            </div>

            <h4 class="mt-5 mb-3">Say hello to your host</h4>
            <textarea
              v-model="messageToHost"
              class="h6 w-100 p-3 elux-custom-shadow border-0"
              style="border-radius: 10px"
              placeholder="Write something to your host"
              rows="7"
            >
            </textarea>
          </div>

          <div
            id="booking-card-3"
            class="col-12 col-lg-8 text-left mx-auto px-4 mb-5 mb-lg-0"
            v-if="bookingCard === 3"
          >
            <h2 class="font-weight-bold mb-5" style="max-width: 85%">
              Confirm and Pay
            </h2>

            <div class="px-3">
              <h4 class="mb-3 text-left pl-3">Select Payment Method</h4>

              <b-form-select
                class="my-card-border"
                :options="paymentMethods"
                v-model="paymentMethod"
              >
              </b-form-select>
            </div>

            <!-- <div class="row w-100 mx-auto">
							<div class="col-12 col-lg-6 px-3">
								<h4 :class="titleClass">First name</h4>
								<div class="card my-card-border mt-3 w-100">
									<input
										type="text"
										v-model="paymentDetails.name.firstName"
										class="h6 ml-3 nl-email border-0 my-2"
										style="width: 94%"
										placeholder="Enter First Name">
								</div>
							</div>
							<div class="col-12 col-lg-6 px-3">
								<h4 :class="titleClass">Last Name</h4>
								<div class="card my-card-border mt-3 w-100">
									<input
										type="text"
										v-model="paymentDetails.name.lastName"
										class="h6 ml-3 nl-email border-0 my-2"
										style="width: 94%"
										placeholder="Enter Last Name">
								</div>
							</div>
						</div> -->

            <div class="px-3" v-if="paymentMethod === 'Card'">
              <div class="row w-100 mx-auto">
                <div class="col-12 col-lg-12 pr-3">
                  <h4 :class="titleClass">Card Number</h4>
                  <div class="card w-100 my-card-border mt-3">
                    <input
                      type="text"
                      class="h6 ml-3 nl-email border-0 my-2"
                      style="width: 96%"
                      v-model="paymentDetails.creditCard.number"
                      placeholder="Card Number"
                    />
                  </div>
                </div>
              </div>

              <div class="row w-100 mx-auto">
                <div class="col-12 col-lg-6 pr-3">
                  <h4 :class="titleClass">Expiration Month</h4>
                  <div class="card my-card-border mt-3 w-100">
                    <input
                      type="number"
                      v-model="paymentDetails.creditCard.exp_month"
                      class="h6 ml-3 nl-email border-0 my-2"
                      style="width: 94%"
                      placeholder="Expiration Month"
                    />
                  </div>
                </div>
                <div class="col-12 col-lg-6 pl-3">
                  <h4 :class="titleClass">Expiration Year</h4>
                  <div class="card my-card-border mt-3 w-100">
                    <input
                      type="text"
                      v-model="paymentDetails.creditCard.exp_year"
                      class="h6 ml-3 nl-email border-0 my-2"
                      style="width: 94%"
                      placeholder="Expiration Year"
                    />
                  </div>
                </div>
              </div>

              <div class="row w-100 mx-auto">
                <div class="col-12 col-lg-6 pr-3">
                  <h4 :class="titleClass">CVC</h4>
                  <div class="card my-card-border mt-3 w-100">
                    <input
                      type="number"
                      v-model="paymentDetails.creditCard.cvc"
                      class="h6 ml-3 nl-email border-0 my-2"
                      style="width: 94%"
                      placeholder="CVC"
                    />
                  </div>
                </div>
                <div class="col-12 col-lg-6 pl-3">
                  <h4 :class="titleClass">Coupon</h4>
                  <div class="card w-100 my-card-border mt-3">
                    <input
                      type="text"
                      class="h6 ml-3 nl-email border-0 my-2"
                      style="width: 96%"
                      v-model="paymentDetails.coupon"
                      placeholder="Enter Coupon Code"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="px-3" v-if="paymentMethod === 'B-Lux Wallet'">
              <div class="row w-100 mx-auto">
                <div class="col-12 col-lg-12 pr-3 text-left">
                  <h5 :class="titleClass">
                    Wallet Balance: ${{ wallet.bluxCredit }}
                  </h5>
                </div>
              </div>
            </div>

            <!-- <div class="px-3" v-if="paymentMethod === 'MFS'">
							<a target="_blank" href="https://www.sslcommerz.com/" title="SSLCommerz" alt="SSLCommerz">
								<img style="width:300px;height:auto;" src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-05.png"/>
							</a>
						</div> -->

            <hr class="my-5" />

            <h4 class="font-weight-bold">Cancellation Policy</h4>
            <h6 class="mt-3 mb-3 w-75 font-weight-light">
              {{ cancellationPolicy }}
            </h6>
            <a href="" class="h6 text-warning font-weight-bold"
              >Read more about the policy.....</a
            >

            <hr class="my-5" />

            <h4 class="font-weight-bold mb-3">Add optional note for expense</h4>

            <div class="card border-0 align-items-center">
              <textarea
                v-model="expenseNote"
                class="h6 w-100 p-3 elux-custom-shadow border-0"
                style="border-radius: 10px"
                placeholder="Write something to your host"
                rows="7"
              >
              </textarea>
            </div>
          </div>

          <div class="col-12 col-lg-4 text-left mx-auto">
            <div class="card my-card-border shadow overflow-hidden">
              <b-carousel
                class="mb-4"
                v-model="slide"
                :interval="0"
                indicators
                controls
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
                style="max-height: 250px; border-radius: 20px"
              >
                <b-carousel-slide
                  v-for="(image, index) in propertyDetails.imagesOfProperty"
                  style="height: 200px"
                  :key="index"
                  :img-src="image"
                  :img-width="'fit-content'"
                  :img-height="'fit-content'"
                >
                </b-carousel-slide>
              </b-carousel>

              <div class="card-body text-left h-100">
                <div class="px-3 text-left mb-3 h-100">
                  <h4>${{ propertyDetails.price.basePrice }} / night</h4>

                  <hr class="mt-3 mb-3" />

                  <h4 class="mb-3">Dates</h4>

                  <v-date-picker
                    mode="range"
                    :attributes="attributes"
                    v-model="bookingDetails.dates"
                    :disabled-dates="bookedDates"
                    color="yellow"
                  />

                  <hr class="mt-3 mb-3" />

                  <h4 class="mb-3">Guests</h4>

                  <b-form-spinbutton
                    v-model="bookingDetails.guests"
                    min="0"
                    :max="this.propertyDetails.accommodationCapacity.adults"
                  >
                  </b-form-spinbutton>

                  <hr class="mt-3 mb-3" />

                  <h6 class="font-weight-light">
                    <span>
                      ${{ propertyDetails.price.basePrice }} &times;
                      {{ getTotalNightsString }}
                    </span>
                    <span class="pull-right">
                      ${{ propertyDetails.price.basePrice * getTotalNights }}
                    </span>
                  </h6>

                  <h6 class="font-weight-light">
                    <span>Cleaning Fee</span>
                    <span class="pull-right"> + ${{ cleaningFee }} </span>
                  </h6>

                  <h6 class="font-weight-light">
                    <span>Service Fee</span>
                    <span class="pull-right"> + ${{ serviceFee }} </span>
                  </h6>

                  <h6
                    v-if="
                      new Date(propertyDetails.price.discountExpiration) >
                      new Date()
                    "
                    class="font-weight-light"
                  >
                    <span class="text-success font-weight-bold">Discount</span>
                    <span class="pull-right text-success font-weight-bold">
                      - ${{ getDiscount }}
                    </span>
                  </h6>

                  <hr />

                  <h6>
                    <span class="mb-3 h4">Total Price</span>
                    <span class="h4 pull-right">
                      ${{ getPropertyPrice - getDiscount }}
                    </span>
                  </h6>

                  <div class="row">
                    <div class="col-12">
                      <button
                        @click="agreeAndContinue"
                        v-if="bookingCard === 1"
                        style="
                          border-radius: 15px;
                          font-size: 20px;
                          width: 200px;
                        "
                        class="
                          mx-auto
                          mt-4
                          px-3
                          py-2
                          btn btn-warning
                          text-white
                        "
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 custom-text-left px-5">
            <button
              @click="back"
              v-if="bookingCard > 1"
              style="border-radius: 15px; width: 200px"
              class="
                mt-5 mt-lg-0
                pt-3
                py-2
                mr-lg-5
                btn btn-secondary
                text-white
              "
            >
              <h5>Back</h5>
            </button>

            <button
              @click="agreeAndContinue"
              v-if="bookingCard > 1"
              style="border-radius: 15px; width: 200px"
              class="mt-5 mt-lg-0 pt-3 py-2 btn btn-warning text-white"
            >
              <h5>Continue</h5>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "Booking",
  data() {
    return {
      attributes: [],
      propertyDetails: {},
      slide: 0,
      sliding: null,
      bookedDates: [
        {
          start: null,
          end: new Date(),
        },
      ],
      bookingDetails: {
        dates: "",
        guests: 0,
        nights: 0,
      },
      cleaningFee: 0.0,
      serviceFee: 0.0,
      bookingCard: 3,
      checkinTime: "",
      forBusiness: false,
      messageToHost: "",
      paymentMethods: ["Card", "MFS", "B-Lux Wallet"],
      paymentMethod: "Card",
      titleClass: "text-left font-weight-bold mt-4 ml-3",
      paymentDetails: {
        name: {
          firstName: "",
          lastName: "",
        },
        address: {
          country: "",
          city: "",
          state: "",
          zipcode: "",
          streetAddress: "",
          aptSuite: "",
        },
        coupon: "",
        creditCard: {
          number: "4242424242424242",
          exp_month: 7,
          exp_year: 2025,
          cvc: "123",
        },
      },
      wallet: {},
      expenseNote: "",
      guestCountError: false,
      checkInTimeWarning: true,
      cancellationPolicy:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, porro minus sint optio nihil fugit accusamus quae id neque culpa error, enim magnam eveniet excepturi minima ipsum voluptatibus. Corporis, dolores quibusdam quis nihil earum accusamus",
    };
  },
  methods: {
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        toaster: "b-toaster-bottom-left",
        solid: true,
      });
    },
    fetchWallet() {
      let baseUrl = this.getServerBaseURL;
      let token = this.getSessionToken;
      axios
        .post(
          baseUrl + "user/wallet",
          {},
          {
            headers: {
              "x-auth": token,
            },
          }
        )
        .then((res) => {
          this.wallet = res.data.wallet;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    incGuests() {
      this.bookingDetails.guests = Math.min(this.bookingDetails.guests + 1, 10);
      if (
        this.bookingDetails.guests >
        this.propertyDetails.accommodationCapacity.adults +
          this.propertyDetails.accommodationCapacity.children +
          this.propertyDetails.accommodationCapacity.infants
      ) {
        // console.log('TOO MUCH');
        this.guestCountError = true;
      }
    },
    decGuests() {
      this.bookingDetails.guests = Math.max(this.bookingDetails.guests - 1, 0);
      if (
        this.bookingDetails.guests <=
        this.propertyDetails.accommodationCapacity.adults +
          this.propertyDetails.accommodationCapacity.children +
          this.propertyDetails.accommodationCapacity.infants
      ) {
        this.guestCountError = false;
      }
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    getFormattedDate(date) {
      return date.format("MMMM D");
    },
    agreeAndContinue() {
      if (
        this.bookingCard === 2 &&
        this.checkinTime === "" &&
        this.checkInTimeWarning
      ) {
        this.makeToast(
          "warning",
          "Warning",
          "Do you want to proceed without adding a check-in time?"
        );
        this.checkInTimeWarning = false;
        return;
      }
      if (this.bookingCard === 3) {
        // this.$router.push('/payment');
        this.executeReservation();
      }
      this.bookingCard = Math.min(this.bookingCard + 1, 3);
    },
    back() {
      this.bookingCard = Math.max(this.bookingCard - 1, 0);
    },
    fetchReservedDates() {
      let baseURL = this.getServerBaseURL;
      axios
        .post(baseURL + "property/reservations", {
          propertyID: this.$route.query.id,
        })
        .then((res) => {
          if (res.status === 200) {
            this.attributes = [];

            for (const date of res.data.reservationDates) {
              let formattedDate = {
                key: "booked-dates",
                highlight: {
                  color: "red",
                  fillMode: "light",
                },
                dates: {
                  start: new Date(date.start),
                  end: new Date(date.end),
                },
              };

              this.attributes.push(formattedDate);
            }
          } else {
            // console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    executeReservation() {
      if (this.guestCountError) {
        this.makeToast(
          "danger",
          "Error",
          "Number of Guests Exceeds Accommodation Capacity!"
        );
        return;
      }

      if (this.paymentMethod === "B-Lux Wallet") {
      }

      let baseURL = this.getServerBaseURL;
      let token = this.getSessionToken;

      let reservationObject = {
        propertyID: this.propertyDetails._id,
        checkIn: this.bookingDetails.dates.start,
        checkOut: this.bookingDetails.dates.end,
        conversation: this.getConversation(),
      };

      axios
        .post(
          baseURL + "reservation/insert",
          { reservationObject },
          {
            headers: {
              "x-auth": token,
            },
          }
        )
        .then((res) => {
          let reservationID = res.data.reservationObject._id;

          let requestBody = {
            reservationID,
            price: this.propertyDetails.price.basePrice * this.getTotalNights,
          };

          if (this.paymentMethod === "Card") {
            requestBody.paymentMethod = "STRIPE";
            requestBody.creditCard = this.paymentDetails.creditCard;
          } else if (this.paymentMethod === "B-Lux Wallet") {
            requestBody.paymentMethod = "BCREDIT";
          } else if (this.paymentMethod === "MFS") {
            requestBody.paymentMethod = "MFS";
			requestBody.successUrl = 'https://blux-frontend.web.app/guestreservations'
          }

          axios
            .post(baseURL + "reservation/pay", requestBody, {
              headers: {
                "x-auth": token,
              },
            })
            .then((res) => {
              if (this.paymentMethod === "MFS") {
                let redirectUrl = res.data.redirectUrl;
                window.location.replace(redirectUrl);
              } else {
                this.$router.push('/guestreservations');
              }
              this.makeToast("success", "Success", "Payment Successful");
            })
            .catch((err) => {
              this.makeToast("danger", "Error", err.response.data.message);
            });
        })
        .catch((err) => {
          this.makeToast("danger", "Error", err.response.data.message);
        });
    },
    getConversation() {
      if (this.messageToHost === "" || this.messageToHost === null) return [];
      else
        return [
          {
            message: this.messageToHost,
            time: new Date(),
          },
        ];
    },
    parseAmenities(tempProperty) {
      for (
        let j = 0;
        j < tempProperty.accommodationServices.amenities.length;
        j++
      ) {
        tempProperty.accommodationServices.amenities[j] = JSON.parse(
          tempProperty.accommodationServices.amenities[j]
        );
      }
      for (let j = 0; j < tempProperty.rulesForGuests.length; j++) {
        tempProperty.rulesForGuests[j] = JSON.parse(
          tempProperty.rulesForGuests[j]
        );
      }
      this.propertyDetails = tempProperty;
      // console.log(this.properties[0]);
    },
    updateCreditCardDate(date) {
      this.paymentDetails.creditCard.exp_month = date.monthIndex;
      this.paymentDetails.creditCard.exp_year = date.year;
    },
  },
  computed: {
    ...mapGetters(["getSessionToken", "getServerBaseURL", "getPropertyToView"]),
    guestCount() {
      if (
        this.bookingDetails.guests === "1" ||
        this.bookingDetails.guests === 1
      )
        return "1 Person";
      else return this.bookingDetails.guests.toString() + " Persons";
    },
    totalPrice() {
      return this.propertyDetails.price.basePrice * this.getTotalNights;
    },
    getArrivalDate() {
      let aD = new moment(this.bookingDetails.dates.start);
      return aD.format("MMMM D");
    },
    getDepartureDate() {
      let dD = new moment(this.bookingDetails.dates.end);
      return dD.format("MMMM D");
    },
    getTotalNights() {
      let aD = new moment(this.bookingDetails.dates.start);
      let dD = new moment(this.bookingDetails.dates.end);
      return Math.max(dD.diff(aD, "days"), 1);
    },
    getTotalNightsString() {
      let nights = this.getTotalNights;
      if (nights === 1) return "1 Night";
      else return nights.toString() + " Nights";
    },
    getBedroomCount() {
      if (this.propertyDetails.accommodationServices.bedroom.count <= 1)
        return "1 Bedroom";
      else
        return (
          this.propertyDetails.accommodationServices.bedroom.count.toString() +
          " Bedrooms"
        );
    },
    getBathroomCount() {
      if (this.propertyDetails.accommodationServices.bathroom.count <= 1)
        return "1 Bathroom";
      else
        return (
          this.propertyDetails.accommodationServices.bathroom.count.toString() +
          " Bathrooms"
        );
    },
    getBedCount() {
      if (this.propertyDetails.accommodationServices.bedroom.bedCount <= 1)
        return "1 Bed";
      else
        return (
          this.propertyDetails.accommodationServices.bedroom.bedCount.toString() +
          " Beds"
        );
    },
    getPropertyPrice() {
      return this.propertyDetails.price.basePrice * this.getTotalNights;
    },
    getDiscount() {
      return (
        (this.getPropertyPrice *
          this.propertyDetails.price.discountPercentage) /
        100
      );
    },
  },
  mounted() {
    let baseURL = this.getServerBaseURL;

    axios
      .post(baseURL + "property/viewbyid", {
        propertyID: this.$route.query.id,
      })
      .then((res) => {
        let tempProperty = res.data.property;
        this.parseAmenities(tempProperty);
        // console.log(this.propertyDetails);
      })
      .catch((err) => {
        // console.log(err);
      });

    this.fetchReservedDates();
    this.fetchWallet();
  },
};
</script>

<style scoped>
input:active,
input:focus,
textarea:focus,
textarea:active {
  border: none;
  outline: none;
}

img {
  border-radius: 20px;
}

input:focus {
  outline: none;
}

.elux-custom-shadow {
  box-shadow: 0 3px 5px rgba(150, 150, 150, 0.3);
}

@media (min-width: 992px) {
  .custom-text-left {
    text-align: left !important;
  }
}
</style>
