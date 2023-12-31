import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { onError } from "@apollo/client/link/error";

let client: ApolloClient<any> | null = null

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: 'http://localhost:3000/api/graphql' })

const getClient = () => {
  if (!client || typeof window === 'undefined') {
    client = new ApolloClient({
      link: from([errorLink, httpLink]),
      cache: new InMemoryCache().restore({}),
    })
  }

  return client
}

const browserApolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
})

export { getClient, browserApolloClient }
