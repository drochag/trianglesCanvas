import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "../components/header";
import "./index.css";

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: "description", content: "Sample" },
        { name: "keywords", content: "sample, something" }
      ]}
      link={[
        {
          rel: "stylesheet",
          href: "https://use.fontawesome.com/releases/v5.0.13/css/all.css",
          integrity:
            "sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp",
          crossorigin: "anonymous"
        }
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "0px 1.0875rem 1.45rem",
        paddingTop: 0
      }}
    >
      {children()}
    </div>
    <footer
      style={{
        background: "#2d2d2d",
        padding: 20,
        textAlign: "center"
      }}
    >
      <a
        style={{ color: "#f67d02", textDecoration: "none" }}
        href="http://danrocha.xyz"
      >
        Daniel Rocha <sup>&reg;</sup> 2018
      </a>
    </footer>
  </div>
);

Layout.propTypes = {
  children: PropTypes.func
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
