import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import InputComponent from '../../components/ImputComponent';
import { useState } from 'react';
import { login as loginRequest } from '../../services/AuthService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = yup.object({
    cif: yup.string().required('Cif is a required field').matches(/^([ABCDEFGHJKLMNPQRSUVWabcefghjklmnpqrsuvw])(\d{7})([0-9A-J])$/, 'Invalid cif form'),
    password: yup.string().required('Password is a required field').min(8),
}).required()


const Login = () => {
    const navigate = useNavigate()
    let location = useLocation();

    let from = location.state?.from?.pathname || "/register";

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
                console.log(response);
                console.log(login)
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
            <h2>OHH UN PITO 🍆</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputComponent
                    label="CIF"
                    id="cif"
                    register={register}
                    error={error || errors.cif?.message}
                    type="cif"
                    name="cif"
                />
                <InputComponent
                    label="Password"
                    id="password"
                    register={register}
                    error={error || errors.password?.message}

                    type="password"
                    name="password"
                />

                <button className={`btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>{isSubmitting ? 'Please wait...' : 'Submit'}</button>
            </form>
        </div>
    )
}

export default Login