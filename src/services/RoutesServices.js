import carHttp from "./CarBrandService";


export const getMakes = () => carHttp.get(`?cmd=getMakes`)

export const getModels = (make) => carHttp.get(`?cmd=getModels&make=${make}`)

export const getModel = (model) => carHttp.get(`?&cmd=getModel&model=${model}`)

