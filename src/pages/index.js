import React, { Component } from "react";
import Link from "gatsby-link";
import Triangles from "triangles-canvas";
import SyntaxHighlighter, {
  registerLanguage
} from "react-syntax-highlighter/light";
import js from "react-syntax-highlighter/languages/hljs/javascript";
import docco from "react-syntax-highlighter/styles/hljs/docco";

registerLanguage("javascript", js);

class IndexPage extends Component {
  componentDidMount() {
    Triangles({ id: "triangles" });
    Triangles({ id: "triangles2", dark: 200, light: 220 });
    Triangles({
      id: "triangles3",
      darkColor: "#69bfa5",
      lightColor: "#48796b"
    });
    Triangles({ id: "trianglesSquares", size: 10 });
    Triangles({ id: "trianglesSquares2", size: 40 });
  }

  render() {
    return (
      <div>
        <p>Default values:</p>
        <SyntaxHighlighter style={docco} language="javascript">
          {`npm i triangles-canvas

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
})`}
        </SyntaxHighlighter>
        <br />

        <p>
          An npm module to have a background with animated triangles using
          canvas. Recomputes the gradient while resizing.
        </p>
        <p>Also, move your mouse over it!.</p>
        <SyntaxHighlighter style={docco} language="javascript">
          {`Triangles({ id: 'triangles' })`}
        </SyntaxHighlighter>
        <div style={{ width: "100%", height: 400 }}>
          <canvas id="triangles" />
        </div>
        <br />

        <p>You can specify the size of the squares.</p>
        <SyntaxHighlighter style={docco} language="javascript">
          {`Triangles({ id: 'trianglesSquares', size: 10 })
Triangles({ id: 'trianglesSquares2', size: 40 })`}
        </SyntaxHighlighter>
        <div style={{ width: "100%", height: 400 }}>
          <canvas id="trianglesSquares" />
        </div>
        <div style={{ width: "100%", height: 400 }}>
          <canvas id="trianglesSquares2" />
        </div>
        <br />

        <p>
          You can specify starting color or ending color for the background.
        </p>
        <SyntaxHighlighter style={docco} language="javascript">
          {`Triangles({ id: 'triangles2', dark: 200, light: 220 })`}
        </SyntaxHighlighter>
        <div style={{ width: "100%", height: 400 }}>
          <canvas id="triangles2" />
        </div>
        <br />

        <p>Or change the highlighted color.</p>
        <SyntaxHighlighter style={docco} language="javascript">
          {`Triangles({ id: 'triangles3', darkColor: '#69bfa5', lightColor: '#48796b' })`}
        </SyntaxHighlighter>
        <div style={{ width: "100%", height: 400 }}>
          <canvas id="triangles3" />
        </div>
      </div>
    );
  }
}

export default IndexPage;
