<script>
  import Vec from "@/libs/Vec";
  import handleDrag from "@/libs/Drag";

  const cursorMap = {
    t: "n", l: "w", r: "e", b: "s"
  };

  export default {
    props: {
      image: {
        type: Object,
        default: () => ({})
      }
    },

    data() {
      return {
        crop: {
          pos: new Vec(40, 40),
          size: new Vec(100, 100),
        },

        knobs: [ "tl", "tr", "br", "bl" ]
      }
    },

    methods: {
      handleMove( e ) {
        const origin = this.crop.pos.copy();

        handleDrag( e, ( delta ) => {
          this.crop.pos.set(
              origin.x + delta.x,
              origin.y + delta.y,
          );
        });
      },

      handleResize( knob, e ) {
        const origin = this.crop.size.copy();

        handleDrag( e, (delta) => {
          this.crop.size.set(
              origin.x + delta.x,
              origin.y + delta.y,
          );
        });
      },

      getKnobTransform( knob ) {
        let offset = 5;
        let {pos, size} = this.crop;

        let detail = {
          r: this.knobs.indexOf( knob ) * 90,
          x: /l/.test(knob) ? (pos.x - offset) : (pos.x + size.x + offset),
          y: /t/.test(knob) ? (pos.y - offset) : (pos.y + size.y + offset),
        };

        return `translate(${ detail.x }, ${ detail.y }) rotate(${ detail.r })`;
      },

      getKnobStyle( knob ) {
        return {
          cursor: knob.split('').map(m => cursorMap[m]).join('') + "-resize"
        }
      }
    },

    computed: {
      maskStyle() {
        return {
          width: this.image.width,
          height: this.image.height,
        }
      }
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

    <g
      v-for="knob in knobs"
      :transform="getKnobTransform(knob)"
      :style="getKnobStyle(knob)"

      @mousedown="handleResize(knob, $event)"
    >
      <rect fill="rgba(0,0,0,0)" stroke="none" x="0" y="0" width="20" height="20"></rect>
      <path d="M5,0C2.2,0,0,2.2,0,5v15h6V6h14V0H5z" fill="#fff"></path>
    </g>

<!--    <g transform="translate(245, 45) rotate(90)" style="cursor: nesw-resize;">-->
<!--      <rect fill="rgba(0,0,0,0)" stroke="none" x="0" y="0" width="20" height="20"></rect>-->
<!--      <path d="M5,0C2.2,0,0,2.2,0,5v15h6V6h14V0H5z" fill="#fff"></path>-->
<!--    </g>-->

<!--    <g transform="translate(245, 355) rotate(180)" style="cursor: nwse-resize;">-->
<!--      <rect fill="rgba(0,0,0,0)" stroke="none" x="0" y="0" width="20" height="20"></rect>-->
<!--      <path d="M5,0C2.2,0,0,2.2,0,5v15h6V6h14V0H5z" fill="#fff"></path>-->
<!--    </g>-->

<!--    <g transform="translate(35, 355) rotate(270)" style="cursor: nesw-resize;">-->
<!--      <rect fill="rgba(0,0,0,0)" stroke="none" x="0" y="0" width="20" height="20"></rect>-->
<!--      <path d="M5,0C2.2,0,0,2.2,0,5v15h6V6h14V0H5z" fill="#fff"></path>-->
<!--    </g>-->
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
