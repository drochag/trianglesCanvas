import React, {Component} from 'react'
import Link from 'gatsby-link'
import Triangles from 'triangles-canvas'

class IndexPage extends Component {
  componentDidMount() {
    let redraw;
    (redraw = function () {
      let currentWidth = 0, currentHeight = 0;
      if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        currentWidth = window.innerWidth;
        currentHeight = window.innerHeight;
      } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        currentWidth = document.documentElement.clientWidth;
        currentHeight = document.documentElement.clientHeight;
      } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        currentWidth = document.body.clientWidth;
        currentHeight = document.body.clientHeight;
      }

      currentWidth += 1;
      currentHeight += 1;

      var container = document.getElementById('test')
      container.setAttribute('style', `width: ${currentWidth}px; height:${currentHeight}px;`);
    })();

    if (window.attachEvent) {
      window.attachEvent('onresize', redraw);
    } else if (window.addEventListener) {
      window.addEventListener('resize', redraw, true);
    }

    Triangles({ id: 'test' });
  }
  render() {
    return <div>
      <p>An npm module to have a background with animated triangles using canvas.</p>
      <div id="test" />
    </div>
  }
}

export default IndexPage
