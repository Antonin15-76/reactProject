import { useQuery } from "@apollo/client"
import { MenuItem, Select } from "@material-ui/core"
import { allLeague, allLeagueNumber } from "./graphQL"

const SelectLeague = (props) => {
    const { id, value, onChange } = props

    const { data, loadind, error } = useQuery(allLeague)

    return (
        <Select
        label={id}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        >
            {data?.leagues?.map(x => {
                return (
                    <MenuItem value={x.name}>{x.name}</MenuItem>
                )
            })}
        </Select>
    )
}

export default SelectLeague
