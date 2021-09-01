<script>
import { mapState, mapMutations } from "vuex";
import CropMask from "./CropMask";
import {loadImage} from "@/libs/helpers";
import Image from "@/model/Image";

export default {
    components: {
      CropMask,
    },

    data() {
      return {
        id: null,
        ready: false,
      }
    },

    created() {
      this.id = this.$route.params.id;
      this.fetchData();
    },

    computed: {
      ...mapState('edit', ['image']),
    },

    methods: {
      ...mapMutations('edit', ["updateImage"]),

      fetchData() {
        this.$api.get("/spark/" + this.id ).then( ({data}) => {
          const { src } = data.data;
          loadImage( src ).then( image => {
            this.imageReady( image );
          });
        });
      },

      imageReady( image ) {
        this.update
        this.updateImage( new Image(this.id, image) );
        this.$refs.imageHere.appendChild( image );

        this.$nextTick(() => {
          this.ready = true;
        });
      }
    }
  }
</script>

<template>
  <div class="edit-area">

    <div class="image-container" v-show="image">
      <!-- crop mask -->
      <CropMask v-if="ready" />

      <div
        ref="imageHere"
        :class="['image-here', 'dimension-' + (image ? image.dimension : '') ]"
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

.main-content {
  flex-direction: unset!important;
}
 </style>
