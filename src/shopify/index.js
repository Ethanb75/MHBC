import Client from 'shopify-buy';

const client = Client.buildClient({
  storefrontAccessToken: '0bfe915f2f19b400a1b79bb434028a50',
  domain: 'testMHBC.myshopify.com'
});

export default client;