import { useEffect, useState } from "react"
import { getMakes, getModels } from "../../services/RoutesServices"
import React from 'react'
import InputComponent from "../../components/ImputComponent"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { register as registerRequest } from '../../services/VehicleServices'
import Spinner from "../../components/Spinner/Spinner"


const schema = yup.object({

    plate: yup.string().required('Plate is required'),
    vin: yup.string().min(17).required('Need a VIN'),
    price: yup.number().positive(),
    make: yup.string().required('Choose a Make'),
    model: yup.string().required('Select a model'),
    vehicleInsurance: yup.string().required('kms is required')
}).required()

const getMakeOptions = (makes) => {
    let options = makes?.map(make => {
        return {
            value: make.make_id,
            label: make.make_display.charAt(0).toUpperCase() + make.make_display.slice(1)
        }
    });
    return options;
}
const getModelOptions = (models) => {
    let options = models?.map(model => {
        return {
            value: model.model_name,
            label: model.model_name.charAt(0).toUpperCase() + model.model_name.slice(1)
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
const Vehicles = () => {
    const [makes, setMakes] = useState(null)
    const [models, setModels] = useState(null)
    const [backErrors, setBackErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema)
    });
    const make = watch('make');
    const model = watch('model');
    const onSubmit = data => {
        setBackErrors({})
        setIsSubmitting(true)
        registerRequest(data)
            .then((vehicles) => {
                navigate('/profile')
            })
            .catch(err => {
                setBackErrors(err?.response?.data?.errors)
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    };
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
    return (
        <div className="Vehicle text-start">
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputComponent className="input-group mt-4"
                    id="plate"
                    error={backErrors?.plate || errors.plate?.message}
                    placeholder="Enter Plate"
                    name="plate"
                    register={register}
                />
                <InputComponent className="input-group mt-4"
                    id="vin"
                    error={backErrors?.vin || errors.vin?.message}
                    placeholder="Enter VIN"
                    name="vin"
                    register={register}
                />
                {!makes ? (
                    <Spinner />
                ) : (
                    <div>
                        <select
                            className="form-select bg-light mt-4 "
                            arial-label="default input example"
                            error={backErrors?.make || errors.make?.message}
                            {...register('make')}
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
                                error={backErrors?.model || errors.plate?.model}
                                {...register('model')}
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
                    {...register('vehicleInsurance')}
                    error={backErrors?.vehicleInsurance || errors.vehicleInsurance?.message}
                >
                    <option >Select the Car Insurance</option>
                    {getCompanyInsurance().map((option) => (
                        <option key={option.value}
                            value={option.value}>
                            {option.value}
                        </option>
                    ))}
                </select>
                <button type="submit" className={`mt-4 btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>{isSubmitting ? 'Creating vehicle...' : 'Submit'}</button>
            </form>
        </div>
    )
}
export default Vehicles