import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import TransactionBuckets from "./components/TransactionBuckets";
import Customers from "./components/Customers";
import Accounts from "./components/Accounts";

// GraphQL endpoint
const httpLink = new HttpLink({
  uri: "https://mason-tanaka-c0244r0vl-nekkidbears-projects.vercel.app/graphql",
  credentials: 'include', // This is important for CORS
});

// Error handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Customer Account Summary</h1>
        <Customers />
        <TransactionBuckets />
        <Accounts />
      </div>
    </ApolloProvider>
  );
};

export default App;