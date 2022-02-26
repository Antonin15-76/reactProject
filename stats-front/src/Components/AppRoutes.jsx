import { Route, Routes } from "react-router-dom"
import Home from "../pages"
import Pilotes from "../pages/app/pilotes"

const AppRoutes = () => {
    return (
        <Routes>
            {/* <Route path='/' element={<Home />} /> */}
            <Route path='pilotes/*' element={<Pilotes />} />
        </Routes>
    )
}

export default AppRoutes