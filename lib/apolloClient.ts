import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = ({
  uri: process.env.NEXT_PUBLIC_GRAPHCMS_URL,
  cache: new InMemoryCache(),
});

export default client;