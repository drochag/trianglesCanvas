import React from "react";
import Link from "gatsby-link";

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: "#2d2d2d",
      marginBottom: "1.45rem",
      color: "#f67d02"
    }}
  >
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "1.45rem 1.0875rem"
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: "#f67d02",
            textDecoration: "none"
          }}
        >
          {siteTitle}
          <a
            target="_blank"
            href="https://github.com/DanMMX/trianglesCanvas"
            style={{ color: "#f67d02", marginLeft: "1em" }}
          >
            <i className="fab fa-github" />
          </a>
          <a
            target="_blank"
            href="https://www.npmjs.com/package/triangles-canvas"
            style={{ color: "#f67d02", marginLeft: "1em" }}
          >
            <i className="fab fa-npm" />
          </a>
        </Link>
      </h1>
    </div>
  </div>
);

export default Header;
