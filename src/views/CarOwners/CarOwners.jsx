import { useState } from "react"
//import { getMakes, getModels } from "../../services/RoutesServices"
import React from 'react'
import InputComponent from "../../components/InputComponent"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { register as registerNewOwner } from '../../services/CarOwnserService'
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu";



const schema = yup.object({
    name: yup.string().required('Please enter a name'),
    nifOrNie: yup.string().required('Nif is a required field').matches(/^(\d{8})([A-Z])$/,'Invalid cif form'),
    email: yup.string().email().required('Email is a required field'),
    address: yup.object({
        street: yup.string().required('Street is a required field'),
        state: yup.string().required('State is a required field'),
        city: yup.string().required('City is a required field'),
        zipCode: yup.string().required('Zip code is a required field').matches(/^\d{5}(?:[- ]?\d{4})?$/,'Invalid zipcode form'),
        country: yup.string().required('Country is a required field')
    }).required(),
    phoneNumber: yup.string().required('Phone number is a required field').matches(/^\+?([6-9]\d{2}|7[1-9]\d{1})\d{6}$/,'Invalid phone form')
}).required()

const CarOwners = () => {

    const navigate = useNavigate()
    const [backErrors, setBackErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = data => { 
         setBackErrors({})
         setIsSubmitting(true)

         registerNewOwner(data)
            .then((carOwner) => {
                navigate(`/vehicles/new?client=${carOwner._id}`)
                console.log(carOwner._id);
            })
            .catch(err => {
                setBackErrors(err?.response?.data?.errors)
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    };

    return (
        <div className="container">
            <h1 className="mt-4 mb-3">New Client: </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputComponent
                    label="Name"
                    id="name"
                    register={register}
                    error={backErrors?.name || errors.name?.message}
                    type="name"
                    name="name"
                />
                <InputComponent
                    label="NIF"
                    id="nifOrNie"
                    register={register}
                    error={backErrors?.nifOrNie || errors.nifOrNie?.message}
                    type="nifOrNie"
                    name="nifOrNie"
                />
                <InputComponent
                    label="Email"
                    id="email"
                    register={register}
                    error={backErrors?.email || errors.email?.message}
                    type="email"
                    name="email"
                />
                <InputComponent
                    label="Calle"
                    id="street"
                    register={register}
                    name="address.street"
                    error={backErrors?.address?.street || errors.address?.street?.message}
                />
                <InputComponent
                    label="Ciudad"
                    id="city"
                    register={register}
                    name="address.city"
                    error={backErrors?.address?.city || errors.address?.city?.message}
                />
                <InputComponent
                    label="Provincia"
                    id="state"
                    register={register}
                    name="address.state"
                    error={backErrors?.address?.state || errors.address?.state?.message}
                />
                <InputComponent
                    label="Código Postal"
                    id="zipCode"
                    register={register}
                    name="address.zipCode"
                    error={backErrors?.address?.zipCode || errors.address?.zipCode?.message}
                />
                <InputComponent
                    label="País"
                    id="country"
                    register={register}
                    name="address.country"
                    error={backErrors?.address?.country || errors.address?.country?.message}
                />
                <InputComponent
                    label="Phone Number"
                    id="phoneNumber"
                    register={register}
                    error={backErrors?.phoneNumber || errors.phoneNumber?.message}
                    name="phoneNumber"
                />
                <button className={`btn btn-${isSubmitting ? 'secondary' : 'primary'} mt-3`}>{isSubmitting ? 'Creating company...' : 'Submit'}</button>
            </form>
            <DropDownMenu/>
        </div>
    )
}

export default CarOwners
