import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import TransactionBuckets from "./components/TransactionBuckets";
import Customers from "./components/Customers";
import Accounts from "./components/Accounts";


// GraphQL endpoint
const httpLink = new HttpLink({
  uri: "https://mason-tanaka-c0244r0vl-nekkidbears-projects.vercel.app/graphql",
  fetchOptions: {
    model: 'no-cors'
  }
});

const client = new ApolloClient({
  link: httpLink,
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
