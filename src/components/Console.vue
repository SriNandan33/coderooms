<template>
  <div class="console">
    <div class="console__header">Terminal</div>
    <div class="console__body">
      <pre v-if="output" :class="[exitCode? 'exit-1':'exit-0', 'console__body']">{{ output }}</pre>
      <div v-else class="console__empty">Run code to see some output</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    output: {
      type: String,
      default: ''
    },
    exitCode: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.console {
  height: 100%;
  width: 100%;

  .console__header {
    height: 35px;
    border-top: 2px solid #1f364d;
    border-bottom: 2px solid #1f364d;
    padding: 0 10px;
  }
  .console__body {
    background-color: #001528;
    max-height: 85%;
    overflow-y: auto;
  }
  .console__empty {
    padding: 10px;
  }

  .exit-0 {
    color: #03f749;
  }
  .exit-1 {
    color: #ff0000;
  }
}
</style>
