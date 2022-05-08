import { useEffect, useState } from "react"
import { getMakes, getModels } from "../../services/RoutesServices"
import React from 'react'
import { FormProvider, useForm } from "react-hook-form"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getVehicle, updateVehicle } from '../../services/VehicleServices'
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu"
import BackButton from "../../components/BackButton/BackButton"
import { useAuthContext } from "../../contexts/AuthContext";
import InputComponent from "../../components/InputComponent";
import { Spinner } from "reactstrap";


const getMakeOptions = (makes) => {
    let options = makes?.map(make => {
        return {
            value: make.make_id,
            label: make.make_display
        }
    });
    return options;
}
const getModelOptions = (models) => {
    let options = models?.map(model => {
        return {
            value: model.model_name,
            label: model.model_name
        }
    });
    return options;
}
const getCompanyInsurance = () => {
    let companyInsurances = ['Mutua Madrileña', 'MMT', 'Mapfre', 'Allianz', 'Reale', 'Linea Directa', 'Qualitas Auto', 'Pelayo', 'Caser Seguros', 'Catalana Occidente', 'AXA']
    let options = companyInsurances.map(companyInsurance => {
        return {
            value: companyInsurance
        }
    });
    return options;
}
const EditVehicleList = () => {
  
    const [vehicle, setVehicle] = useState(null)
    const [makes, setMakes] = useState(null)
    const [models, setModels] = useState(null)
    const [errors, setErrors] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    // const { register, handleSubmit, formState: { errors }, watch } = useForm({
    //     //resolver: yupResolver(schema),
    //     defaultValues: {
    //         carOwner: carOwnerInfo
    //     }
    //});
    const { id } = useParams()
    const { getGarage } = useAuthContext()
    const { watch, ...methods} = useForm()

    const make = watch('make');
    const model = watch('model');
    const navigate = useNavigate()

    useEffect(() => {
        getVehicle(id)
            .then(vehicle => {
                setVehicle(vehicle)
                methods.reset
                    ({
                        plate: vehicle.plate,
                        vin: vehicle.vin,
                        make: vehicle.make,
                        model: vehicle.model,
                        vehicleInsurance: vehicle.vehicleInsurance

                    })
            })
    }, [])

    useEffect(() => {
        if (!makes) {
            getMakes()
                .then(response => {
                    setMakes(response.Makes)
                })
        }
    }, [makes])

    useEffect(() => {
        if (make) {
            getModels(make)
                .then(res => {
                    setModels(res.Models)
                })
        }
    }, [make])

    const onSubmit = methods.handleSubmit((data) => {

        const { plate, vin, make, model, vehicleInsurance } = data

        if (!plate || !vin || !make || !model || !vehicleInsurance) {
            setErrors(true)
            setIsSubmitting(true)
        } else {
            updateVehicle(vehicle.id, data)
                .then((vehicle) => {
                    getGarage()
                    navigate(`/vehicles`)
                })
                .catch(err => {
                    console.log(err)
                    setErrors(err?.response?.data?.errors)
                })
                .finally(() => {
                    setIsSubmitting(false)
                })
        }
    });


    return (
        <div className="Vehicle text-start">
            <h1 className="mt-4 mb-4" id="clientTitle">EDIT VEHICLE</h1>
            <FormProvider {...methods}>
                <form onSubmit={onSubmit}> 
                    <InputComponent className="input-group mt-4"
                        id="plate"
                        placeholder="Enter Plate"
                        name="plate"
                        register={methods.register}
                    />
                    <InputComponent className="input-group mt-4"
                        id="vin"
                        placeholder="Enter VIN"
                        name="vin"
                        register={methods.register}
                    />
                    {!makes ? (
                        <Spinner />
                    ) : (
                        <div>
                            <select
                                className="form-select bg-light mt-4 "
                                arial-label="default input example"
                                {...methods.register('make')}
                            >
                                <option >Choose a Mark</option>
                                {getMakeOptions(makes).map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            {models &&
                                <select
                                    className="form-select bg-light mt-4"
                                    arial-label="model"
                                    {...methods.register('model')}
                                >
                                    <option>Choose a Model</option>
                                    {getModelOptions(models)?.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            }
                        </div>
                    )}
                    <select
                        className="form-select bg-light mt-4"
                        aria-label="Default select example"
                        {...methods.register('vehicleInsurance')}
                    >
                        <option >Select the Car Insurance</option>
                        {getCompanyInsurance().map((option) => (
                            <option key={option.value}
                                value={option.value}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className={`mt-4 btn btn-${isSubmitting ? 'secondary' : 'warning'} rounded-pill mt-4 mb-4`}>{isSubmitting ? 'Creating vehicle...' : 'Submit'}</button>
                </form>
            </FormProvider>
            <BackButton customRoute={"profile"} />
            <DropDownMenu />
        </div>
    )
}
export default EditVehicleList