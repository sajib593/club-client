import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";



const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);

                Swal.fire({
                    icon: "success",
                    title: "Login Successful 🎉",
                    text: "Welcome back to Club Sphere!",
                    timer: 1600,
                    showConfirmButton: false
                });

                navigate(location?.state || '/');
            })
            .catch(error => {
                console.log(error);

                Swal.fire({
                    icon: "error",
                    title: "Login Failed ❌",
                    text: error.message
                });
            });
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4">
                <div className="card w-full max-w-md bg-white shadow-xl rounded-2xl">

                    <div className="text-center pt-8">
                        <h3 className="text-3xl font-bold text-indigo-600">
                            Welcome Back
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Login to your account
                        </p>
                    </div>

                    <form
                        className="card-body space-y-4"
                        onSubmit={handleSubmit(handleLogin)}
                    >
                        {/* Email */}
                        <div>
                            <label className="label font-medium">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="input input-bordered w-full focus:border-indigo-500"
                                placeholder="Email address"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">
                                    Email is required
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="label font-medium">Password</label>
                            <input
                                type="password"
                                {...register('password', { required: true, minLength: 6 })}
                                className="input input-bordered w-full focus:border-indigo-500"
                                placeholder="Password"
                            />
                            {errors.password?.type === 'minLength' && (
                                <p className="text-sm text-red-500 mt-1">
                                    Password must be 6 characters or longer
                                </p>
                            )}
                        </div>

                        <div className="text-right">
                            <a className="text-sm text-indigo-500 hover:underline cursor-pointer">
                                Forgot password?
                            </a>
                        </div>

                        <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-2">
                            Login
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            New to Club Sphere?{" "}
                            <Link
                                to="/register"
                                state={location.state}
                                className="text-indigo-600 font-medium hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </form>

                    <div className="px-6 pb-6">
                        <SocialLogin />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Login;