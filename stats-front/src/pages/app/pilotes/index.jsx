import { useQuery } from "@apollo/client"
// import { Route, Routes } from "react-router-dom"
import { queryTest } from './graphQL'
import DataGrid from '../../../Components/DataGrid'
const columns = [
    // {
    //     field: 'id',
    //     headerName: 'ID',
    //     flex: 1
    // },
    {
        field: 'name',
        headerName: 'Nom',
        width: 300
    }
]
const Pilotes = () => {
    const { data, loading, error } = useQuery(queryTest)
    console.log(data)
    return (
        <DataGrid
          columns={columns}
          rows={data?.tests || []}
          loading={loading}
          error={error}
       />
       // <Routes>
        //     {/* <Route path='/' element={<HomePagePilotes />} /> */}
        // </Routes>
    )
}

export default Pilotes
