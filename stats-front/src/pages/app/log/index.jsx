import { CircularProgress } from "@material-ui/core"
import { Navigate } from "react-router-dom"
import useFetch from "use-http"
import LogIn from "./LogIn"

const Log = () => {
    // const { loading, error, data = {} } = useFetch(`http://localhost:30001//verify-authentication`, [])

    // if (loading) return <CircularProgress sizePreset='xl' />
    // if (error) {
    //     console.log(error)
    //     if (error.name !== '401') return error.toString()
        return <LogIn />
    // }

    // if (data.isLoggedIn) {
    //       return <Navigate to='/app' />
    //   }
}

export default Log
