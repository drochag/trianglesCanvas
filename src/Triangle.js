import Point from './Point'

export default class Triangle {
  constructor ({ initialPoint, width, gradient, darkColor, lightColor }) {
    this.initialPoint = initialPoint
    this.width = width
    this.gradient = gradient
    this.darkColor = darkColor
    this.lightColor = lightColor
    this.color = gradient.randomGray(initialPoint.x, initialPoint.y)
    this.getPoints()
  }

  getPoints () {
    const { initialPoint, width } = this
    let points = []

    switch (this.type) {
      case 1:
        points.push(initialPoint)
        points.push(new Point(initialPoint.x + width, initialPoint.y))
        points.push(new Point(initialPoint.x, initialPoint.y + width))
        break
      case 2:
        points.push(new Point(initialPoint.x, initialPoint.y + width))
        points.push(new Point(points[0].x + width, points[0].y - width))
        points.push(new Point(points[0].x + width, points[0].y))
        break
      case 3:
        points.push(initialPoint)
        points.push(new Point(initialPoint.x + width, initialPoint.y + width))
        points.push(new Point(initialPoint.x + width, initialPoint.y))
        break
      default:
        points.push(initialPoint)
        points.push(new Point(initialPoint.x, initialPoint.y + width))
        points.push(new Point(initialPoint.x + width, initialPoint.y))
        break
    }

    this.points = points
    return points
  }

  draw (ctx) {
    const { color, points } = this
    ctx.fillStyle = color
    if (color.toString().indexOf('NaN') >= 0) {
      return
    }
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    ctx.lineTo(points[1].x, points[1].y)
    ctx.lineTo(points[2].x, points[2].y)
    ctx.lineTo(points[0].x, points[0].y)
    ctx.closePath()
    ctx.fill()
    return this
  }

  redraw (ctx) {
    const { colored, initialPoint, darkColor, lightColor, width } = this

    this.type = Math.floor(Math.random() * 4)
    let points = this.getPoints()

    if (colored) {
      switch (this.type) {
        case 1:
          points.push(initialPoint)
          points.push(new Point(initialPoint.x + width, initialPoint.y))
          points.push(new Point(initialPoint.x, initialPoint.y + width))
          break
        case 2:
          points.push(new Point(initialPoint.x, initialPoint.y + width))
          points.push(new Point(points[0].x + width, points[0].y - width))
          points.push(new Point(points[0].x + width, points[0].y))
          break
        case 3:
          points.push(initialPoint)
          points.push(new Point(initialPoint.x + width, initialPoint.y + width))
          points.push(new Point(initialPoint.x + width, initialPoint.y))
          break
        default:
          points.push(initialPoint)
          points.push(new Point(initialPoint.x, initialPoint.y + width))
          points.push(new Point(initialPoint.x + width, initialPoint.y))
          break
      }
      this.color = ctx.createLinearGradient(initialPoint.x, initialPoint.y, initialPoint.x + width, initialPoint.y + width)
      this.color.addColorStop(0, darkColor)
      this.color.addColorStop(1, lightColor)
    } else {
      this.color = this.gradient.randomGray(initialPoint.x, initialPoint.y)
    }

    return this.draw(ctx)
  }

  init (ctx) {
    const { initialPoint, gradient } = this
    let types = [1, 2, 3, 4]

    while (types.length > 1) {
      this.type = types.splice(Math.floor(Math.random() * types.length), 1)[0]
      this.color = gradient.randomGray(initialPoint.getX(), initialPoint.getY())
      this.getPoints()
      this.draw(ctx)
    }

    this.color = gradient.randomGray(initialPoint.getX(), initialPoint.getY())
    this.type = types.pop()
    this.getPoints()

    this.draw(ctx)

    return this
  }

  colorRedraw () {
    this.colored = true
    return this
  }

  grayRedraw (ctx) {
    this.colored = false
    this.init(ctx)
    return this.init(ctx)
  }
}
