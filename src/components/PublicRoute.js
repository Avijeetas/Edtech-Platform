import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useStudentRole from "../hooks/useStudentRole";

import PageNotFound from "../pages/PageNotFound"

export default function PublicRoute({ children }) {
    const isLoggedIn = useStudentRole();

    return isLoggedIn? children:<PageNotFound />;
}
