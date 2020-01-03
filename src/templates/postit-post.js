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
  p {
    ${tw`mb-8`}
  }
  em {
    ${tw`text-sm`}
  }
  li {
    ${tw`list-disc`}
  }
  blockquote{
    ${tw`border-l-2 border-grey-light pl-4 italic mt-2 ml-2`}
  }
`;

export default function Template({ data }) {
  const { title, content_html, createdAt } = data.postitPost;
  return (
    <Layout>
      <SEO title={title} />
      <BlogPosts>
        {/* <Helmet title={`Post it - ${title}`} /> */}
        <Helmet title={`Post it -`} />
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