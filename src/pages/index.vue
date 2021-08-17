<script>
  import { mapState, mapMutations } from "vuex";

  export default {
    created() {
      this.fetchData();
    },

    computed: {
      ...mapState( "page", ["image"]),
    },

    methods: {
      ...mapMutations( "page", ["updateImage"]),

      fetchData() {
        this.$api.get("/image").then( ({data}) => {
          this.updateImage({
            type: "list",
            value: data.data.images
          });
        })
      },

      show( photo ) {
        this.updateImage({
          type: "active",
          value: photo
        });
      },
    }
  }
</script>

<template>
  <section class="card-list">
    <div
      class="card"
      v-for="photo in image.list"
    >
      <img
        class="fit"
        draggable="false"
        alt=""
        :src="photo.path"
        @click="show(photo)"
      >
    </div>
  </section>

  <x-detail />
</template>

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
