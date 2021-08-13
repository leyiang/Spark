<template>
  <section class="card-list">
    <div class="card"
         v-for="photo in photos"
    >
      <img draggable="false" class="fit" :src="photo" alt=""
           @click="show( photo )"
      >
    </div>
  </section>

  <x-detail :photo="activePhoto"
            @close="deactivate"
  ></x-detail>
</template>

<script>
export default {
  data() {
    return {
      activePhoto: null,
      photos: [
        "https://images.pexels.com/photos/8828132/pexels-photo-8828132.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/4254970/pexels-photo-4254970.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/8665572/pexels-photo-8665572.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/7681340/pexels-photo-7681340.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        "https://images.pexels.com/photos/5820926/pexels-photo-5820926.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/5965930/pexels-photo-5965930.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/3807547/pexels-photo-3807547.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/5820926/pexels-photo-5820926.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/5965930/pexels-photo-5965930.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/3807547/pexels-photo-3807547.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/3807547/pexels-photo-3807547.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/5820926/pexels-photo-5820926.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/5965930/pexels-photo-5965930.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/3807547/pexels-photo-3807547.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      ]
    }
  },
  methods: {
    show( photo ) {
      console.log( photo );
      this.activePhoto = photo;
    },

    deactivate() {
      this.activePhoto = null;
      console.log( this.activePhoto );
    }
  }
}
</script>

<style>
/**
Card
 */
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  background-color: #EEE;

  height: 400px;
  width: calc( calc(100% - 3rem) / 4);

  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none;
}

.card:hover {
  filter: brightness(.7);
}
</style>