import carHttp from "./CarBrandService";


export const getMakes = () => carHttp.get(`?callback=&cmd=getMakes`)

export const getModels = (make_id) => carHttp.get(`?callback=&cmd=getMakes&make=${make_id}`)