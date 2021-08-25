<script>
import IconButton from "@/components/IconButton";
import { mapState, mapMutations } from "vuex";
import {loadImage} from "@/libs/helpers";

export default {
  components: {
    IconButton
  },

  computed: {
    ...mapState('page', ['spark']),
  },

  data() {
    return {
      dimension: null,
    }
  },

  created() {
    console.log( this.spark );
    loadImage( this.spark.active.src ).then( image => {
      this.dimension = image.width > image.height ? "x" : "y";
    });
  },

  methods: {
    ...mapMutations('page', ["updateSpark"]),

    removeSpark() {
      this.$api.delete("/spark/" + this.spark.active.id ).then( ({data}) => {
        const { list, active } = this.spark;
        list.splice( list.indexOf( active ) , 1 );
        this.closeDetail();
      });
    },

    editSpark() {
      return this.$router.push('/edit/' + this.spark.active.id );
    },

    jumpLink() {
      const active = this.spark.active;
      if( active.link ) {
        window.open( "//" + active.link );
      }
    },

    closeDetail() {
      this.updateSpark({
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
    v-if="spark.active"
    @click="closeDetail"
  ></div>

  <div
    class="detail-stage white"
    v-if="spark.active"
  >
    <div
      :class="['detail-image', 'axis-' + dimension]"
    >
      <img
        draggable="false"
        :class="['fit']"
        :src="spark.active.src"
        alt=""
      >
    </div>

    <div class="detail-control"
         @click="closeDetail"
    >
      <IconButton
          icon="trash"
          @click.stop="removeSpark"
      />

      <IconButton
          icon="edit"
          style="margin-top: auto"
          @click.stop="editSpark"
      />

      <IconButton
          icon="rightarrow"
          @click.stop="jumpLink"
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
  box-shadow: 0 0 0 4px rgba(186, 186, 186, 0.5);
}

.detail-image.axis-x {
  width: 80vw;
}

.detail-image.axis-y {
  height: 90vh;
}
</style>
