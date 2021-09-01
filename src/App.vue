<template>
  <div class="content-area">
    <x-header></x-header>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import "./assets/css/style.css"

export default {
  name: 'App',
}
</script>

