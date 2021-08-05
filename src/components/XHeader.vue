<template>
  <header class="site-header flex align-center">
    <button class="button icon-button" @click="$router.push('/')">
      <img src="../assets/icons/home.svg" alt="">
    </button>

    <div class="search-container flex-1">
      <input type="text" class="search input">

      <div :class="['search-mask', suggestion ? '' : 'hide' ]"></div>
      <div :class="['search-suggestion', suggestion ? '' : 'hide' ]">

        <div class="suggestion-group">
          <h4 class="suggestion-title">Recent Searches</h4>
          <div class="search-list">
            <button class="search-item button">header</button>
            <button class="search-item button">footer</button>
          </div>
        </div>

      </div>
    </div>

    <button class="button icon-button" @click="$router.push('/upload')">
      <img src="../assets/icons/add.svg" alt="">
    </button>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        suggestion: false,
      }
    }
  }
</script>

<style>
/* .site-header : height 80px */
.site-header {
  padding: 16px 0;
  background-color: #FFF;
  position: sticky;
  top: 0;

  z-index: 4;
}

.search-container {
  position: relative;
  margin: 0 1rem;
}

.input.search {
  /* Search ICON */
  background-size: 28px 28px;
  background-image: url("../assets/icons/search.svg");
  background-repeat: no-repeat;
  background-position: 15px center;

  padding: 0;
  padding-left: calc( 28px + 15px + 10px );

  height: 48px;
  width: 100%;
}

.search-mask {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 10;

  transition: all .3s;
}

.search-mask.hide {
  opacity: 0;
  visibility: hidden;
}

.search-suggestion {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #FFF;

  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;

  z-index: 15;
  padding: 1rem 2rem 2rem;
  box-sizing: border-box;
}

.search-suggestion.hide {
  opacity: 0;
  visibility: hidden;
}

.suggestion-title {
  margin-bottom: 1rem;
}

.search-list {
  display: flex;
  gap: .5rem;
}

.search-item {
  border-radius: 10rem;
  padding: .5rem 1rem;
  background-color: #EEE;
}

.search-item:hover {
  background-color: #DDD;
}
</style>