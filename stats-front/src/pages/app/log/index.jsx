import { CircularProgress } from "@material-ui/core"
import { Navigate } from "react-router-dom"
import { useLocalStorage } from "react-use"
import useFetch from "use-http"
import LogIn from "./LogIn"

const Log = () => {
    const [token] = useLocalStorage('accessToken')

    const { loading, error, data = {} } = useFetch(`http://localhost:3001/verify-authentication`, { headers: { Authorization: `Bearer ${token}` }, cachePolicy: 'cache-and-network' }, [])
    if (loading) return <CircularProgress sizePreset='xl' />
    console.log(data)
    console.log(error)
    if (data.code) {
        if (data.code !== 401) return error.toString()
        return <LogIn />
    }

    if (data.isLoggedIn) {
          return <Navigate to='/app' />
      }
}

export default Log
