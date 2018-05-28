export default class Rectangle {
  constructor ({ width, height, color }) {
    this.width = width
    this.height = height
    this.color = color
  }

  draw (ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(0, 0, this.width, this.height)
  }
}
