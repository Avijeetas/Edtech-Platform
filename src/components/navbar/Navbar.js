import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../features/auth/authSlice";
import useAuthCheck from "../../hooks/useAuthCheck";
import useAuth from "../../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/auth/authApi";
import { useEffect } from "react";
import learningImage from "../../components/assets/image/learningportal.svg"
export default function Navbar(){
    const { user } = useSelector((state) =>state.auth) || {};
    const { name, role } = user || {};

    const navigate = useNavigate();
    // // console.log("auth status", auth)
    
    const dispatch = useDispatch();
    const handleLogout = ()=>{
    
        dispatch(userLoggedOut());
        localStorage.clear();
        if(role=='student'){
            navigate("/")
        } else if(role=="admin"){
            navigate("/admin")
        }

    }
    
 
    return (
        <nav className="shadow-md">
            <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
                <img className="h-10" src={learningImage} />
                <div className="flex items-center gap-3">{
                    role==='student' && <> <Link to="/courses">Courses</Link>
                    <Link to="/leaderboard">Leaderboard</Link></>
                }
                {
                    role==='admin' && <Link to="/admin/dashboard">Dashboard</Link>
                }
                    
                    <h2 className="font-bold">{name}</h2>
                    <button onClick={handleLogout}
                       className={`flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan ${role == 'admin' ? 'bg-red-600' : ''}`}>
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}