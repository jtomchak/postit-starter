import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Template({
  data, // this prop will be injected by the GraphQL query we'll write in a bit
}) {
  const { title, content_html, createdAt } = data.postitPost;
  return (
    <Layout>
      <SEO title={title} />
      <div className="postit-post-container">
        <Helmet title={`Post it - ${title}`} />
        <div className="post">
          {title && <h1>{title}</h1>}
          <div className="postit-content"
            dangerouslySetInnerHTML={{ __html: content_html }} />
        </div>
      </div>
    </Layout>
  )
}

export const postPageQuery = graphql`
query getPostBySlug($slug: String) {
  postitPost( slug: { eq: $slug }) {
    title
    content_html
    slug
    createdAt(formatString: "MMMM DD, YYYY")
  }
}
`