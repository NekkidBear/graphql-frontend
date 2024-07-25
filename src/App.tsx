import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Accounts from './components/Accounts';
import Customers from './components/Customers';
import TransactionBuckets from './components/TransactionBuckets';

//GraphQL endpoint
const httpLink = new HttpLink({
  uri: 'http://localhost:5001/graphql'
})

const client = new ApolloClient({
  link: httpLink, // Add your link configuration here
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>GraphQL Data Display</h1>
        <Accounts />
        <Customers />
        <TransactionBuckets />
      </div>
    </ApolloProvider>
  );
};

export default App;