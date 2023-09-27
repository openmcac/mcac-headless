import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
import Welcome from "./welcome"
import Page, { loader as pageLoader } from "./page"

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <div>Oops!</div>,
  },
  {
    path: "/:slug",
    element: <Page />,
    loader: pageLoader(client),
    errorElement: (
      <div className="mx-4 mt-4">
        Oops! Looks like we've lost your page. <Link to="/" className="text-cyan-600 hover:text-cyan-400">Go back</Link>
      </div>
    ),
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
)
