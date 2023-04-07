import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../components/ui/Error";
import { useLoginMutation } from "../../features/auth/authApi";

export default function AdminLogin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [login, { data, isLoading, error: responseError }] =
        useLoginMutation();

    const navigate = useNavigate();

    useEffect(() => {
        const validRole =data==undefined? true: data?.user?.role=='admin';
        console.log(validRole);
        if(!validRole){
            setError('email or password does not match');
        } else {
            setError('')
        }
        if (responseError?.data) {
            setError(responseError.data);
        }
        if (validRole && data?.accessToken && data?.user) {
            // console.log("logged in");
            navigate("/admin/dashboard")
        }
    }, [data, responseError, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        login({
            email,
            password,
        });
    };


    return (
        <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
            <div>
                <img className="h-12 mx-auto" src="../assets/image/learningportal.svg" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                    Sign in to Admin Account
                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" className="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" value={email} autocomplete="email" required onChange={(e)=> setEmail(e.target.value)}
                            className="login-input rounded-t-md" placeholder="Email address" />
                    </div>
                    <div>
                        <label for="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" value={password} autocomplete="current-password" required onChange={(e)=> setPassword(e.target.value)}
                            className="login-input rounded-b-md" placeholder="Password" />
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <div className="text-sm">
                        <a href="#" className="font-medium text-violet-600 hover:text-violet-500">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                        Sign in
                    </button>
                </div>
                {responseError !== "" && <Error message={error} />}
            </form>
        </div>
    </section>
    )
}