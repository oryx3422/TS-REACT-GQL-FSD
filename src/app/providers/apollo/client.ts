import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const API_URL =
  process.env.REACT_APP_API_URL ??
  "https://spacex-production.up.railway.app/graphql";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: API_URL,
  }),
  cache: new InMemoryCache(),
});
