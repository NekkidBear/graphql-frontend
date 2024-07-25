import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: 'https://mason-tanaka-c0244r0vl-nekkidbears-projects.vercel.app/graphql'
})

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache: cache,
})

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );
}
