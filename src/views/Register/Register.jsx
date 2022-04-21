import './Register.css'
import InputComponent from '../../components/ImputComponent'
import { register } from '../../services/UserService'

const Register = () => {
    return (
        <div className="container">
            <h1>Register</h1>
            <form>
                <InputComponent
                    label="Name of the company"
                    id="bussinesName"
                    register={register}
                    //error={backErrors?.email || errors.email?.message}
                    type="bussinesName"
                />
                <InputComponent
                    label="Email"
                    id="email"
                    register={register}
                    //error={backErrors?.email || errors.email?.message}
                    type="email"
                />
                <InputComponent
                    label="Password"
                    id="password"
                    register={register}
                    //error={backErrors?.password || errors.password?.message}
                    type="password"
                />
                <InputComponent
                    label="Address"
                    id="address"
                    register={register}
                    //error={backErrors?.password || errors.password?.message}
                    type="name"
                    InputComponent={
                        <InputComponent
                            label="Street"
                            id="address"
                            register={register}
                            //error={backErrors?.password || errors.password?.message}
                            type="street"
                        />}
                />


                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Register