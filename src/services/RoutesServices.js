import carHttp from "./CarBrandService";


export const getMarks = () => carHttp.get('/manufacturers')

export const getModels = (id) => carHttp.get(`/cars/`)