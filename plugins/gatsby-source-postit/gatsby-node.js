const fetch = require('node-fetch')
const queryString = require('query-string')

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest }, configOptions
) => {
  const { createNode } = actions;
  // Gatsby adds a configOption that's not needed....yet
  const { plugins, ...config } = configOptions;
  // Convert the options object into a query string
  // const apiOptions = queryString.stringify(config);
  const processPost = post => {
    const nodeId = createNodeId(`postit-post-${post.createdAt}`)
    const nodeContent = JSON.stringify(post)
    const nodeData = Object.assign({}, post, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `PostitPost`,
        content: nodeContent,
        contentDigest: createContentDigest(post)
      },
    })
    return nodeData
  }
  const { userName } = config;
  const apiUrl = `https://postit.blog/api/v1/users/${userName}/posts`;

  // Gatsby expects sourceNodes to return a promise
  return (fetch(apiUrl).then(res => res.json()).then(data => {
    // For each query result (aka post)
    data.posts.forEach(p => {
      const nodeData = processPost(p);
      // Use Gatsby's createNode helper to create a node from the build node data
      createNode(nodeData)
    })
  }))
}