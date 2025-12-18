import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import SocialLogin from './SocialLogin';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {

        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {

                const formData = new FormData();
                formData.append('image', profileImg);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        };

                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    // console.log('user created in the database');
                                }
                            });

                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        };

                        updateUserProfile(userProfile)
                            .then(() => {

                                Swal.fire({
                                    icon: 'success',
                                    title: 'Registration Successful 🎉',
                                    text: 'Welcome to Club Sphere!',
                                    showConfirmButton: false,
                                    timer: 1800
                                });

                                navigate(location.state || '/');
                            })
                            // .catch(error => console.log(error));
                    });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message
                });
            });
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
                <div className="card w-full max-w-md bg-white shadow-xl rounded-2xl">

                    <div className="text-center pt-8">
                        <h3 className="text-3xl font-bold text-indigo-600">
                            Club Sphere
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Not a member till now? pls Register 
                        </p>
                    </div>

                    <form
                        className="card-body space-y-3"
                        onSubmit={handleSubmit(handleRegistration)}
                    >
                        {/* Name */}
                        <div>
                            <label className="label font-medium">Name</label>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className="input input-bordered w-full focus:border-indigo-500"
                                placeholder="Your Name"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500 mt-1">
                                    Name is required
                                </p>
                            )}
                        </div>

                        {/* Photo */}
                        <div>
                            <label className="label font-medium">Photo</label>
                            <input
                                type="file"
                                {...register('photo', { required: true })}
                                className="file-input file-input-bordered w-full"
                            />
                            {errors.photo && (
                                <p className="text-sm text-red-500 mt-1">
                                    Photo is required
                                </p>
                            )}
                        </div>

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
                                {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                                })}
                                className="input input-bordered w-full focus:border-indigo-500"
                                placeholder="Strong password"
                            />
                            {errors.password?.type === 'required' && (
                                <p className="text-sm text-red-500 mt-1">
                                    Password is required
                                </p>
                            )}
                            {errors.password?.type === 'minLength' && (
                                <p className="text-sm text-red-500 mt-1">
                                    Minimum 6 characters required
                                </p>
                            )}
                            {errors.password?.type === 'pattern' && (
                                <p className="text-sm text-red-500 mt-1">
                                    Must include uppercase, lowercase, number & symbol
                                </p>
                            )}
                        </div>

                        <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-4">
                            Register
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                state={location.state}
                                className="text-indigo-600 font-medium hover:underline"
                            >
                                Login
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

export default Register;