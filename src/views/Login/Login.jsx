import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import InputComponent from '../../components/ImputComponent';
import { useState } from 'react';
import { login as loginRequest } from '../../services/AuthService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css'

const schema = yup.object({
    cif: yup.string().required('Cif is a required field').matches(/^([ABCDEFGHJKLMNPQRSUVWabcefghjklmnpqrsuvw])(\d{7})([0-9A-J])$/, 'Invalid cif form'),
    password: yup.string().required('Password is a required field').min(8),
}).required()


const Login = () => {
    const navigate = useNavigate()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/profile";

    const { login } = useAuthContext()
    const [error, setError] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = data => {
        setError(undefined)
        setIsSubmitting(true)

        loginRequest(data)
            .then(response => {
                login(response.access_token, () => navigate(from, { replace: true }))
            })
            .catch(err => {
                setError(err?.response?.data?.message)
            })
            .finally(() => setIsSubmitting(false))
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row justify-content-center my-5">
                    <div className="col-6 col-sm-8 col-md-8 col-lg-10">
                        <div className='text-center mb-4'>
                            <img className="logoLogin" src='http://assets.stickpng.com/images/585e4beacb11b227491c3399.png' />
                        </div>
                        <div>
                            <InputComponent classname="input-group mb-2 mt-4"
                                label="CIF"
                                id="cif"
                                register={register}
                                error={error || errors.cif?.message}
                                placeholder="Enter your cif"
                                type="cif"
                                name="cif"
                            />
                        </div>
                        <div>
                            <InputComponent className="input-group mb-2"
                                label="Password"
                                id="password"
                                register={register}
                                error={error || errors.password?.message}
                                placeholder="Password"
                                type="password"
                                name="password"
                            />
                        </div>
                        <h6 className='fs-6 mb-4'>Aqui va el enlace al register</h6>
                        <button className={`btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>{isSubmitting ? 'Please wait...' : 'Submit'}</button>
                    </div >
                </div >
            </form>
        </div>
    )
}

export default Login