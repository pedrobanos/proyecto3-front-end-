import createHttp from './BaseService'

const http = createHttp(true)

export const carOwnersList = () => http.get('/carowners')



