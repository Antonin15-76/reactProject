import { useQuery } from "@apollo/client"
import { leagueDrivers } from "./graphQL"
import List from "./List"
import Menu from "./Menu"

const Pilotes = () => {

    const { data, loading, error } = useQuery(leagueDrivers)

    return (
        <>
            <Menu />
            <List data={data} error={error} loading={loading} />
        </>
        
    )
}

export default Pilotes
