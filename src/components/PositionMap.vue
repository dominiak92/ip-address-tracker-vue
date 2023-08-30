<template>
    <l-map :style="{ height: height }" :zoom="zoom" :center="center">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  props: {
    location: {
      type: Object,
    },
    defaultLocation: {
      type: Object,
    },
  },
  computed: {
    isLargeScreen() {
      return this.$mq === "lg";
    },
    height() {
    return !this.isLargeScreen ? '130vw' : '100%';
  }
    
  },
  watch: {
    location(location) {
      // Sprawdź, czy obiekt location ma właściwości latitude i longitude
      if (location) {
        // Ustaw nowe wartości dla center i markerLatLng, jeśli location zostało przekazane prawidłowo
        this.center = [location.latitude, location.longitude];
        this.markerLatLng = [location.latitude, location.longitude];
        window.dispatchEvent(new Event('resize'));
      }
    },
    defaultLocation(location) {
      if (location) {
        this.center = [location.latitude, location.longitude];
        this.markerLatLng = [location.latitude, location.longitude];
        window.dispatchEvent(new Event('resize'));
      }
    },
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [0, 0], // Domyślnie ustaw na [0, 0]
      markerLatLng: [0, 0], // Domyślnie ustaw na [0, 0]
    };
  },
};
</script>

<style></style>
