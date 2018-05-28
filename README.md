# Triangles Background Animation using Canvas

## Installation

`npm install trianglescanvas`

## Usage

```

import trianglesCanvas from 'triangles-canvas'

trianglesCanvas({
  id, // the id where the canvas should be drawn
  cb, // a callback to be run when the rendering is done
  dark = 20, // darkest color in rgba
  light = 45, // lightest color in rgba
  darkColor = 'rgba(255, 122, 5, 0.3)', // darkest color to be highlighted when mousemove
  lightColor = 'rgba(246, 90, 90, 0.3)', // lightest color to be highlighted when mousemove
  size = 25, // amount of squares to be drawn on the canvas (in px)
  refreshTime = 50 // time in ms to draw each set of triangles
})

```


### [Demo](https://danmmx.github.io/trianglesCanvas/)