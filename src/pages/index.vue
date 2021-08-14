<template>
  <section class="card-list">
    <div class="card"
         v-for="image in images"
    >
      <img draggable="false" class="fit" :src="temp( image.file )" alt=""
           @click="show( temp( image.file ) )"
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
      images: [ ]
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    temp( name ) {
      return "http://localhost/spark/backend/public/tmp/" + name;
    },

    fetchData() {
      this.$api.get("/image").then( ({data}) => {
        this.images = data.data.images;
      })
    },

    show( photo ) {
      this.activePhoto = photo;
    },

    deactivate() {
      this.activePhoto = null;
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
