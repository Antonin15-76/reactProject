import { useQuery } from "@apollo/client"
// import { Route, Routes } from "react-router-dom"
import { queryTest } from './graphQL'
import DataGrid from '../../../../Components/DataGrid'
import { Stack } from "@material-ui/core"
import ActionsCell from "./ActionsCell"

const columns = [
    {
        field: 'name',
        headerName: 'Nom',
        flex: 1
    },
    {
        type: 'actions',
        renderCell: (params) => {
          return (
            <Stack justify='center'>
              <ActionsCell {...params} />
            </Stack>
          )
        }
      }
]

const List = (props) => {
    const { data, loading, error } = props
    return (
        <DataGrid
          columns={columns}
          rows={data?.leagues || []}
          loading={loading}
          error={error}
       />
    )
}

export default List
