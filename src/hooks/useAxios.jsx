import axios from "axios";




const axiosInstance = axios.create({
    baseURL: 'https://club-spare-server.vercel.app'
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;