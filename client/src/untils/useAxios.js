import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';



const baseURL = 'https://localhost:7231'


const useAxios = () => {
    const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers:{Authorization: `Bearer ${authTokens?.accessToken}`}
    });


    axiosInstance.interceptors.request.use(async req => {
    
        const user = jwt_decode(authTokens.accessToken)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
        if(!isExpired) return req
    
        const response = await axios.post(`${baseURL}/api/Auth/RenewToken/`, {
            accessToken: authTokens.accessToken,
            refreshToken: authTokens.refreshToken
          });
    
        localStorage.setItem('authTokens', JSON.stringify(response.data.data))
        
        setAuthTokens(response.data.data)
        setUser(jwt_decode(response.data.data.accessToken))
        
        req.headers.Authorization = `Bearer ${response.data.data.accessToken}`
        return req
    })
    
    return axiosInstance
}

export default useAxios;