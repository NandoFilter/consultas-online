<template>
  <div>
    <Navigation />
    <div class="main">
      <Chat class="chat" />
      <!-- <h1>Converse com um profissional</h1>
      <div class="items">
        <div class="card" v-for="item in items" :key="item.id">
          <v-icon :icon="item.icon" />
          <span>{{ item.title }}</span>
        </div>  
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Navigation, Chat } from '@/components';

export default defineComponent({
  components: {
    Navigation,
    Chat
  },
  data: () => ({
    items: [
      { id: 0, title: 'Psicólogo',     icon: 'mdi-brain' },
      { id: 1, title: 'Nutricionista', icon: 'mdi-food-apple-outline' },
      { id: 2, title: 'Cardiologista', icon: 'mdi-heart-outline' },
      { id: 3, title: 'Dentista',      icon: 'mdi-tooth-outline' },
    ]
  })
})
</script>

<style lang="scss" scoped>
.main {
  margin-left: 75px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

// .items {
//   display: flex;
//   flex-direction: row;
// }

// .card {
//   width: 18vh;
//   height: 12vh;

//   margin: 10px;

//   border-radius: 15px;

//   color: #000;
//   font-size: 20px;
  
//   box-shadow: 0px 1px 3px gray;

//   transition: box-shadow 0.5s ease;
//   transition: color 0.5s ease;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
// }

// .card:hover {
//   cursor: pointer;

//   transition: box-shadow 0.5s ease;
//   transition: color 0.5s ease;

//   color: $primary-color;

//   box-shadow: 0px 1px 3px $primary-color;
// }
</style>