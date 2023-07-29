<template>
  <div class="headerWrapper">
    <div class="contentWrapper">
      <h2>IP Address Tracker</h2>
      <SearchBar
        :error="error"
        @searchIp="handleSearch"
        @closeErrorDialog="closeDialogHandler"
      />
      <IpCheck
        @defaultLocationData="handleDefaultLocationData"
        @error="errorHandler"
        @locationData="handleLocationData"
        :counter="counter"
        :inputIp="inputIp"
      />
    </div>
    <PositionMap
      :defaultLocation="defaultLocation"
      :location="location"
      class="map"
    />
  </div>
</template>
<script>
import SearchBar from "./UI/SearchBar.vue";
import IpCheck from "./UI/IpCheck.vue";
import PositionMap from "./PositionMap.vue";
export default {
  name: "AppHeader",
  data() {
    return {
      location: {},
      defaultLocation: {},
      inputIp: "",
      error: false,
      counter: 0,
      backgroundStyle: {
        backgroundImage: "url(~@/assets/logo.png)",
      },
    };
  },
  components: {
    SearchBar,
    IpCheck,
    PositionMap,
  },
  methods: {
    handleLocationData(data) {
      this.location = data;
    },
    handleDefaultLocationData(data) {
      this.defaultLocation = data;
    },
    handleSearch(ipData) {
      this.inputIp = ipData;
    },
    errorHandler(error) {
      this.error = error;
    },
    closeDialogHandler(counter) {
      this.counter = counter;
    },
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Comfortaa&display=swap");
@import "../scss/breakpoints.scss";
@import "../scss/mixins.scss";
@import "../scss/variables.scss";

.headerWrapper {
  height: 95vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("~@/assets/pattern-bg-mobile.png");
  background-size: cover;
  position: relative;
  .contentWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @include xl {
    background-image: url("~@/assets/pattern-bg-desktop.png");
  }
  
  h2 {
    font-family: "Comfortaa", cursive;
    color: #ffffff;
    margin: 2rem;
    text-align: center;
  }
  .map {
    position: absolute;
    top: 95vw;
    z-index: 0;
    @include xl {
      top: 16vw;
    }
  }
}
</style>
