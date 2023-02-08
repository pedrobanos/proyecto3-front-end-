/* eslint-disable jsx-a11y/alt-text */

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useState } from 'react';
import { login as loginRequest } from '../../services/AuthService';
import { useAuthContext } from '../../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GARAGEmanagement from '../../assets/GARAGEmanagement.png'
import InputLogin from '../../components/InputLogin/InputLogin';
import './Login.css'


const schema = yup.object({
    cif: yup.string().required('Cif is a required field').matches(/^([ABCDEFGHJKLMNPQRSUVWabcefghjklmnpqrsuvw])(\d{7})([0-9A-J])$/, 'Invalid cif form'),
    password: yup.string().required('Password is a required field').min(8),
}).required()


const Login = () => {
    const navigate = useNavigate()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/home";

    const { login } = useAuthContext()
    const [error, setError] = useState();
    const [toggle, setToggle] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inputs, setInputs] = useState({
        garageId: "",
        password: "",
        rememberPassword: false,
    });
    const { rememberPassword } = inputs;
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    function handleRememberMeChange(e) {
        setInputs((inputs) => ({ ...inputs, rememberPassword: !inputs.rememberPassword }));
    }

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
    const onToggle = () => {
        setToggle(curr => !curr)
    }


    return (
            <div className="formContainer">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='brand'>
                        <img src={GARAGEmanagement}></img>
                    </div>
                    <div className='cifImputGroup'>
                        <InputLogin className="input-group"
                            id="cif1"
                            register={register}
                            error={error || errors.cif?.message}
                            placeholder="Enter your cif"
                            type="cif"
                            name="cif"
                            icon={"fa-solid fa-user"}
                        />
                    </div>
                    <div className='passwordImputGroup pb-4'>
                        <InputLogin className="input-group"
                            id="password"
                            register={register}
                            onToggle={onToggle}
                            error={error || errors.password?.message}
                            placeholder="Password"
                            type={toggle ? 'text' : 'password'}
                            name="password"
                            icon={"fa-solid fa-lock"}
                            eye={"far fa-eye"}
                        />
                    </div>
                    <div className=" form-actions form-check mb-4">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberPassword"
                            name="checkbox"
                            checked={rememberPassword}
                            onChange={handleRememberMeChange}
                        />
                        <label className="form-check-label fs-6" htmlFor="rememberPassword">
                            Remember me.
                        </label>
                    </div>
                        <div className='text-center'>
                            <button className={`btn btn-${isSubmitting ? 'secondary' : 'warning'} rounded-pill mt-4 mb-4`}
                            onChange={handleRememberMeChange}>{isSubmitting ? 'Please wait...' : 'Login'}</button>
                        </div>
                        <div className='text-center'>
                            <button className="btn btn-warning"> Did you forget your password?</button>
                        </div>
                    <div className='CreateAcount'>
                        <h6 className='mb-4 AccountText'>Do you not have an account?</h6>
                        <Link className='AccountText' to="/register"><p>Sign up</p></Link>
                    </div>
                </form>
            </div>
    )
}


export default Login