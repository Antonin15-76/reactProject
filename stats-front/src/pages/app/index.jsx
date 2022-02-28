import AppLayout from '../../Components/Applayout'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Navigate } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import useFetch from 'use-http'
import useClient from '../../Components/hooks/useClient'
import { useLocalStorage } from 'react-use'

const App = () => {
    const [token] = useLocalStorage('accessToken')
    const { data, loading, error } = useFetch('http://localhost:3001/verify-authentication', { headers: { Authorization: `Bearer ${token}` }, cachePolicy: 'cache-and-network' }, [])
    const testClient = useClient(token)
    console.log(data)
    if (loading) return <CircularProgress sizePreset='xl' />
    // if (data.code !== '401') {
    //     return <Navigate to='/error' />
    // } else if (data?.isLoggedIn) {
    //     console.log('connecté')
    // }
    return (
        <ApolloProvider client={testClient}>
            <AppLayout />
        </ApolloProvider>
    )
}

export default App
