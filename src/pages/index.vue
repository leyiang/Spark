<script>
  import { mapState, mapMutations } from "vuex";

  export default {
    created() {
      this.fetchData();
    },

    computed: {
      ...mapState( "page", ["search", "spark"]),

      filteredSpark() {
        const search = this.search.content;
        const regexp = new RegExp(search);

        if( ! search.length ) return this.spark.list;

        return this.spark.list.filter( spark => {
          return spark.tags.some( tag => regexp.test( tag ) );
        });
      },
    },

    methods: {
      ...mapMutations( "page", ["updateSpark"]),

      fetchData() {
        this.$api.get("/spark").then( ({data}) => {
          this.updateSpark({
            type: "list",
            value: data.data
          });
        })
      },

      show( photo ) {
        this.updateSpark({
          type: "active",
          value: photo
        });
      },
    }
  }
</script>

<template>
  <main class="index-content">
    <h2
        class="search-result"
        v-if="search.content"
    >
      <span>Search result for </span>
      <strong>{{ search.content }}:</strong>
    </h2>

    <section
        class="card-list"
        v-if="filteredSpark.length"
    >
      <div
          class="card"
          v-for="spark in filteredSpark"
      >
        <img
            draggable="false"
            alt=""
            :src="spark.src"
            @click="show(spark)"
        >
      </div>
    </section>

    <section
        class="no-data"
        v-else
    >
      <img :src="require('@/assets/icons/sad.svg')" alt="sad">
      <h2>Sorry, nothing found.</h2>
    </section>

    <x-detail
        v-if="spark.active"
    />
  </main>
</template>

<style>
/**
Card
 */
.card-list {
  margin-top: 1rem;
  column-count: 4;
}

.card {
  background-color: #EEE;

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

.no-data {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.no-data h2 {
  font-size: 2rem;
}

.index-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
t
