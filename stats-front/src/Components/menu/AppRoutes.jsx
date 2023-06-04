import { Route, Routes } from "react-router-dom"
import Admin from "../../pages/admin"
import Home from "../../pages/app/home"
import Pilotes from "../../pages/app/league/driver/f1/pilote"
import Calendar from "../../pages/admin/calendar"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='home/*' element={<Home />} />
            <Route path='league/driver/f1/pilote/*' element={<Pilotes />} />
            <Route path='career/calendar/*' element={<Calendar />} />
            <Route path='admin/*' element={<Admin />} />
        </Routes>
    )
}

export default AppRoutes