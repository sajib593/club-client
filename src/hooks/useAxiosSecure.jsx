import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
// import { getAuth } from "firebase/auth";






// const axiosSecure = axios.create({
//   baseURL: "http://localhost:3000",
// });

// const useAxiosSecure = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // ✅ REQUEST INTERCEPTOR
//     const reqInterceptor = axiosSecure.interceptors.request.use(
//       async (config) => {
//         const auth = getAuth();
//         const user = auth.currentUser;

//         if (user) {
//           const token = await user.getIdToken(); // 🔥 CORRECT WAY
//           config.headers.authorization = `Bearer ${token}`;
//         }

//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     // ✅ RESPONSE INTERCEPTOR
//     const resInterceptor = axiosSecure.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         const status = error.response?.status;

//         if (status === 401 || status === 403) {
//           console.warn("Unauthorized or Forbidden");
//           navigate("/login"); // ❌ don't auto logout
//         }

//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axiosSecure.interceptors.request.eject(reqInterceptor);
//       axiosSecure.interceptors.response.eject(resInterceptor);
//     };
//   }, [navigate]);

//   return axiosSecure;
// };

// export default useAxiosSecure;




const axiosSecure = axios.create({
    baseURL: 'https://club-spare-server.vercel.app'
})

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // intercept request
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })

        // interceptor response
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            // console.log(error);

            const statusCode = error.status;
            if (statusCode === 401 || statusCode === 403) {
                logOut()
                    .then(() => {
                        navigate('/login')
                    })
            }


            return Promise.reject(error);
        })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }

    }, [user, logOut, navigate])

    return axiosSecure;
};

export default useAxiosSecure;