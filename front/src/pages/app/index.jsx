import AppLayout from '../../Components/Applayout'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const App = () => {
     const client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: 'http://localhost:3001/graphql'
    })
    return (
        <ApolloProvider client={client}>
            <AppLayout />
        </ApolloProvider>
    )
}

export default App
