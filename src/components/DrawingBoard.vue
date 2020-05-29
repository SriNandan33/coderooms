<template>
  <div class="drawingboard-container">
    <h3 class="has-text-centered">Drawing Board</h3>
    <canvas
      id="canvas"
      class="drawingboard"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mouseout="onMouseUp"
      @mousemove="onMouseMove"
    ></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      canvasContext: null,
      drawing: false,
      currentColor: 'white',
      currentX: null,
      currentY: null
    }
  },
  mounted() {
    this.canvas = document.getElementById('canvas')
    this.canvas.width = this.canvas.offsetWidth
    this.canvas.height = this.canvas.offsetHeight
    this.canvasContext = this.canvas.getContext('2d')
  },
  methods: {
    onMouseDown(event) {
      this.drawing = true
      this.currentX = event.layerX
      this.currentY = event.layerY
    },
    onMouseUp(event) {
      this.drawing = false
    },
    onMouseMove(event) {
      if (!this.drawing) return
      this.drawLine(this.currentX, this.currentY, event.layerX, event.layerY)
      this.currentX = event.layerX
      this.currentY = event.layerY
    },
    drawLine(x0, y0, x1, y1) {
      this.canvasContext.beginPath()
      this.canvasContext.moveTo(x0, y0)
      this.canvasContext.lineTo(x1, y1)
      this.canvasContext.strokeStyle = this.currentColor
      this.canvasContext.lineWidth = 1.5
      this.canvasContext.stroke()
      this.canvasContext.closePath()
    }
  }
}
</script>

<style lang="scss" scoped>
.drawingboard-container {
  height: 100%;
  .drawingboard {
    background: inherit;
    cursor: crosshair;
    width: 100%;
    height: 100%;
  }
}
</style>
