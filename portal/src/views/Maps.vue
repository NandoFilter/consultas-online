<template>
  <div>
    <Navigation />
    <div class="main">
      <GoogleMap class="map" :api-key="key" :center="coordinates" :zoom="zoom">
        <Marker
          v-for="mark in markers"
          :key="mark.name"
          :options="{ position: mark.position, label: 'H', title: mark.name }"
        />
      </GoogleMap>

      <v-btn
        @click="locatorButtonPressed"
        prepend-icon="mdi-crosshairs-gps"
      >
        Localizar
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Navigation } from '@/components';
import { GoogleMap, Marker } from "vue3-google-map";

type Mark = { name: string, position: { lat: number, lng: number } }

export default defineComponent({
  components: { Navigation, GoogleMap, Marker },
  data: () => ({
    lat: -10.760147,
    lng: -55.003977,
    zoom: 3,
    key: process.env.VUE_APP_GOOGLE_API_KEY,
    markers: [] as Mark[]
  }),
  computed: {
    coordinates() {
      return { lat: this.lat, lng: this.lng };
    }
  },
  methods: {
    locatorButtonPressed() {
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
      this.markers = [
        { 
          name: 'Nova FUNDEF',
          position: { lat: -29.43499678946232, lng: -51.95022894654883 }
        },
        { 
          name: 'Hospital Bruno Born',
          position: { lat: -29.463003227165693, lng: -51.96652135591914 }
        },
        { 
          name: 'Farmácia São João',
          position: { lat: -29.45376755277209, lng: -51.96682270004708 }
        }
      ]
    }
  }
});
</script>

<style lang="scss" scoped>
.main {
  margin-left: 75px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.map {
  width: 90%;
  height: 800px;

  margin: 15px;
}
</style>