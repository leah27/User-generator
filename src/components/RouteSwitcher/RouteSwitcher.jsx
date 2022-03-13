import { Route, Routes } from "react-router-dom";
import Users from "../../pages/Users/Users";
import User from "../../pages/User/User";
import Index from "../../pages/Index/Index";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const RouteSwitcher = ({data}) => {
    return (
        <Routes>
            <Route path="/" element={<Index data={data} />} />
            <Route path="/users" element={<Users data={data} />} />
            <Route path="/user/:username" element={<User />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default RouteSwitcher