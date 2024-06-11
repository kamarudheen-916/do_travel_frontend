import axios,{AxiosInstance} from "axios";

const axiosInstance :AxiosInstance = axios.create({
    baseURL:'https://dotravel.mobilescart.shop/api'
})

axiosInstance.interceptors.request.use(
    function(config){
        const authTocken = localStorage.getItem('token')
        if(authTocken){
            config.headers.Authorization = `Bearer ${authTocken}`
        }
        return config
    },
    function(error){
        // Handle request error
        return Promise.reject(error);
      }
)

export default axiosInstance