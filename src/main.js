import Vue from 'vue';
import VueMq from 'vue-mq'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faLocationDot, faLink, faFaceSadTear, faBuilding, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Icon } from "leaflet";

import App from './App.vue';
import 'leaflet/dist/leaflet.css';

/* add icons to the library */
library.add(faMagnifyingGlass, faLocationDot, faLink, faTwitter, faFaceSadTear, faBuilding, faAngleRight);

/* add font awesome icon component */
Vue.component('FontAwesomeIcon', FontAwesomeIcon);
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

Vue.use(Vuetify);

Vue.use(VueMq, {
  breakpoints: { // punkty przerwania
    sm: 600,
    md: 1200,
    lg: Infinity,
  }
})

Vue.config.productionTip = false;

new Vue({
  vuetify : new Vuetify(),
  render: (h) => h(App),
}).$mount('#app');
