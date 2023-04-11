import { useSelector } from "react-redux";

export default function useStudentRole() {
    const auth = useSelector((state) => state.auth);
    // console.log(auth)
    if (auth?.accessToken && auth?.user && auth?.user?.role==='student') {
        return true;
    } else {
        return false;
    }
}
