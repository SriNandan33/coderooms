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
    <div class="colors columns" @click="changeStrokeColor">
      <div class="column color red" data-color="red"></div>
      <div class="column color white" data-color="white"></div>
      <div class="column color blue" data-color="blue"></div>
      <div class="column color yellow" data-color="yellow"></div>
      <div class="column color green" data-color="green"></div>
    </div>
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
      currentY: null,
      colorCodes: {
        white: '#fff',
        red: '#f44336',
        green: '#4caf50',
        blue: '#2196f3',
        yellow: '#ffdd57'
      }
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
    },
    changeStrokeColor(event) {
      // eslint-disable-next-line standard/computed-property-even-spacing
      this.currentColor = this.colorCodes[
        event.target.attributes['data-color'].nodeValue
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.drawingboard-container {
  height: 100%;
  position: relative;
  .drawingboard {
    background: inherit;
    cursor: crosshair;
    width: 100%;
    height: 100%;
  }
  .colors {
    position: absolute;
    top: 10px;
    right: 10px;
    border: 3px solid #1f364d;

    .color {
      height: 20px;
      width: 20px;
      cursor: pointer;
    }
    .color.white {
      background-color: white;
    }
    .color.red {
      background-color: #f44336;
    }
    .color.green {
      background-color: #4caf50;
    }
    .color.blue {
      background-color: #2196f3;
    }
    .color.yellow {
      background-color: #ffdd57;
    }
  }
}
</style>
