import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: 'https://graphql.contentful.com/content/v1/spaces/k0k2fkm2tlhi',
  headers: {
    authorization: `Bearer j1Tm5eG5-2o9CfhXPqjhITe3RqboWfHNJqMXvjPSZnc`,
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
