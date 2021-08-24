<script>
  import { mapState, mapMutations } from "vuex";
  import handleDrag from "@/libs/Drag";
  import Vec from "@/libs/Vec";
  import { inRange } from "@/utils/helpers";

  const cursorMap = {
    t: "n", l: "w", r: "e", b: "s"
  };

  export default {
    data() {
      return {
        handleSize: 16,
        knobs: [ "tl", "tr", "br", "bl" ]
      }
    },

    created() {
      this.image.getRenderSize();
      // this.crop.size = this.image.renderSize.copy()
    },

    methods: {
      ...mapMutations('edit', ["updateCrop", "updateImage"]),

      handleMove( e ) {
        const origin = this.crop.pos.copy();

        handleDrag( e, ( delta ) => {
          let bound = new Vec(
              this.image.renderSize.x - this.crop.size.x,
              this.image.renderSize.y - this.crop.size.y,
          );

          this.crop.pos.set(
              inRange( origin.x + delta.x, 0, bound.x ),
              inRange( origin.y + delta.y, 0, bound.y ),
          );
        });
      },

      handleResize( knob, e ) {
        const origin = {
          pos: this.crop.pos.copy(),
          size: this.crop.size.copy()
        };

        let minSize = 20;

        handleDrag( e, (delta) => {
          if( /l/.test(knob) ) {
            if( origin.pos.x + delta.x >= 0 && origin.size.x - delta.x > 20 ) {
              this.crop.size.x = origin.size.x - delta.x;
              this.crop.pos.x = origin.pos.x + delta.x;
            }
          }

          if( /r/.test(knob) ) {
            if( origin.pos.x + origin.size.x + delta.x <= this.image.renderSize.x && origin.size.x + delta.x > 20 ) {
              this.crop.size.x = origin.size.x + delta.x;
            }
          }

          if( /b/.test(knob) ) {
            if( origin.pos.y + origin.size.y + delta.y <= this.image.renderSize.y && origin.size.y + delta.y > 20 ) {
              this.crop.size.y = origin.size.y + delta.y;
            }
          }

          if( /t/.test(knob) ) {
            if( origin.pos.y + delta.y >= 0 && origin.size.y - delta.y > 20) {
              this.crop.size.y = origin.size.y - delta.y;
              this.crop.pos.y = origin.pos.y + delta.y;
            }
          }

          console.log( this.crop );
        });
      },

      getKnobTransform( knob ) {
        let offset = this.handleSize / 2;
        let {pos, size} = this.crop;

        let detail = {
          x: /l/.test(knob) ? (pos.x - offset) : (pos.x + size.x - offset),
          y: /t/.test(knob) ? (pos.y - offset) : (pos.y + size.y - offset),
        };

        return `translate(${ detail.x }, ${ detail.y })`;
      },

      getKnobStyle( knob ) {
        return {
          width: this.handleSize,
          height: this.handleSize,
          rx: 2,
          fill: "#FFF",
          stroke: "none",
          cursor: knob.split('').map(m => cursorMap[m]).join('') + "-resize"
        }
      }
    },

    computed: {
      ...mapState('edit', ["crop", "image"]),

      maskStyle() {
        return {
          width: this.image.renderSize.x,
          height: this.image.renderSize.y,
        }
      },
    }
  }
</script>

<template>
  <svg class="crop-mask" :style="maskStyle">
    <defs>
      <mask id="mask" style="-webkit-mask-size: cover">
        <rect x="0" y="0" width="100%" height="100%" rx="0" ry="0" fill="#fff"></rect>

        <rect
          :x="crop.pos.x"
          :y="crop.pos.y"
          :width="crop.size.x"
          :height="crop.size.y"
          id="hole"
        />
      </mask>
    </defs>

    <rect x="0" y="0"
          width="100%" height="100%"
          fill="rgba(0, 0, 0, 0.7)"
          mask="url(#mask)"
    ></rect>

    <use
        href="#hole"
        fill="rgba(0,0,0,0)"
        stroke="#FFF"
        stroke-width="2px"
        cursor="move"
        @mousedown="handleMove"
    ></use>

    <rect
      v-for="knob in knobs"
      :transform="getKnobTransform(knob)"
      :style="getKnobStyle(knob)"
      @mousedown="handleResize(knob, $event)"
    />
  </svg>
</template>

<style>
.crop-mask {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
