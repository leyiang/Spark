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
        handleSize: 8,
        knobs: [ "tl", "tr", "br", "bl" ]
      }
    },

    created() {
      this.image.getRenderSize();
      this.crop.pos.set( 20, 20 );
      this.crop.size = this.image.renderSize.copy().sub( new Vec(40, 40) );
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
            let dx = delta.x;

            if( origin.size.x - delta.x <= minSize ) dx = origin.size.x - minSize;
            if( origin.pos.x + delta.x < 0 ) dx = 0 - origin.pos.x;

            this.crop.size.x = origin.size.x - dx;
            this.crop.pos.x = origin.pos.x + dx;
          }

          if( /r/.test(knob) ) {
            let dx = delta.x;

            if( origin.size.x + delta.x <= minSize ) dx = minSize - origin.size.x;
            if( origin.pos.x + origin.size.x + delta.x >this.image.renderSize.x ) dx = this.image.renderSize.x - origin.pos.x - origin.size.x;

            this.crop.size.x = origin.size.x + dx;
          }

          if( /b/.test(knob) ) {
            let dy = delta.y;

            if( origin.pos.y + origin.size.y + delta.y > this.image.renderSize.y ) dy = this.image.renderSize.y - origin.pos.y - origin.size.y;
            if( origin.size.y + delta.y <= minSize ) dy = minSize - origin.size.y;

            this.crop.size.y = origin.size.y + dy;
          }

          if( /t/.test(knob) ) {
            let dy = delta.y;

            if( origin.pos.y + delta.y < 0 ) dy = 0 - origin.pos.y;
            if( origin.size.y - delta.y <= minSize ) dy = origin.size.y - minSize;

            this.crop.size.y = origin.size.y - dy;
            this.crop.pos.y = origin.pos.y + dy;
          }
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
