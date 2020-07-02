<template>
  <div class="drawingboard-container">
    <canvas
      id="canvas"
      class="drawingboard"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mouseout="onMouseUp"
      @mousemove="onMouseMove"
    ></canvas>
    <div class="colors columns" @click="changeStrokeColor">
      <div
        :class="['column', 'color', 'red', currentColor == 'red' ? 'active': '']"
        data-color="red"
      ></div>
      <div
        :class="['column', 'color', 'white', currentColor == 'white' ? 'active': '']"
        data-color="white"
      ></div>
      <div
        :class="['column', 'color', 'blue', currentColor == 'blue' ? 'active': '']"
        data-color="blue"
      ></div>
      <div
        :class="['column', 'color', 'yellow', currentColor == 'yellow' ? 'active': '']"
        data-color="yellow"
      ></div>
      <div
        :class="['column', 'color', 'green', currentColor == 'green' ? 'active': '']"
        data-color="green"
      ></div>
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
      this.drawLine(
        this.currentX,
        this.currentY,
        event.layerX,
        event.layerY,
        this.currentColor
      )
      this.currentX = event.layerX
      this.currentY = event.layerY
    },
    drawLine(x0, y0, x1, y1, color, emit = true) {
      this.canvasContext.beginPath()
      this.canvasContext.moveTo(x0, y0)
      this.canvasContext.lineTo(x1, y1)
      this.canvasContext.strokeStyle = this.colorCodes[color]
      this.canvasContext.lineWidth = 1.5
      this.canvasContext.stroke()
      this.canvasContext.closePath()

      if (emit) {
        const canvasWidth = this.canvas.width
        const canvasHeight = this.canvas.height
        this.$emit('drawing', {
          x0: x0 / canvasWidth,
          y0: y0 / canvasHeight,
          x1: x1 / canvasWidth,
          y1: y1 / canvasHeight,
          color: this.currentColor
        })
      }
    },
    drawingHelper(data) {
      const canvasWidth = this.canvas.width
      const canvasHeight = this.canvas.height
      this.drawLine(
        data.x0 * canvasWidth,
        data.y0 * canvasHeight,
        data.x1 * canvasWidth,
        data.y1 * canvasHeight,
        data.color,
        false
      )
    },
    changeStrokeColor(event) {
      // eslint-disable-next-line standard/computed-property-even-spacing
      this.currentColor = event.target.attributes['data-color'].nodeValue
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
      position: relative;
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
    .color.active::after {
      background: rgba(0, 0, 0, 0.5);
      content: '✔';
      width: 100%;
      height: 100%;
      position: absolute;
      color: white;
      top: 0;
      left: 0;
      text-align: center;
    }
  }
}
</style>
