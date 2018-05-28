import React, {Component} from 'react'
import Link from 'gatsby-link'
import Triangles from 'triangles-canvas'

class IndexPage extends Component {
  componentDidMount() {
    Triangles({ id: 'triangles' });
  }

  render() {
    return <div>
      <p>An npm module to have a background with animated triangles using canvas.</p>
      <div id="container" style={{width: 500, height: 200}}>
        <canvas id="triangles" />
      </div>
    </div>
  }
}

export default IndexPage
