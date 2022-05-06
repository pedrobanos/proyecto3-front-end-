import createHttp from './BaseService'

const http = createHttp(true)

export const register = (data) => http.post('/ors/new', data)

export const listOfOrs = () => http.get('/ors')

export const OrDetails = (id) => http.get(`/ors/${id}`)