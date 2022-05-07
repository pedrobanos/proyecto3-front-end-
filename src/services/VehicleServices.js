import createHttp from './BaseService'

const http = createHttp(true)

export const register = (data) => http.post('/vehicles/new', data)

export const listVehicles = () => http.get('/vehicles')

export const updateVehicle = (id, data) => http.patch(`/vehicles/${id}`, data)

export const deleteVehicle = (id) => http.delete(`/vehicles/${id}`)

export const getVehicle =(id) => http.get(`/vehicles/${id}`)

export const searchPlate = (id) => http.post(`/vehicles/search/${id}`)

