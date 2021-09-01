<script>
import IconButton from "@/components/IconButton";
import { mapState, mapMutations } from "vuex";
import {loadImage} from "@/libs/helpers";

export default {
  components: {
    IconButton
  },

  data() {
    return {
      max: {
        width: window.innerWidth - 200,
        height: window.innerHeight - 100,
      },

      ratio: null,
      dimension: null,
    }
  },

  created() {
    loadImage( this.spark.active.src ).then( image => {
      this.ratio = image.width / image.height;
      this.dimension = image.width > image.height ? "x" : "y";
    });
  },

  computed: {
    ...mapState('page', ['spark']),

    detailStyle() {
      let generator = {
        x: () => {
          let width = this.max.width;
          console.log( width, this.max.width );
          let height = width / this.ratio;
          return [width, height];
        },

        y: () => {
          let height = this.max.height;
          let width = this.max.height * this.ratio;
          return [width, height];
        },
      }

      let width = null, height = null;
      const table = { x: 'y', y: 'x' };

      [ width, height ] = generator[ this.dimension ]();
      if( width > this.max.width || height > this.max.height ) {
        [ width, height ] = generator[ table[ this.dimension ] ]();
        console.log( width, height );
      }

      return {
        width: width + "px",
        height: height + "px",
      }
    }
  },

  methods: {
    ...mapMutations('page', ["updateSpark"]),

    removeSpark() {
      this.$api.delete("/spark/" + this.spark.active.id ).then( ({data}) => {
        const { list, active } = this.spark;
        list.splice( list.indexOf( active ) , 1 );
        this.closeDetail();
        this.$message.success("Removed Successfully");
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
      class='detail-image'
      v-if="ratio"
      :style="detailStyle"
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
