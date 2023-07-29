<template>
  <div class="ipInfoWrapper">
    <div class="dataWrapper">
      <p class="dataTitle">{{ dataTitle }}</p>
      <p class="data">{{ currentIp.ip }}</p>
    </div>
    <div v-if="currentIp.region && currentIp.city" class="dataWrapper">
      <p class="dataTitle">LOCATION</p>
      <p class="data">
        {{ currentIp.region }}, {{ currentIp.city }} {{ currentIp.postal }}
      </p>
    </div>
    <div
      v-if="currentIp.time_zone?.abbr && currentIp.time_zone?.offset"
      class="dataWrapper"
    >
      <p class="dataTitle">TIMEZONE</p>
      <p class="data">
        {{ currentIp.time_zone?.abbr }} {{ currentIp.time_zone?.offset }}
      </p>
    </div>
    <div
      v-if="currentIp.asn?.name && currentIp.carrier?.name"
      class="dataWrapper"
    >
      <p class="dataTitle">ISP</p>
      <p class="data">
        {{ currentIp.asn?.name }}, {{ currentIp.carrier?.name }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "IpCheck",

  data() {
    return {
      dataTitle: "IP ADDRESS",
      currentIp: {},
      error: false,
    };
  },
  props: {
    inputIp: {
      type: String,
      default: "",
    },
    counter: {
      type: Number,
    },
  },
  mounted() {
    if (!this.inputIp) {
      this.getUserIp();
      this.dataTitle = "YOUR IP ADDRESS";
    }
  },
  watch: {
    inputIp(newInputIp, oldInputIp) {
      if (newInputIp && newInputIp !== oldInputIp) {
        this.getInputIp();
        this.dataTitle = "IP ADDRESS";
      }
    },
    counter(newVal) {
      if (newVal) {
        this.error = false;
        this.$emit("error", this.error);
      }
    },
  },
  methods: {
    getUserIp() {
      axios
        .get(
          "https://api.ipdata.co?api-key=8182a4040de3b3cdc962a5ba587c96bded217df17b025fddf7901d78"
        )
        .then((response) => {
          this.error = false;
          this.$emit("error", this.error);
          this.currentIp = response.data;
          this.$emit("defaultLocationData", {
            longitude: this.currentIp.longitude,
            latitude: this.currentIp.latitude,
          });
        })
        .catch((error) => {
          console.error("Błąd pobierania adresu IP użytkownika:", error);
        });
    },
    getInputIp() {
      axios
        .get(
          `https://api.ipdata.co/${this.inputIp}?api-key=8182a4040de3b3cdc962a5ba587c96bded217df17b025fddf7901d78`
        )
        .then((response) => {
          this.error = false;
          this.currentIp = response.data;
          this.$emit("error", this.error);
          this.$emit("locationData", {
            longitude: Number(this.currentIp.longitude.toFixed(3)),
            latitude: Number(this.currentIp.latitude.toFixed(3)),
          });
        })
        .catch((error) => {
          this.error = true;
          this.$emit("error", this.error);
          console.error("Błąd pobierania adresu IP", error);
        });
    },
  },
};
</script>
<style lang="scss">
@import "../../scss/variables.scss";
@import "../../scss/mixins.scss";
@import "../../scss/breakpoints.scss";

.ipInfoWrapper {
  width: 90vw;
  border-radius: 15px;
  background: #fff;
  position: absolute;
  top: 180px;
  box-shadow: 0px 50px 50px -25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 7vw;
  z-index: 1;
  @include xl {
    flex-direction: row;
    align-items: flex-start;
    width: auto;
    padding: 1vw;
  }
  .dataWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include xl {
      width: 11vw;
      height: 5vw;
      max-width: 14vw;
      padding: 1vw;
      box-sizing: content-box;
      border-right: 1px solid rgb(210, 210, 210);
      justify-content: flex-start;
    }
    &:last-of-type {
    border-right: none;
  }
    .dataTitle {
      font-size: 2.8vw;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 1.458px;
      text-transform: uppercase;
      opacity: 0.4986979067325592;
      margin-bottom: 1.5vw;
      @include xl {
        font-size: 0.7vw;
        margin-bottom: 0.8vw
      }
      
    }
    .data {
      font-size: 5vw;
      font-style: normal;
      font-weight: 500;
      line-height: 24px; /* 120% */
      letter-spacing: -0.179px;
      color: #2c2c2c;
      margin-bottom: 5vw;
      text-align: center;
      @include xl {
        font-size: 1.2vw;
        margin: 0;
      }
    }
  }
}
</style>
