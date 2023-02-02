import carHttp from "./CarBrandService";


export const getMakes = () => carHttp.get(`?cmd=getMakes&year=2021`)

export const getModels = (make) => carHttp.get(`?cmd=getModels&make=${make}`)

export const getModel = (model) => carHttp.get(`?&cmd=getModel&model=${model}`)
