/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import tw from "twin.macro";

import Header from "./header";
import { Helmet } from "react-helmet";
// import "./layout.css"
const PageContainer = tw.div` font-sans leading-normal tracking-normal`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Helmet>
        <link rel="authorization_endpoint" href="https://postit.blog/indieweb/auth" />
        <link rel="token_endpoint" href="https://postit.blog/indieweb/token" />
        <link rel="micropub" href="https://postit.blog/micropub" />
      </Helmet>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <PageContainer>
          <main>{children}</main>
        </PageContainer>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://postit.blog">Post It Blog</a>
        </footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
