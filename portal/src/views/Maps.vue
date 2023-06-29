<template>
  <div>
    <Navigation />
    <div class="main">
      <GoogleMap class="map" :api-key="key" :center="coordinates" :zoom="zoom">
        <CustomMarker
          v-for="(h, key) in hospitals"
          :key="key"
          :options="{ position: h.position, anchorPoint: 'BOTTOM_CENTER' }"
        >
          <div style="text-align: center">
            <div class="mark_name">{{ h.name }}</div>
            <img class="mark_img" :src="require('@/assets/img/hospital_pin.svg')" />
          </div>
        </CustomMarker>

        <CustomMarker
          v-for="(p, key) in pharmacies"
          :key="key"
          :options="{ position: p.position, anchorPoint: 'BOTTOM_CENTER' }"
        >
          <div style="text-align: center">
            <div class="mark_name">{{ p.name }}</div>
            <img class="mark_img" :src="require('@/assets/img/pharmacy_pin.svg')" />
          </div>
        </CustomMarker>

        <v-btn
          @click="locatorButtonPressed"
          icon="mdi-crosshairs-gps"
          color="red"
          class="locator_button"
        />
      </GoogleMap>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Navigation } from '@/components';
import { GoogleMap, CustomMarker } from "vue3-google-map";

import hospitalsJSON from '@/json/hospitals.json'
import pharmaciesJSON from '@/json/pharmacies.json'

type Mark = { 
  name: string,
  position: { lat: number, lng: number }
}

export default defineComponent({
  components: { Navigation, GoogleMap, CustomMarker },
  data: () => ({
    lat: 0,
    lng: 0,
    zoom: 3,
    key: process.env.VUE_APP_GOOGLE_API_KEY,
    
    hospitals: [] as Mark[],
    pharmacies: [] as Mark[]
  }),
  computed: {
    coordinates() {
      return { lat: this.lat, lng: this.lng };
    }
  },
  methods: {
    reset() {
      this.lat = 0
      this.lng = 0
      this.zoom = 3
    },
    locatorButtonPressed() {
      this.reset()

      navigator.geolocation.getCurrentPosition(
        position => {
          this.lat = position.coords.latitude
          this.lng = position.coords.longitude
          this.zoom = 14
          this.getMarkers()
        },
      );
    },
    getMarkers() {
      this.hospitals = hospitalsJSON
      this.pharmacies = pharmaciesJSON
    }
  }
});
</script>

<style lang="scss" scoped>
.main {
  margin-left: 55px;

  display: flex;
  justify-content: center;
}

.map {
  width: 100vw;
  height: 100vh;

  position: relative;
}

.mark_name {
  font-size: 1.125rem;

  color: black;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;

  font-weight: bold;
}

.mark_img {
  width: 30px;
  height: 45px;

  margin-top: 8px;
}

.locator_button {
  position: absolute;
  bottom: 0;

  margin: 45px 15px;
}
</style>