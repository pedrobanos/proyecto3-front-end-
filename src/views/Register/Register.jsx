import './Register.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import InputComponent from '../../components/InputComponent'
import { register as registerRequest } from '../../services/AuthService'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const schema = yup.object({
    bussinesName: yup.string().required('Please enter your company name'),
    cif: yup.string().required('Cif is a required field').matches(/^([ABCDEFGHJKLMNPQRSUVWabcdefghjklmnpqrsuvw])(\d{7})([0-9A-J])$/, 'Invalid cif form'),
    email: yup.string().email().required('Email is a required field'),
    password: yup.string().required('Password is a required field').min(8),
    address: yup.object({
        street: yup.string().required('Street is a required field'),
        state: yup.string().required('State is a required field'),
        city: yup.string().required('City is a required field'),
        zipCode: yup.string().required('Zip code is a required field').matches(/^\d{5}(?:[- ]?\d{4})?$/, 'Invalid zipcode form'),
        country: yup.string().required('Country is a required field')
    }).required(),
    phoneNumber: yup.string().required('Phone number is a required field').matches(/^\+?([6-9]\d{2}|7[1-9]\d{1})\d{6}$/, 'Invalid phone form'),
    fax: yup.string(),
    contactName: yup.string()
}).required()

const Register = () => {

    const navigate = useNavigate()
    const [backErrors, setBackErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


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

    return (
        <div className="container">
            <h1 className='registerTittle'>CREATE ACCOUNT</h1>
            <hr></hr>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className='d-flex justify-content-between'>
                        <div className='col-8'>
                            <InputComponent
                                label="Name of the company"
                                id="bussinesName"
                                register={register}
                                error={backErrors?.bussinesName || errors.bussinesName?.message}
                                type="bussinesName"
                                name="bussinesName"
                            />
                        </div>
                        <div className='col-3'>
                            <InputComponent
                                label="CIF"
                                id="cif"
                                register={register}
                                error={backErrors?.cif || errors.cif?.message}
                                type="cif"
                                name="cif"
                            />
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='col-7'>
                            <InputComponent
                                label="Street"
                                id="street"
                                register={register}
                                name="address.street"
                                error={backErrors?.address?.street || errors.address?.street?.message}
                            />
                        </div>
                        <div className='col-4'>
                            <InputComponent
                                label="City"
                                id="city"
                                register={register}
                                name="address.city"
                                error={backErrors?.address?.city || errors.address?.city?.message}
                            />
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='col-4'>
                            <InputComponent
                                label="State"
                                id="state"
                                register={register}
                                name="address.state"
                                error={backErrors?.address?.state || errors.address?.state?.message}
                            />
                        </div>
                        <div className='col-3'>
                            <InputComponent
                                label="Zip Code"
                                id="zipCode"
                                register={register}
                                name="address.zipCode"
                                error={backErrors?.address?.zipCode || errors.address?.zipCode?.message}
                            />
                        </div>
                        <div className='col-3'>
                            <InputComponent
                                label="Country"
                                id="country"
                                register={register}
                                name="address.country"
                                error={backErrors?.address?.country || errors.address?.country?.message}
                            />
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='col-7'>
                            <InputComponent
                                label="Phone Number"
                                id="phoneNumber"
                                register={register}
                                error={backErrors?.phoneNumber || errors.phoneNumber?.message}
                                name="phoneNumber"
                            />
                        </div>
                        <div className=''>
                            <InputComponent
                                label="Fax"
                                id="fax"
                                register={register}
                                error={backErrors?.fax || errors.fax?.message}
                                name="fax"
                            />
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='col-3'>
                            <InputComponent
                                label="Contact Name"
                                id="contactName"
                                register={register}
                                error={backErrors?.contactName || errors.contactName?.message}
                                name="contactName"
                            />
                        </div>
                        <div className='col-8'>
                            <InputComponent
                                label="Email"
                                id="email"
                                register={register}
                                error={backErrors?.email || errors.email?.message}
                                type="email"
                                name="email"
                            />
                        </div>
                    </div>
                    <div className='col-8 '>
                        <InputComponent
                            label="Password"
                            id="password"
                            register={register}
                            error={backErrors?.password || errors.password?.message}
                            type="new-password"
                            name="password"
                        />
                    </div>
                </div>
                <button className={`btn btn-${isSubmitting ? 'secondary' : 'primary'} mt-2`}>{isSubmitting ? 'Creating company...' : 'Submit'}</button>
            </form>
        </div>
    )
}

export default Register