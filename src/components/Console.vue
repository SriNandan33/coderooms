<template>
  <div class="console">
    <div class="console__header"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.console {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  border-top: 2px solid #1f364d;

  .console__header {
    height: 35px;
    background-color: black;
  }
}
</style>
