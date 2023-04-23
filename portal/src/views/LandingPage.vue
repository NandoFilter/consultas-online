<template>
  <div>
    <Header/>
    <div class="presentation">
      <div class="banner">
        <span class="banner_title banner_items">O lugar ideal para tirar suas dúvidas médicas</span>
        <img class="banner_items" :src="require('../assets/img/banner_img.svg')">
      </div>

      <div class="topics">
        <div class="topics_item"></div>
        <div class="topics_item"></div>
        <div class="topics_item"></div>
        <div class="topics_item"></div>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Header } from '@/components';

export default defineComponent({
  components: {
    Header
  },
})
</script>

<style lang="scss" scoped>
.presentation {
  height: 525px;

  position: relative;

  display: flex;
  justify-content: center;
}

.banner {
  height: 450px;
  padding: 15px 15%;

  background-color: #dffdf1;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &_title {
    font-size: 60px;
    color: $primary-color;
  }

  &_items {
    margin-bottom: 50px;
  }
}

.topics {
  position: absolute;

  bottom: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;

  &_item {
    width: 200px;
    height: 150px;

    margin: 0 15px;

    background-color: #16b97aab;
    border-radius: 25px;
  }
}
</style>