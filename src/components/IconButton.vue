<script>
  export default {
    props: {
      icon: {
        type: String,
        required: true,
      }
    }
  }
</script>


<template>
  <button
    class="button icon-button"
  >
    <img
      :src="require('@/assets/icons/' + icon + '.svg')"
      alt=""
    >
  </button>
</template>

<style>
  .icon-button {
    padding: .5rem;
  }
</style>
