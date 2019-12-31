import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from '@emotion/styled';
import tw from 'tailwind.macro';

const BlogPosts = tw.div`
w-full
`;
const PostContainer = styled.div`
  ${tw`leading-loose tracking-tight`}
  padding-bottom: 20px;
  ol, ul {
    margin-left: 0;
    padding-left: 40px;
  }
  li {
    ${tw`list-disc`}
  }
`;

export default function Template({
  data, // this prop will be injected by the GraphQL query we'll write in a bit
}) {
  const { title, content_html, createdAt } = data.postitPost;
  return (
    <Layout>
      <SEO title={title} />
      <BlogPosts>
        <Helmet title={`Post it - ${title}`} />
        <PostContainer>
          {title && <h1>{title}</h1>}
          <div className="postit-content"
            dangerouslySetInnerHTML={{ __html: content_html }} />
        </PostContainer>
      </BlogPosts>
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