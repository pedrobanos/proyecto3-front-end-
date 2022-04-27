import axios from "axios";

const carHttp = axios.create({
    baseURL: 'https://www.carqueryapi.com/api/0.3'
})

carHttp.interceptors.response.use((response) => response.data);



export default carHttp

