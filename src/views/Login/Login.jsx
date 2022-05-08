import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import InputComponent from '../../components/InputComponent';
import { useState } from 'react';
import { login as loginRequest } from '../../services/AuthService';
import { useAuthContext } from '../../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    const [toggle, setToggle] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inputs, setInputs] = useState({
        garageId: "",
        password: "",
        rememberPassword: false,
    });
    const { garageId, password, rememberPassword } = inputs;
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
        <div className="container Login">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row justify-content-center my-5">
                        <div className="col-sm-6 col-md-8 col-lg-8">
                            <div className='text-center mb-4 mt-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                            </div>
                            <div className='cifImputGroup'>
                                <InputComponent className="input-group mb-4"
                                    id="cif1"
                                    register={register}
                                    error={error || errors.cif?.message}
                                    placeholder="Enter your cif"
                                    type="cif"
                                    name="cif"
                                    icon={"fa-solid fa-user"}

                                />
                            </div>
                            <div className='passwordImputGroup'>
                                <InputComponent className="input-group pb-4 mt-4 mb-4"
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

                            <div className=" form-actions form-check mt-4">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="rememberPassword"
                                    name="checkbox"
                                    checked={rememberPassword}
                                    onChange={handleRememberMeChange}
                                />
                                <label className="form-check-label fs-6" htmlFor="rememberPassword">
                                    Remember me
                                </label>
                            </div>
                        </div>
                        <div className='text-center'>
                            <button className={`btn btn-${isSubmitting ? 'secondary' : 'warning'} col-3 col-sm- col-lg-3 rounded-pill mt-4 mb-4`}>{isSubmitting ? 'Please wait...' : 'Login'}</button>
                        </div>
                        <hr className='lineLogin'></hr>
                        <div className='CreateAcount'>
                            <h6 className='mb-4 AccountText'>Don't have an account yet?</h6>
                            <Link className='AccountText' to="/register"><p> Join us.</p>
                            </Link>
                        </div>
                    </div >
                </form>
        </div>
    )
}

export default Login