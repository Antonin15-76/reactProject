import { useQuery } from "@apollo/client"
import { MenuItem, Select } from "@material-ui/core"
import { allLeagueNumber } from "./graphQL"

const SelectNumber = (props) => {
    const { id, value, onChange } = props

    const { data, loadind, error } = useQuery(allLeagueNumber)
    console.log(data)
    return (
        <Select
        label={id}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        >
            {data?.leagueNumbers?.map(x => {
                return (
                    <MenuItem value={x.number}>{x.number}</MenuItem>
                )
            })}
        </Select>
    )
}

export default SelectNumber
