import httpApi from "./ApiService"

export const register = (data) => httpApi.post('/garages', data)