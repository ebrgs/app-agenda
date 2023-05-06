import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import LoginPage from "../pages/Login"
//import RegisterPage from "../pages/SignUp"

const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* <Route path="register" element={<RegisterPage />} /> */}
            <Route path="dashboard" element={<Dashboard />} />
        </Routes>
    )
}

export default RoutesMain