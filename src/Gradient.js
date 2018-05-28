import distance from '@danmmx/distance-between-points'
import Point from './Point'

export default class Gradient {
  constructor ({ initial, end, width, height, jumps }) {
    this.jumps = jumps
    this.cache = {}

    const widthInTriangles = Math.ceil(width / jumps)
    const heightInTriangles = Math.ceil(height / jumps)
    const radial = Math.round(Math.sqrt(widthInTriangles * widthInTriangles + heightInTriangles * heightInTriangles))

    let colors = []
    let i

    this.center = new Point(widthInTriangles / 2, heightInTriangles / 2 - 1.5)

    // If there are more colors than triangles
    if (radial / 2 + 1 < end - initial) {
      while (radial / 2 + 1 < end - initial) {
        end--
        if (radial / 2 + 1 < end - initial) {
          initial++
        }
      }

      for (i = initial; i < end; i++) {
        colors.push(i)
      }
    // there are more triangles than colors
    } else {
      for (i = initial; i < end; i++) {
        colors.push(i)
      }

      while (colors.length < Math.ceil(radial / 2)) {
        colors.push(colors[Math.floor(Math.random() * 8)])
      }
    }
    colors.sort(function (a, b) { return a - b }).reverse()

    this.colors = colors
  }

  randomGray (x, y) {
    const { jumps, center, colors, cache } = this

    const spaceX = x / jumps
    const spaceY = y / jumps
    const distFromCenter = (cache[x] && cache[x][y]) || Math.floor(distance(center, new Point(spaceX, spaceY)))
    let color = colors[distFromCenter] || colors[colors.length + 1]
    let random = 0

    if (!cache[x]) {
      cache[x] = {}
    }

    if (!cache[x][y]) {
      cache[x][y] = distFromCenter
    }

    if (distFromCenter > colors.length * 0.7) {
      random = Math.ceil(Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1) * 1
    } else if (distFromCenter > colors.length * 0.6) {
      random = Math.ceil(Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1) * 2
    } else if (distFromCenter > colors.length * 0.4) {
      random = Math.ceil(Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1) * 3
    } else if (distFromCenter > colors.length * 0.2) {
      random = Math.ceil(Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1) * 2
    } else {
      random = Math.ceil(Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1) * 1
    }

    color += random

    return `rgb(${[color, color, color].join(',')})`
  }

  setCenter (x, y) {
    this.center = new Point(x / this.jumps, y / this.jumps)
    this.cache = {}
  }
}
