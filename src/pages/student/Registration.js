import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../components/ui/Error";
import Success from "../../components/ui/Success";
import { useRegisterMutation } from "../../features/auth/authApi";
import isValidEmail from "../../utils/isValidEmail";

export  default function Registration() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] =useState('student');
    const [msg, setMsg] = useState('')


    const [register, { data, isLoading, error: responseError, isSuccess }] =
        useRegisterMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (responseError?.data) {
            setMsg(responseError.data);
        }
        if (data?.accessToken && data?.user) {

            setMsg('Registration successful, navigate to login page');
    
            setTimeout(()=>{
                navigate("/");
            },1000)
        }
    }, [data, responseError, navigate, isSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setMsg("");

        if(!isValidEmail(confirmPassword) || !isValidEmail(password)){
            setMsg('Invalid Email Address')
        }

        if (confirmPassword !== password) {
            setMsg("Passwords do not match");
        } else {
            register({
                name,
                email,
                password,
                role:role
            });
        }
    };

    return (
        <section className="py-6 bg-primary h-screen grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div>
                    <img className="h-12 mx-auto" src="../assets/image/learningportal.svg" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Create Your New Account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="name" className="sr-only">Name</label>
                            <input id="name" name="name" type="name" autocomplete="name" required value={name} onChange={e=>setName(e.target.value)}
                                className="login-input rounded-t-md" placeholder="Student Name" />
                        </div>
                        <div>
                            <label for="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autocomplete="email" required value={email} onChange={e=>setEmail(e.target.value)}
                                className="login-input " placeholder="Email address" />
                        </div>
                        <div>
                            <label for="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autocomplete="current-password" required value={password} onChange={(e)=>setPassword(e.target.value)}
                                className="login-input" placeholder="Password" />
                        </div>
                        <div>
                            <label for="confirm-password" className="sr-only">Confirm Password</label>
                            <input id="confirm-password" name="confirm-password" type="password"
                                autocomplete="confirm-password" required className="login-input rounded-b-md" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                            Create Account
                        </button>
                    </div>
                    {msg !== ""? isSuccess && <Success message={msg}/>: !isSuccess && <Error message={msg} />}
                </form>
            </div>
        </section>
    )
}