import { useSelector } from "react-redux";

export default function useAdminRole() {
    const auth = useSelector((state) => state.auth);
    // console.log(auth)
    if (auth?.accessToken && auth?.user && auth?.user?.role==='admin') {
        return true;
    } else {
        return false;
    }
}
