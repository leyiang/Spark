<script>
import IconButton from "@/components/IconButton";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    IconButton
  },

  computed: {
    ...mapState('page', ['image']),
  },

  methods: {
    ...mapMutations('page', ["updateImage"]),

    removeImage() {
      this.$api.delete("/image/" + this.image.active.id ).then( ({data}) => {
        const { list, active } = this.image;
        list.splice( list.indexOf( active ) , 1 );
        this.closeDetail();
      });
    },

    closeDetail() {
      this.updateImage({
        type: "active",
        value: null
      });
    }
  },
}
</script>

<template>
  <div
    class="detail-mask"
    v-if="image.active"
    @click="closeDetail"
  ></div>

  <div
    class="detail-stage white"
    v-if="image.active"
  >
    <div
      class="detail-image"
    >
      <img
        draggable="false"
        class="fit"
        :src="image.active.path"
        alt=""
      >
    </div>

    <div class="detail-control">
      <IconButton
          icon="trash"
          @click.stop="removeImage"
      />

      <IconButton
          icon="edit"
          style="margin-top: auto"
      />

      <IconButton
          icon="rightarrow"
      />
    </div>
  </div>
</template>

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
