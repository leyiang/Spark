<script>
  import {ref} from "vue";
  import CropMask from "./CropMask";
  import { mapState, mapMutations } from "vuex";
  import Vec from "@/libs/Vec";
  import Image from "@/model/Image";

  export default {
    setup() {
      const imageHere = ref(null);
      return { imageHere };
    },

    components: {
      CropMask,
    },

    data() {
      return {
        ready: false,
      }
    },

    computed: {
      ...mapState(["image"]),
    },

    mounted() {
      this.$nextTick(() => {
        this.ready = true;
      });

      this.$refs.imageHere.appendChild( this.image.el );
    },
  }
</script>

<template>
  <div class="edit-area">

    <div class="image-container" v-show="image">
      <!-- crop mask -->
      <CropMask v-if="ready" />

      <div
        ref="imageHere"
        :class="['image-here', 'dimension-' + image?.dimension ]"
      />
    </div>
  </div>
</template>


<style>
/**
Main Content
 */

.main-content {
  width: 100%;
  height: calc(100vh - 80px);
  position: relative;
  overflow: hidden;

  display: flex;
}

.edit-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #AAA;
}

.setting-area {
  width: 300px;
  border-top: 1px solid #EEE;
  background-color: #FFF;
}

.main-content .image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-here {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.image-here.dimension-x img {
  width: 80%;
  max-width: 80%;
}

.image-here.dimension-y img {
  height: 90%;
  max-height: 90%;
}
 </style>
