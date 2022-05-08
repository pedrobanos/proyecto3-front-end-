import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu";
import InputComponent from "../../components/InputComponent";
import { useAuthContext } from "../../contexts/AuthContext";
import { getCarOwner, updateCarOwner } from "../../services/CarOwnserService";



const CarOwnersEdit = () => {

        const navigate = useNavigate()
        const [carOwner, setCarOwner] = useState(null)
        const [errors, setErrors] = useState(false)
        const [isSubmitting, setIsSubmitting] = useState(false)
        // const { register, handleSubmit, formState: { errors } } = useForm({
        //     resolver: yupResolver(schema)
        // });
        const { id } = useParams()
        const { getGarage } = useAuthContext()
        const methods = useForm()

        useEffect(() => {
            getCarOwner(id)
              .then(carOwner => {
                setCarOwner(carOwner)
                methods.reset
                ({ name: carOwner.name,
                   email: carOwner.email,
                    nifOrNie: carOwner.nifOrNie,
                    phoneNumber: carOwner.phoneNumber,
                    // address:{
                    //     street: carOwner.address.street,
                    //     city: carOwner.address.city,
                    //     zipCode: carOwner.address.zipCode,
                    //     state: carOwner.address.state,
                    //     country: carOwner.address.country
                    // }             
                })
              })
          }, [])
        
    
    
        const onSubmit = methods.handleSubmit((data)=> { 
            
            const { name, email, nifOrNie, phoneNumber, 
                //street, city, state, zipCode, country 
            } 
                = data
                
            if(!name || !email || !nifOrNie || !phoneNumber 
               // || !street || !city || !state || !zipCode || !country
                ){

                setErrors(true)
                setIsSubmitting(true)
            } else {

                updateCarOwner(carOwner.id, data)
                .then((carOwner) => {
                    getGarage()
                    navigate(`/carowners`)
                    console.log(carOwner._id);
                })
                .catch(err => {
                    setErrors(err?.response?.data?.errors)
                })
                .finally(() => {
                    setIsSubmitting(false)
                 })
            }   
        })
    
        return (
            <FormProvider {...methods}>
            <div className="container">
                <h1 className="mt-4 mb-3">New Client: </h1>
                <form onSubmit={onSubmit}>
                {errors && <div className="alert alert-danger" role="alert">You must include some content!</div>}
                    <InputComponent
                        label="Name"
                        id="name"
                        register={methods.register}
                        type="name"
                        name="name"
                    />
                    <InputComponent
                        label="NIF"
                        id="nifOrNie"
                        register={methods.register}
                        type="nifOrNie"
                        name="nifOrNie"
                    />
                    <InputComponent
                        label="Email"
                        id="email"
                        register={methods.register}
                        type="email"
                        name="email"
                    />
                    <InputComponent
                        label="Calle"
                        id="street"
                        register={methods.register}
                        name="address.street"
                    />
                    <InputComponent
                        label="Ciudad"
                        id="city"
                        register={methods.register}
                        name="address.city"
                    />
                    <InputComponent
                        label="Provincia"
                        id="state"
                        register={methods.register}
                        name="address.state"
                    />
                    <InputComponent
                        label="Código Postal"
                        id="zipCode"
                        register={methods.register}
                        name="address.zipCode"
                    />
                    <InputComponent
                        label="País"
                        id="country"
                        register={methods.register}
                        name="address.country"
                    />
                    <InputComponent
                        label="Phone Number"
                        id="phoneNumber"
                        register={methods.register}
                        name="phoneNumber"
                    />
                    <button className={`btn btn-${isSubmitting ? 'secondary' : 'primary'} mt-3`}>{isSubmitting ? 'Creating company...' : 'Submit'}</button>
                </form>
                <DropDownMenu/>
            </div>
            </FormProvider>
        )
    }

export default CarOwnersEdit