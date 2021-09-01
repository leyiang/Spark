<script>
  export default {
    props: {
      content: {
        type: String,
        default: ""
      },

      type: {
        type: String,
        default: "success",
      }
    },

    created() {
      setTimeout(() => {
        this.$el.remove();
      }, 2000);
    }
  }
</script>

<template>
  <div
    :class="['a-alert', type]"
  >{{ content }}</div>
</template>

<style>
.a-alert {
  padding: .75rem;
  border-radius: 5px;
  border-left: 5px solid #000;
  font-weight: 700;
  transform: translateY(60px);
  animation: slideY .3s forwards;
}

@keyframes slideY {
  to {
    transform: translateY(0);
  }
}

.a-alert.fails {
  color: #e17077;
  background-color: #ffe0e4;
  border-color: #ff4457;
}

.a-alert.info {
  color: #3db5ff;
  background-color: #d6f0ff;
  border-color: #73c7ff;
}

.a-alert.success {
  color: #23ad5f;
  background-color: #c2f3d6;
  border-color: #30d272;
}

.a-alert.warning {
  color: #d18601;
  background-color: #fedb9b;
  border-color: #fea600;
}

.a-alert-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  z-index: 100000005;
  padding: 1rem ;
  box-sizing: border-box;

  display: flex;
  flex-direction: column-reverse;
  gap: .5rem;
  pointer-events: none;
}
</style>
