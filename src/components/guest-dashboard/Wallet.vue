<template>
  <div class="container px-2">
    <div class="row">
      <div class="col col-12 col-lg-7 mr-auto">
        <div
          class="
            card
            my-card-border my-5
            elux-custom-shadow
            mx-auto
            px-4
            text-left
          "
        >
          <div class="row w-100 mx-auto mt-4">
            <div class="col col-6">
              <button
                :style="{ 'text-decoration': cardTopUpDecor }"
                :class="{ 'font-weight-bold': topUpMethod === 'card' }"
                @click="topUpMethodSelect('card')"
                style="font-size: large"
                class="btn bg-transparent mt-4"
              >
                Top Up With Card
              </button>
            </div>
            <div class="col col-6">
              <button
                :style="{ 'text-decoration': bkashTopUpDecor }"
                :class="{ 'font-weight-bold': topUpMethod === 'bkash' }"
                @click="topUpMethodSelect('bkash')"
                style="font-size: large"
                class="btn bg-transparent mt-4"
              >
                Top Up With BKash
              </button>
            </div>
          </div>

          <div class="px-3" v-if="topUpMethod === 'card'">
            <div class="row w-100 mx-auto mt-2 mb-4">
              <div class="col-12 col-lg-12 text-left">
                <h4 :class="titleClass">Card Number</h4>
                <div class="card w-100 my-card-border mt-3">
                  <input
                    type="text"
                    class="h6 ml-3 nl-email border-0 my-2"
                    style="width: 96%"
                    v-model="creditCard.number"
                    placeholder="Card Number"
                  />
                </div>
              </div>
            </div>

            <div class="row w-100 mx-auto my-4">
              <div class="col-12 col-lg-6 pr-3 text-left">
                <h4 :class="titleClass">Expiration Month</h4>
                <div class="card my-card-border mt-3 w-100">
                  <input
                    type="number"
                    v-model="creditCard.exp_month"
                    class="h6 ml-3 nl-email border-0 my-2"
                    style="width: 94%"
                    placeholder="Expiration Month"
                  />
                </div>
              </div>
              <div class="col-12 col-lg-6 pl-3 text-left">
                <h4 :class="titleClass">Expiration Year</h4>
                <div class="card my-card-border mt-3 w-100">
                  <input
                    type="text"
                    v-model="creditCard.exp_year"
                    class="h6 ml-3 nl-email border-0 my-2"
                    style="width: 94%"
                    placeholder="Expiration Year"
                  />
                </div>
              </div>
            </div>

            <div class="row w-100 mx-auto my-4">
              <div class="col-12 col-lg-6 pr-3 text-left">
                <h4 :class="titleClass">CVC</h4>
                <div class="card my-card-border mt-3 w-100">
                  <input
                    type="number"
                    v-model="creditCard.cvc"
                    class="h6 ml-3 nl-email border-0 my-2"
                    style="width: 94%"
                    placeholder="CVC"
                  />
                </div>
              </div>
              <div class="col-12 col-lg-6 pl-3 text-left">
                <h4 :class="titleClass">Amount to Topup</h4>
                <div class="card my-card-border mt-3 w-100">
                  <input
                    type="number"
                    v-model="amount"
                    class="h6 ml-3 nl-email border-0 my-2"
                    style="width: 94%"
                    placeholder="Amount to Topup"
                  />
                </div>
              </div>
            </div>

            <b-btn
              @click="topup"
              class="btn btn-info text-white mt-2 mb-4 btn-lg"
              style="border-radius: 15px"
            >
              Top Up
            </b-btn>
          </div>

          <div class="px-3" v-if="topUpMethod === 'bkash'">
            <div class="row w-100 mx-auto my-4">
              <div class="col-12 pl-3 text-left">
                <h4 :class="titleClass">Amount to Topup</h4>
                <div class="card my-card-border mt-3 w-100">
                  <input
                    type="number"
                    v-model="amount"
                    class="h6 ml-3 nl-email border-0 my-2"
                    style="width: 94%"
                    placeholder="Amount to Topup"
                  />
                </div>
              </div>
            </div>

            <b-btn
              @click="topup"
              class="btn btn-info text-white mt-2 mb-4 btn-lg"
              style="border-radius: 15px"
            >
              Top Up
            </b-btn>
          </div>
        </div>
      </div>

      <div class="col col-12 col-lg-5 ml-auto px-2">
        <div class="card my-card-border my-5 elux-custom-shadow mx-auto px-4">
          <h4 :class="titleClass">Wallet Balance</h4>
          <div class="card w-100 border-0 mt-3 text-left ml-4">
            <h4>${{ wallet.bluxCredit }}</h4>
          </div>
          <hr class="mb-3" />

          <h4 :class="titleClass" class="mb-4">History</h4>
          <div style="max-height: 260px; overflow: scroll">
            <div
              class="row"
              :key="transaction + index"
              v-for="(transaction, index) in wallet.usageHistory"
            >
              <div class="col col-12 text-left ml-5 my-2">
                <h6>
                  <span
                    :class="{
                      'text-success':
                        getFormattedDetails(transaction.details) === 'RECHARGE',
                      'text-danger':
                        getFormattedDetails(transaction.details) === 'PAYMENT',
                    }"
                    >{{ getFormattedDetails(transaction.details) }}</span
                  >
                  - {{ transaction.paymentType }} - ${{
                    transaction.paymentAmount
                  }}
                  -
                  {{ new Date(transaction.timestamp).toLocaleDateString() }}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "Wallet",
  data() {
    return {
      wallet: {},
      creditCard: {
        number: "4242424242424242",
        exp_month: 5,
        exp_year: 2025,
        cvc: "123",
      },
      topUpMethod: "card",
      amount: 0,
      titleClass: "text-left font-weight-bold mt-4 ml-3",
      cardTopUpDecor: "underline",
      bkashTopUpDecor: "none",
    };
  },
  computed: {
    ...mapGetters(["getSessionToken", "getServerBaseURL"]),
  },
  methods: {
    topUpMethodSelect(method) {
      this.topUpMethod = method;
      if (method === "card") {
        this.cardTopUpDecor = "underline";
        this.bkashTopUpDecor = "none";
      } else {
        this.cardTopUpDecor = "none";
        this.bkashTopUpDecor = "underline";
      }
    },
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
          this.wallet.usageHistory.reverse();
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    topup() {
      let baseUrl = this.getServerBaseURL;
      let token = this.getSessionToken;
      let reqBody = {
        paymentMethod: this.topUpMethod === "card" ? "STRIPE" : "MFS",
        amount: this.amount,
      };

      if (this.topUpMethod === "card") {
        reqBody.creditCard = this.creditCard;
      } else {
		reqBody.successUrl = "https://blux-frontend.web.app/wallet"
	  }

      axios
        .post(baseUrl + "user/wallet/recharge", reqBody, {
          headers: {
            "x-auth": token,
          },
        })
        .then((res) => {
          if (this.topUpMethod === "bkash") {
            let redirectUrl = res.data.redirectUrl;
            window.location.replace(redirectUrl);
          }
          this.makeToast(
            "success",
            "Success",
            "Wallet topped up successfully!"
          );
          this.fetchWallet();
        })
        .catch((err) => {
          this.makeToast("danger", "Error", "Wallet top up failed!");
          console.log(err.response);
        });
    },
    getFormattedDetails(details) {
      return details.substr(5, details.length - 4).toUpperCase();
    },
  },
  mounted() {
    this.fetchWallet();
  },
};
</script>

<style>
</style>