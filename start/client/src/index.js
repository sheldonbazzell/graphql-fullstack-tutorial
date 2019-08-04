import { ApolloClient } from 'apollo-client';
import { Query, ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from "graphql-tag";
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import Login from './pages/login';
import { resolvers, typeDefs } from './resolvers';
import injectStyles from './styles';

const IS_LOGGED_IN = gql`  query IsUserLoggedIn {
  isLoggedIn @client
}
`
;

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  resolvers,
  typeDefs,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
        authorization: localStorage.getItem('token'),
        'client-name': 'Space Explorer [web]',
        'client-version': '1.0.0',
      },
  }),
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
  },
});

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN}>
      {({ data }) => (data.isLoggedIn ? <Pages /> : <Login />)}
    </Query>
  </ApolloProvider>, document.getElementById('root')
);