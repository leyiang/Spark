<script>
  import EditArea from "./edit";
  import SettingPanel from "./setting";

  export default {
    components: {
      EditArea,
      SettingPanel
    }
  }
</script>

<template>
  <div class="outer full-width">
    <main class="main-content">

      <EditArea />
      <SettingPanel />

    </main>
  </div>
</template>
