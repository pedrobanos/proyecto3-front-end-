import axios from "axios";

const httpApi = axios.create({
    baseURL: 'http://localhost:3001/api'
})

httpApi.interceptors.response.use((response) => response.data);



export default httpApi