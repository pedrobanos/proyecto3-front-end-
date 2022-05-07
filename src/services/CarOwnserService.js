import createHttp from './BaseService'

const http = createHttp(true)

export const register = (data) => http.post('/carowners/new', data)

export const listCarOwners = () => http.get('/carowners')

export const getCarOwner =(id) => http.get(`/carowners/${id}`)

export const searchCarOwner = (id) => http.post(`/carowners/search/${id}`)

export const updateCarOwner = (id, data) => http.patch(`/carowners/${id}`, data)

export const deleteCarOwner = (id) => http.delete(`/carowners/${id}`)
