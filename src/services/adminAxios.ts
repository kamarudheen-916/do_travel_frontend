import axios,{AxiosInstance} from "axios";
import Cookies from "js-cookie";

const adminAxiosInstance :AxiosInstance = axios.create({
    baseURL:'https://dotravel.mobilescart.shop/api'
})

adminAxiosInstance.interceptors.request.use(
    function(config){
        const authTocken = Cookies.get('adminToken')
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

export default adminAxiosInstance