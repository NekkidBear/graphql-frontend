import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import CustomerAccountSummary from './components/CustomerSummary';

// GraphQL endpoint
const httpLink = new HttpLink({
  uri: 'http://localhost:5001/graphql'
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
        <CustomerAccountSummary username="lejoshua" />
      </div>
    </ApolloProvider>
  );
};

export default App;