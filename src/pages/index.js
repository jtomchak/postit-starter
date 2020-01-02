import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import styled from '@emotion/styled';
import tw from 'tailwind.macro';

const BlogPosts = tw.div`
w-full
`;
const PostContainer = styled.div`
  ${tw`leading-relaxed tracking-normal`}
  padding-bottom: 44px;
  ol, ul {
    margin-left: 0;
    padding-left: 40px;
  }
  li {
    ${tw`list-disc`}
  }
  p {
    ${tw`mb-8`}
  }
  em {
    ${tw`text-sm`}
  }
`;


export default function IndexPage({ data }) {
  const { edges: posts } = data.allPostitPost
  return (
    <Layout>
      <SEO title="Home" />
      <BlogPosts>
        {posts
          .map(({ node: post }) => {
            return (
              <PostContainer key={post.id}>
                <Helmet title={`Post it - ${post.title}`} />
                <div className="post">
                  {post.title && <h1>
                    {post.title}
                  </h1>}
                  <div className="postit-content"
                    dangerouslySetInnerHTML={{ __html: post.content_html }} />
                </div>
                <em> <Link to={`/${post.datePath}/${post.slug}`}>{post.createdAt}</Link></em>
              </PostContainer>
            )
          })}
      </BlogPosts>
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
