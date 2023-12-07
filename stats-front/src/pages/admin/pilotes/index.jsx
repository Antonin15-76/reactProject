import { useQuery } from "@apollo/client"
import { leagueDrivers } from "./graphQL"
// import List from "./List"
import Menu from "./Menu"

const PiloteLeagues = () => {
    console.log("kdfdk")
    const { data, loading, error } = useQuery(leagueDrivers)

    return (
        <>
        <div>hfjd</div>
            <Menu />
            {/* <List data={data} error={error} loading={loading} />  */}
        </>
        
    )
}

export default PiloteLeagues
