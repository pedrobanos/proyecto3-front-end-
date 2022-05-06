import './Register.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import InputComponent from '../../components/InputComponent'
import { register as registerRequest } from '../../services/AuthService'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from "react"


const schema1 = yup.object({
    cif: yup.string().required('Cif is a required field').matches(/^([ABCDEFGHJKLMNPQRSUVWabcdefghjklmnpqrsuvw])(\d{7})([0-9A-J])$/, 'Invalid cif form'),
    bussinesName: yup.string().required('Please enter your company name'),
    password: yup.string().required('Password is a required field').min(8),
}).required()

const schema2 = yup.object({
    address: yup.object({
        street: yup.string().required('Street is a required field'),
        state: yup.string().required('State is a required field'),
        city: yup.string().required('City is a required field'),
        zipCode: yup.string().required('Zip code is a required field').matches(/^\d{5}(?:[- ]?\d{4})?$/, 'Invalid zipcode form'),
        country: yup.string().required('Country is a required field')
    }).required(),
}).required()

const schema3 = yup.object({
    email: yup.string().email().required('Email is a required field'),
    phoneNumber: yup.string().required('Phone number is a required field').matches(/^\+?([6-9]\d{2}|7[1-9]\d{1})\d{6}$/, 'Invalid phone form'),
    fax: yup.string(),
    contactName: yup.string()
}).required()

const Register = () => {
    const schemas = [schema1, schema2, schema3];
    const navigate = useNavigate()
    const [backErrors, setBackErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formStep, setFormStep] = useState(0)

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schemas[formStep]), mode: "all"
    });

    const completeFormStep = (data) => {
        isValid && setFormStep(curr => curr + 1)
    }

    const onSubmit = data => {
        setBackErrors({})
        setIsSubmitting(true)

        registerRequest(data)
            .then((garage) => {
                navigate('/login')
            })
            .catch(err => {
                setBackErrors(err?.response?.data?.errors)
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    };
    const backButton = () => {
        if (formStep >= 0 && formStep <= 2) {
            setFormStep(curr => curr - 1)
        }
    }

    return (
        <div className="container">
            <h1 className='registerTittle'>CREATE ACCOUNT</h1>
            <hr></hr>
            <form onSubmit={formStep === 2 ? handleSubmit(onSubmit) : handleSubmit(completeFormStep)}>
                {formStep === 0 &&
                    (<section>
                        <InputComponent
                            label="CIF *"
                            id="cif"
                            register={register}
                            error={backErrors?.cif || errors.cif?.message}
                            type="cif"
                            name="cif"
                        />
                        <InputComponent
                            label="Name of the company *"
                            id="bussinesName"
                            register={register}
                            error={backErrors?.bussinesName || errors.bussinesName?.message}
                            type="bussinesName"
                            name="bussinesName"
                        />
                        <InputComponent
                            label="Password *"
                            id="password"
                            register={register}
                            error={backErrors?.password || errors.password?.message}
                            type="new-password"
                            name="password"
                        />
                        <button
                            className="btn btn-secondary btn-sm mt-3"
                            onClick={completeFormStep}
                            type="submit"
                        >
                            Next</button>
                    </section>)}
                {formStep === 1 &&
                    (<section>
                        <InputComponent
                            label="Street *"
                            id="street"
                            register={register}
                            name="address.street"
                            error={backErrors?.address?.street || errors.address?.street?.message}
                        />
                        <InputComponent
                            label="City *"
                            id="city"
                            register={register}
                            name="address.city"
                            error={backErrors?.address?.city || errors.address?.city?.message}
                        />
                        <InputComponent
                            label="State *"
                            id="state"
                            register={register}
                            name="address.state"
                            error={backErrors?.address?.state || errors.address?.state?.message}
                        />
                        <InputComponent
                            label="Zip Code *"
                            id="zipCode"
                            register={register}
                            name="address.zipCode"
                            error={backErrors?.address?.zipCode || errors.address?.zipCode?.message}
                        />
                        <InputComponent
                            label="Country *"
                            id="country"
                            register={register}
                            name="address.country"
                            error={backErrors?.address?.country || errors.address?.country?.message}
                        />
                        <button
                            className="btn btn-secondary mt-3 me-4 mb-4 btn-sm"
                            onClick={backButton}
                            type="button"
                        >
                            Back</button>
                        <button
                            className="btn btn-secondary mt-3 mb-4 btn-sm"
                            onClick={completeFormStep}
                            type="submit"
                        >
                            Next</button>

                    </section>)}
                {formStep === 2 &&
                    (<section>
                        <InputComponent
                            label="Contact Name"
                            id="contactName"
                            register={register}
                            error={backErrors?.contactName || errors.contactName?.message}
                            name="contactName"
                        />
                        <InputComponent
                            label="Email *"
                            id="email"
                            register={register}
                            error={backErrors?.email || errors.email?.message}
                            type="email"
                            name="email"
                        />
                        <InputComponent
                            label="Phone Number *"
                            id="phoneNumber"
                            register={register}
                            error={backErrors?.phoneNumber || errors.phoneNumber?.message}
                            name="phoneNumber"
                        />
                        <InputComponent
                            label="Fax"
                            id="fax"
                            register={register}
                            error={backErrors?.fax || errors.fax?.message}
                            name="fax"
                        />
                        <button
                            className="btn btn-secondary mt-3 me-4 btn-sm"
                            onClick={backButton}
                            type="button"
                        >
                            Back </button>
                        <button onClick={handleSubmit(onSubmit)}
                            className={`btn btn-${isSubmitting ? 'secondary' : 'secondary'} mt-3 btn-sm`}>
                            {isSubmitting ? 'Creating company...' : 'Submit'}
                        </button>
                    </section>)}
            </form>
        </div>
    )
}

export default Register