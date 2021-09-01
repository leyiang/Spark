<template>
  <div class="content-area">
    <x-header></x-header>
    <router-view :key="$route.fullPath"></router-view>
    <div class="a-alert-container" />
  </div>
</template>

<script>
import "./assets/css/style.css"

export default {
  name: 'App',
}
</script>

<style>
.a-alert-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  z-index: 999;
  padding: 1rem ;
  box-sizing: border-box;

  display: flex;
  flex-direction: column-reverse;
  gap: .5rem;
}
</style>
