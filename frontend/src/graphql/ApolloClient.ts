import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000', // URL of the GraphQL server
  cache: new InMemoryCache(),
});

export default client;
