import { Route, Routes } from "react-router-dom"
import Home from "../pages/app/home"
import Pilotes from "../pages/app/pilotes"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='home/*' element={<Home />} />
            <Route path='pilotes/*' element={<Pilotes />} />
        </Routes>
    )
}

export default AppRoutes