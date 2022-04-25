import carHttp from "./CarBrandService";


export const getMarks = () => carHttp.get('/manufacturers')