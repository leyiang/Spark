<script>
  import Image from "@/model/Image";
  import { dragFile } from "@/utils/helpers";
  import { mapMutations } from "vuex";

  export default {
    data() {
      return {
        images: [],
      }
    },

    mounted() {
      this.handleDrag();
      this.listen();
    },

    methods: {
      ...mapMutations('edit', ["updateImage"]),

      listen() {
        this.$refs.fileInput.addEventListener("input", (e) => {
          this.uploadImage( e.target.files[0] );
        });
      },

      uploadImage( image ) {

        const data = new FormData();
        data.append("file", image );

        const src = URL.createObjectURL( image );

        this.$api.post("/image/upload", data ).then( ({data}) => {
          this.$loadImage( src ).then( image => {
            this.updateImage( new Image(data.data.id, image) );
            this.$router.push("/edit");
          });
        });
      },

      handleDrag() {
        dragFile( this.$refs.uploader, event => {
          this.uploadImage( event.dataTransfer.files[0] );
        });
      },

      transferClick() {
        this.$refs.fileInput.click();
      },
    }
  }
</script>

<template>
  <section class="image-selector">
    <input type="file" name="file_uploader" class="none" ref="fileInput">

    <div class="image-uploader" ref="uploader" @click="transferClick">
      <svg viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M69.3375 35.9766C66.9008 23.6141 56.0433 14.3333 43 14.3333C32.6442 14.3333 23.65 20.2099 19.1708 28.8099C8.385 29.9566 0 39.0941 0 50.1666C0 62.0274 9.63917 71.6666 21.5 71.6666H68.0833C77.9733 71.6666 86 63.6399 86 53.7499C86 44.2899 78.6542 36.6216 69.3375 35.9766ZM50.1667 46.5832V60.9166H35.8333V46.5832H25.0833L43 28.6666L60.9167 46.5832H50.1667Z" />
      </svg>

      <span class="bold">Drag and drop or click to upload</span>
      <span class="secondary">jpg / jpeg / png</span>
    </div>
  </section>
</template>

<style>
/**
Upload
 */
.image-selector {
  background-color: #FFF;
  width: 80%;
  border-radius: 20px;
  margin: 6rem auto 0;

  padding: 2rem;
  box-sizing: border-box;
}

.image-uploader {
  width: 100%;
  height: 550px;
  border: 2px dashed #dadada;
  box-sizing: border-box;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  gap: 1rem;

  cursor: pointer;
  transition: all .3s;
}

.image-fetcher {
  margin-top: 2rem;
  position: relative;
  display: flex;
}

.image-fetcher .input {
  background-color: #FFF;
  border: 2px solid #dadada;
  height: 60px;
  padding-left: 2rem;

  flex: 1;
  margin-right: 4rem;

  z-index: 2;
}

.image-fetcher .button {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 140px;
  background-color: #DFDFDF;
  box-sizing: border-box;
  padding-left: 4.5rem;
  border-radius: 10rem;
}

.image-fetcher .button:hover {
  background-color: #e5e5e5;
}

.image-fetcher .button img {
  height: 80%;
}

.image-fetcher .input::placeholder {
  color: #A8A8A8;
}

.image-uploader.is-dragover {
  border-width: 4px;
}

.image-uploader svg {
  width: 100px;
  transition: all .3s;
}

.image-uploader svg path {
  fill: currentColor;
}

.image-uploader.is-dragover svg {
  color: #5562ff;
  width: 200px;
}

.image-uploader > * {
  pointer-events: none;
}
</style>
