import createHttp from './BaseService'

const http = createHttp(true)

export const getCurrentGarage = () => http.get('/garages/me')

export const getGarageDetail = (id) => http.get(`/garages/${id}`)