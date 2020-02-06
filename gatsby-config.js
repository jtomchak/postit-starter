
module.exports = {
  siteMetadata: {
    title: process.env.title,
    description: `Default starter for getting your postit going.`,
    author: `@jtomchak`,
    siteUrl: `https://${process.env.username}.postit.blog`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        // Accepts all options defined by `gatsby-plugin-postcss` plugin.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-postit`,
      options: {
        userName: 'jtomchak'
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
        feeds: [
          {
            serialize: ({ query: { site, allPostitPost } }) => {
              return allPostitPost.edges.map(edge => {
                return Object.assign({}, {
                  date: edge.node.publishedAt,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug,
                  custom_elements: [{ "content:encoded": edge.node.content_html }],
                })
              })
            },
            query: `
                {
                  allPostitPost(
                    sort: { order: DESC, fields: [publishedAt] }
                    limit: 1000
                  )  {
                    edges {
                      node {
                        id
                        content_html
                        slug
                        publishedAt(formatString: "YYYY/MM/DD")
                      }
                    }
                  }
                }
              `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
          }]
      },
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
