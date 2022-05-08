import { useEffect, useState } from "react"
import { getMakes, getModels } from "../../services/RoutesServices"
import React from 'react'
import InputComponent from "../../components/InputComponent"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { register as registerRequest } from '../../services/VehicleServices'
import Spinner from "../../components/Spinner/Spinner"
import { getCarOwner } from "../../services/CarOwnserService"
import './Vehicles.css'
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu"
import CreateCarOwnerComp from "../../components/CreateCarOwnerComp/CreateCarOwnerComp"
import SearchClientComp from "../../components/SearchClientComp/SearchClientComp"
import BackButton from "../../components/BackButton/BackButton"


const schema = yup.object({
    plate: yup.string().required('Plate is required'),
    vin: yup.string().min(17).required('Need a VIN'),
    price: yup.number().positive(),
    make: yup.string().required('Choose a Make'),
    model: yup.string().required('Select a model'),
    vehicleInsurance: yup.string().required('kms is required'),
    carOwner: yup.string().required()
}).required()

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
const Vehicles = () => {
    const { search } = useLocation()
    const urlParams = new URLSearchParams(search);

    const carOwnerInfo = urlParams.get('client')
    const [carOwner, setCarOwner] = useState(null)
    const [makes, setMakes] = useState(null)
    const [models, setModels] = useState(null)
    const [backErrors, setBackErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [carOwnerSearch, setCarOwnerSearch] = useState()
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        //resolver: yupResolver(schema),
        defaultValues: {
            carOwner: carOwnerInfo
        }
    });
    const make = watch('make');
    console.log({make});
    const model = watch('model');
    const navigate = useNavigate()

    console.log(errors)
    
    const onSubmit = data => {
        setBackErrors({})
        setIsSubmitting(true)
        registerRequest(data)
            .then((vehicle) => {
                navigate(`/ors/new?plate=${vehicle.plate}&nif=${carOwner?.nifOrNie}`)
                console.log(vehicle._id); ///
            })
            .catch(err => {
                console.log(err)
                setBackErrors(err?.response?.data?.errors)
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    };

    useEffect(() => {
        carOwnerInfo && getCarOwner(carOwnerInfo)
            .then(carOwner => {
                setCarOwner(carOwner)
            })
    }, [carOwnerInfo])

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
                    console.log('hola');
                    setModels(res.Models)
                })
        }
    }, [make])

    return (
        <div className="Vehicle text-start">
            <h1 className="mt-4 mb-4">ADD CLIENT</h1>
            {carOwner ? (
                <CreateCarOwnerComp
                    getMakeOptions={getMakeOptions}
                    getModelOptions={getModelOptions}
                    getCompanyInsurance={getCompanyInsurance}
                    carOwner={carOwner}
                    onSubmit={onSubmit}
                    backErrors={backErrors}
                    isSubmitting={isSubmitting}
                    makes={makes}
                    models={models}
                    errors={errors}
                    register={register}
                    handleSubmit={handleSubmit}

                />
            ) : (
                <div className='OrContainer'>
                    <SearchClientComp
                        onSubmit={onSubmit}
                        backErrors={backErrors}
                        isSubmitting={isSubmitting}
                        models={models}
                        carOwnerSearch={carOwnerSearch}
                        setCarOwnerSearch={setCarOwnerSearch}
                        getModelOptions={getModelOptions}
                        getMakeOptions={getMakeOptions}
                        getCompanyInsurance={getCompanyInsurance}
                        makes={makes}
                        errors={errors}
                        register={register}
                        handleSubmit={handleSubmit}
                    />
                </div >
            )}
            <BackButton  customRoute={"profile"}/>
            <DropDownMenu />
        </div>
    )
}
export default Vehicles