import { Navigate } from "react-router-dom";
import useAdminRole from "../hooks/useAdminRole";
import useAuth from "../hooks/useAuth";
import PageNotFound from "../pages/PageNotFound"
export default function PrivateRoute({ children }) {
    const isAdmin = useAdminRole();

    return isAdmin ? children : <PageNotFound/>;
}
