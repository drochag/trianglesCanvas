'use strict'

import debounce from 'lodash.debounce'
import Point from './Point'
import Rectangle from './Rectangle'
import Triangle from './Triangle'
import Gradient from './Gradient'

export default function Triangles ({
  id,
  cb,
  dark = 20,
  light = 45,
  darkColor = 'rgba(255, 122, 5, 0.3)',
  lightColor = 'rgba(246, 90, 90, 0.3)',
  size = 25,
  refreshTime = 50
}) {
  const canvas = document.getElementById(id)
  const container = canvas.parentNode

  let calledCallback = false
  let triangles, ctx, width, height, i, j, gradient, paintInterval

  const paint = function () {
    triangles = {}

    if (paintInterval) {
      clearInterval(paintInterval)
    }

    gradient = new Gradient({ initial: dark, end: light, width, height, jumps: size })

    ctx = canvas.getContext('2d')
    new Rectangle({ width, height, color: `rgb(${[light, light, light].join(',')})` }).draw(ctx)

    for (i = 0; i < width / size + size; i++) {
      triangles[i] = {}
      for (j = 0; j < height / size + size; j++) {
        triangles[i][j] = new Triangle({
          initialPoint: new Point(i * size, j * size),
          width: size,
          gradient,
          darkColor,
          lightColor
        }).init(ctx)
      }
    }

    paintInterval = setInterval(function () {
      for (i = 0; i < width * 0.2 / size; i++) {
        for (j = 0; j < height * 0.2 / size; j++) {
          triangles[Math.floor(Math.random() * width / size)][Math.floor(Math.random() * height / size)].redraw(ctx)
        }
      }
    }, refreshTime)
  }

  const resize = debounce(() => {
    canvas.setAttribute('width', width = container.clientWidth)
    canvas.setAttribute('height', height = container.clientHeight)
    paint()

    if (!calledCallback && typeof cb === 'function') {
      calledCallback = true
      cb()
    }
  }, 100)

  resize()

  canvas.addEventListener('mousemove', function (evt) {
    const rect = canvas.getBoundingClientRect()
    let interval
    let toRedraw = []

    const mousePos = new Point(Math.floor((evt.clientX - rect.left) / size), Math.floor((evt.clientY - rect.top) / size))
    toRedraw.push(triangles[mousePos.x][mousePos.y].colorRedraw())

    if (triangles[mousePos.x + 1] && triangles[mousePos.x + 1][mousePos.y + 1]) {
      toRedraw.push(triangles[mousePos.x + 1][mousePos.y + 1].colorRedraw())
    }

    if (triangles[mousePos.x - 1] && triangles[mousePos.x - 1][mousePos.y + 1]) {
      toRedraw.push(triangles[mousePos.x - 1][mousePos.y + 1].colorRedraw())
    }

    if (triangles[mousePos.x + 1] && triangles[mousePos.x + 1][mousePos.y - 1]) {
      toRedraw.push(triangles[mousePos.x + 1][mousePos.y - 1].colorRedraw())
    }

    if (triangles[mousePos.x - 1] && triangles[mousePos.x - 1][mousePos.y - 1]) {
      toRedraw.push(triangles[mousePos.x - 1][mousePos.y - 1].colorRedraw())
    }

    if (triangles[mousePos.x][mousePos.y + 1]) {
      toRedraw.push(triangles[mousePos.x][mousePos.y + 1].colorRedraw())
    }

    if (triangles[mousePos.x][mousePos.y - 1]) {
      toRedraw.push(triangles[mousePos.x][mousePos.y - 1].colorRedraw())
    }

    if (triangles[mousePos.x][mousePos.y - 1]) {
      toRedraw.push(triangles[mousePos.x][mousePos.y - 1].colorRedraw())
    }

    if (triangles[mousePos.x][mousePos.y + 1]) {
      toRedraw.push(triangles[mousePos.x][mousePos.y + 1].colorRedraw())
    }

    interval = (function () {
      return setInterval(function () {
        toRedraw[Math.floor(Math.random() * toRedraw.length)].redraw(ctx)
      }, 200)
    })()

    setTimeout(function () {
      clearInterval(interval)
      while (toRedraw.length > 0) {
        toRedraw.pop().grayRedraw(ctx)
      }
    }, 1000)
  }, false)

  if (window.attachEvent) {
    window.attachEvent('onresize', resize)
  } else if (window.addEventListener) {
    window.addEventListener('resize', resize, true)
  }
}
