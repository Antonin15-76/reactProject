import { useLocalStorage } from "react-use"
import CareerHome from "./carrerHome"
import LeagueHome from "./leagueHome"

const Home = () => {
    const [mode] = useLocalStorage('mode')

    if (mode === 'career') {
        return <CareerHome />
    } else {
        return <LeagueHome />
    }
}

export default Home
