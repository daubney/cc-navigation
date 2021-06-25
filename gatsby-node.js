/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
// gatsby-node.js
const path = require('path')

exports.createPages = async ({ actions: { createPage }, graphql }) => {
    
    // Create homepage in multiple locales
    const results = await graphql(`
      {  
        allContentfulArticle {
          edges {
            node {
              id
              node_locale
              slug
            }
          }
        }
      }
    `)
    results.data.allContentfulArticle.edges.forEach(edge => {
      const pageTemplate = path.resolve('./src/pages/index.js')
      const prefix =
        edge.node.node_locale.toLowerCase() === 'en-us'
          ? ''
          : edge.node.node_locale.toLowerCase()
        createPage({
        path: prefix + edge.node.slug,
        component: pageTemplate,
        context: {
            slug: edge.node.slug,
            id: edge.node.id,
            nodeLocale: edge.node.node_locale,
        },
        })
    })
  }
