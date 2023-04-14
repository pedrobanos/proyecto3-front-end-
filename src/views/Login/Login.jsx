/* eslint-disable jsx-a11y/alt-text */

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useState } from 'react';
import { login as loginRequest } from '../../services/AuthService';
import { useAuthContext } from '../../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GARAGEmanagement from '../../assets/GARAGEmanagement2.png'
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
            <div className='logo-login'>
                <img src={GARAGEmanagement}></img>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <div className='passwordImputGroup pb-2'>
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
                    <button className="btn-forget"> Did you forget your password?</button>
                </div>
                <button className={`btn btn-${isSubmitting ? 'secondary' : 'signIn'}`}
                    onChange={handleRememberMeChange}>{isSubmitting ? 'Please wait...' : 'Sign in'}</button>
                <hr className="my-line"></hr>
                <div className='CreateAcount'>
                    <h6 className='mb-4 AccountText'>Do you not have an account?</h6>
                    <Link className='AccountText' to="/register"><p>Sign up</p></Link>
                </div>
            </form>
        </div>
    )
}


export default Login