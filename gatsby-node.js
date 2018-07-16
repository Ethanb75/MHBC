const path = require('path');


exports.createPages = async ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const pages = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `)


  pages.data.allShopifyProduct.edges.forEach(edge => {
    createPage({
      path: `/en/Catalog/${edge.node.handle}/${edge.node.id.replace('Shopify__Product__', '')}`,
      component: path.resolve('./src/templates/ProductView.js'),
      context: {
        id: edge.node.id
      },
    })
  })
};

