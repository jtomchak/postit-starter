import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export default function IndexPage({ data }) {
  const { edges: posts } = data.allPostitPost
  return (
    <Layout>
      <SEO title="Home" />
      <div className="blog-posts">
        {posts
          .map(({ node: post }) => {
            return (
              <div className="postit-post-container" key={post.id}>
                <Helmet title={`Post it - ${post.title}`} />
                <div className="post">
                  {post.title && <h1>
                    {post.title}
                  </h1>}
                  <div className="postit-content"
                    dangerouslySetInnerHTML={{ __html: post.content_html }} />
                </div>
                <em> <Link to={`/${post.datePath}/${post.slug}`}>{post.createdAt}</Link></em>
              </div>
            )
          })}
      </div>
    </Layout >
  )
}

export const pageQuery = graphql`
  query IndexQuery   { 
    allPostitPost(
    sort: { order: DESC, fields: [createdAt] }
    limit: 1000
  )   {
edges {
  node {
    id
    content_html
    title
    slug
    createdAt(formatString: "MMMM DD YYYY")
    datePath: createdAt(formatString: "YYYY/MM/DD")
  }
}
}
}
`
