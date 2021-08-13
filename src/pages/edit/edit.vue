<script>
  import { ref } from "vue";
  import CropMask from "./CropMask";

  export default {
    setup() {
      const imageHere = ref(null);

      return {
        imageHere
      }
    },

    components: {
      CropMask,
    },

    data() {
      return {
        image: null,
        imageReady: false,
        dimension: "x",
      }
    },

    created() {
      this.global.editingURI = "https://img1.baidu.com/it/u=1534343997,3964472585&fm=26&fmt=auto&gp=0.jpg";
      // this.global.editingURI = "https://img2.baidu.com/it/u=2530024688,2423182450&fm=26&fmt=auto&gp=0.jpg";
    },

    mounted() {
      this.$loadImage( this.global.editingURI ).then( image => {
        this.image = image;
        this.imageHere.appendChild( image );
        this.getDimension();

        this.$nextTick(() => {
          setTimeout(() => {
            this.imageReady = true;
          }, 500 );
        });
      });
    },

    methods: {
      getDimension() {
        this.dimension = this.image.width > this.image.height ? "x" : "y";
      }
    }
  }
</script>

<template>
  <div class="edit-area">

    <div class="image-container" v-show="image">
      <!-- crop mask -->
      <CropMask
        v-if="imageReady"
        :image="image"
        :crop="crop"
      />

      <div
        ref="imageHere"
        :class="['image-here', 'dimension-' + dimension ]"
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
