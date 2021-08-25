<script>
  import { mapState, mapMutations } from "vuex";

  export default {
    created() {
      this.fetchData();
    },

    computed: {
      ...mapState( "page", ["search", "image"]),

      filteredImage() {
        const search = this.search.content;
        const regexp = new RegExp(search);

        if( ! search.length ) return this.image.list;

        return this.image.list.filter( image => {
          return image.tags.some( tag => regexp.test( tag.content ) );
        });
      },
    },

    methods: {
      ...mapMutations( "page", ["updateImage"]),

      fetchData() {
        this.$api.get("/spark").then( ({data}) => {
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

  <h2
    class="search-result"
    v-if="search.content"
  >
    <span>Search result for </span>
    <strong>{{ search.content }}:</strong>
  </h2>

  <section class="card-list">
    <div
      class="card"
      v-for="photo in filteredImage"
    >
      <img
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
  /*display: flex;*/
  /*flex-wrap: wrap;*/
  /*gap: 1rem;*/
  margin-top: 1rem;
  column-count: 4;
}

.card {
  background-color: #EEE;

  /*height: 400px;*/
  margin-bottom: 1rem;
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none;
}

.card img {
  width: 100%;
  height: auto;
}

.card:hover {
  filter: brightness(.7);
}

.search-result {
  color: #989898;
}
.search-result strong {
  color: #222;
}
</style>
