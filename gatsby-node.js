const path = require('path')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postitPostTemplate = path.resolve(`src/templates/postit-post.js`)
  const result = await graphql(`
  { allPostitPost(
    sort: { order: DESC, fields: [createdAt] }
    limit: 1000
  )   {
edges {
  node {
    id
    content_html
    title
    slug
    createdAt(formatString: "YYYY/MM/DD")
  }
}
}
}
`)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // create page for each slug from _all_ query
  result.data.allPostitPost.edges.forEach(({ node }) => {
    const date = new Date(node.createdAt)
    createPage({
      path: `${node.createdAt}/${node.slug}`,
      component: postitPostTemplate,
      context: { slug: node.slug }, // additional data can be passed via context
    })
  })
}