import { Route, Routes } from "react-router-dom"
import Admin from "../../pages/admin"
import Home from "../../pages/app/home"
import Pilotes from "../../pages/app/league/driver/f1/pilote"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='home/*' element={<Home />} />
            <Route path='league/driver/f1/pilote/*' element={<Pilotes />} />
            <Route path='admin/*' element={<Admin />} />
        </Routes>
    )
}

export default AppRoutes