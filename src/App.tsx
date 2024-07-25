import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import CustomerAccountSummary from "./components/CustomerSummary";
import Accounts from "./components/Accounts";
import Customers from "./components/Customers";
import TransactionBuckets from "./components/TransactionBuckets";

// GraphQL endpoint
const httpLink = new HttpLink({
  uri:
    process.env.REACT_APP_GRAPHQL_URL ||
    "https://mason-tanaka-c0244r0vl-nekkidbears-projects.vercel.app/graphql",
  credentials: "include", // This is important for CORS with credentials
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
        <CustomerAccountSummary username="nelsonmaria" />
        <TransactionBuckets />
        <Accounts />
        <Customers />
      </div>
    </ApolloProvider>
  );
};

export default App;
