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
            title
          }
        }
      }
    }
  `)

  // programatically create all the product view pages for each product
  pages.data.allShopifyProduct.edges.forEach((edge, i) => {
    createPage({
      path: `/en/Catalog/${edge.node.handle}/${edge.node.id.replace('Shopify__Product__', '')}`,
      component: path.resolve('./src/templates/ProductView.js'),
      context: {
        id: edge.node.id
      },
    })
  })

  // programatically create pages for 360 view
  pages.data.allShopifyProduct.edges.forEach(edge => {
    createPage({
      path: `/en/Catalog/${edge.node.handle}/${edge.node.id.replace('Shopify__Product__', '')}/360-view`,
      component: path.resolve('./src/templates/View360.js'),
      context: {
        id: edge.node.id
      },
    })
  })
};

