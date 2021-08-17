<template>
  <div class="detail-mask" v-show="photo"
       @click="$emit('close')"
  ></div>

  <div class="detail-stage white" v-show="photo">
    <div class="detail-image">
      <img draggable="false" class="fit" :src="photo" alt="">
    </div>

    <div class="detail-control">
      <button class="button icon-button">
        <img src="../assets/icons/trash.svg" alt="">
      </button>

      <button class="button icon-button" style="margin-top: auto;">
        <img src="../assets/icons/crop.svg" alt="" style="width: 70%">
      </button>

      <button class="button icon-button">
        <img src="../assets/icons/rightarrow.svg" alt="">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photo: {
      type: String,
      default: null,
    }
  },
}
</script>

<style>
/**
Detail
 */
.detail-mask {
  position: fixed;
  z-index: 100000001;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(255, 255, 255, .93);
  /*background-color: rgba(0, 0, 0, 0.7);*/
}

.detail-stage {
  position: fixed;
  z-index: 100000002;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
}

.detail-control {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-image {
  border-radius: 20px;
  overflow: hidden;
  user-select: none;

  width: 80vw;
}
</style>
