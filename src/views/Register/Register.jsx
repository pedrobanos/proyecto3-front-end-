import './Register.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import InputComponent from '../../components/ImputComponent'
import { register as registerRequest } from '../../services/AuthService'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const schema = yup.object({
    bussinesName: yup.string().required(),
    cif: yup.string().matches(/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    address: yup.object({
        street: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required(),
        zipCode: yup.string().matches(/^\d{5}(?:[- ]?\d{4})?$/).required(),
        country: yup.string().required()
    }).required(),
    phoneNumber: yup.string().matches(/^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/).required(),
    fax: yup.string().matches(/^(\+)?(((((\d+)|(\(\d+\))|(\(\d+\s(\d)\)))(\s|-|\d+))+)|((\d+)|(\(\d+\))$)+)+\d$/),
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
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputComponent
                    label="Name of the company"
                    id="bussinesName"
                    register={register}
                    error={backErrors?.bussinesName || errors.bussinesName?.message}
                    type="bussinesName"
                    name="bussinesName"
                />
                <InputComponent
                    label="CIF"
                    id="cif"
                    register={register}
                    error={backErrors?.cif || errors.cif?.message}
                    type="cif"
                    name="cif"
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
                    label="Password"
                    id="password"
                    register={register}
                    error={backErrors?.password || errors.password?.message}
                    type="password"
                    name="password"
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
                    label="Phone number"
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
                <InputComponent
                    label="Contact Name"
                    id="contactName"
                    register={register}
                    error={backErrors?.contactName || errors.contactName?.message}
                    name="contactName"
                />


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Register