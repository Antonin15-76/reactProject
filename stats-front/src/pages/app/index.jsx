import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Navigate } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import useFetch from 'use-http'
import useClient from '../../Components/hooks/useClient'
import { useLocalStorage } from 'react-use'
import Applayout from '../../Components/menu/Applayout'

const App = () => {
    const [token] = useLocalStorage('accessToken')
    const { data, loading, error } = useFetch('http://localhost:3001/verify-authentication', { headers: { Authorization: `Bearer ${token}` }, cachePolicy: 'cache-and-network' }, [])
    const testClient = useClient(token)
    
    if (loading) return <CircularProgress sizePreset='xl' />
    // if (data.code !== '401') {
    //     return <Navigate to='/error' />
    // } else if (data?.isLoggedIn) {
    //     console.log('connecté')
    // }
    return (
        <ApolloProvider client={testClient}>
            <Applayout />
        </ApolloProvider>
    )
}

export default App
