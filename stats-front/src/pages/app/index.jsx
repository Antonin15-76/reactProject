import AppLayout from '../../Components/Applayout'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Navigate } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import useFetch from 'use-http'

const App = () => {
    // const { loading, error, data = {} } = useFetch(`http://localhost:3001/login`, [])
    // console.log(error)
    // if (loading) return <CircularProgress sizePreset='xl' />
    // if (error) {
    //   if (error.name !== '401') return <Navigate to='/error' />
    //   else return <Navigate to='/error?type=login' />
    // }
     const client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: 'http://localhost:3001/graphql'
    })
    // if (data.isLoggedIn) {
    //     console.log('pas connecté')
    // }
    return (
        <ApolloProvider client={client}>
            <AppLayout />
        </ApolloProvider>
    )
}

export default App
