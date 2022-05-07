import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getVehicle, listVehicles, register, searchPlate } from '../../services/VehicleServices';
import InputComponent from '../../components/InputComponent';
import { register as registerNewOr } from '../../services/VehicleServices'
import { Modal, Button } from 'react-bootstrap'
import './Or.css'
import { getCarOwner, searchCarOwner } from '../../services/CarOwnserService';
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu';
import ModalSearch from '../../components/ModalSearch/ModalSearch';



const schema = yup.object({
    //vehicle: yup.
    operation: yup.string("write the operation min 8 char").min(8),
    entryKms: yup.number().positive().required(),
    descriptionProblem: yup.string("Need a brief description min16 char").min(16),
    qty: yup.number().required(),
    price: yup.number().required()

}).required()

const Or = () => {
    const navigate = useNavigate()
    const { search } = useLocation()
    const urlParams = new URLSearchParams(search);
    const vehicleInfo = urlParams.get('vehicle')
    const carOwnerInfo = urlParams.get('client')

    const [vehicleSearch, setVehicleSearch] = useState()

    const [formStep, setFormStep] = useState(0)
    const [backErrors, setBackErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [carOwner, setCarOwner] = useState(null)
    const [vehicle, setVehicle] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            vehicle: vehicleInfo
            //carOwner: carOwnerInfo
        }
    })

    const vehiclePlate = urlParams.get('plate')
    const clientNif = urlParams.get('nif')

    useEffect(() => {
        vehiclePlate && searchPlate(vehiclePlate)
            .then((v) => setVehicle(v)).catch(e => console.log(e))
            clientNif && searchCarOwner(clientNif)
            .then((c) => setCarOwner(c)).catch(e => console.log(e))
    }, [vehiclePlate, clientNif])

    // const completeFormStep = (data) => {
    //     isValid && setFormStep(curr => curr + 1)
    // }

    const onSubmit = data => {
        setBackErrors({})
        setIsSubmitting(true)
        registerNewOr(data)
            .then((ors) => {
                navigate('/profile')
            })
            .catch(err => {
                setBackErrors(err?.response?.data?.errors)
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    };
    return (

        <div className='container'>

            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className='mt-3 mb-3'>NEW OR</h1>
                {!vehicle && !carOwner ? (
                    <div className='OrContainer'>
                        <div className='ClientContainer'>
                            <p>Name: </p>
                            <p>Phone Number: </p>
                        </div>
                        <hr />
                        <div className='VehicleContainer'>
                            <p>Plate: {vehicleSearch?.plate}</p>

                            <ModalSearch setVehicleSearch={setVehicleSearch} />

                            <Link className='mx-3' to={'/vehicles/new'} style={{ textDecoration: 'none' }} >
                                <i style={{ color: 'black' }} className="fa-solid fa-plus"></i>
                            </Link>

                            <hr></hr>
                            <p>VIN: {vehicleSearch?.vin}</p>
                            <p>Make: {vehicleSearch?.make}</p>
                            <p>Model: {vehicleSearch?.model}</p>
                        </div>
                        <p>kms:</p>
                        <p>brief description of the issue:</p>
                        <p>operation:</p>
                    </div >
                ) : (
                    <div>
                        <div className='OrContainer'>
                            <div className='ClientContainer'>
                                <p>Name: {carOwner?.name}</p>
                                <p>Phone Number: {carOwner?.phoneNumber}</p>
                            </div>
                            <hr />
                            <div className='VehicleContainer'>
                                <p>Plate: {vehicle?.plate.toUpperCase()}</p>
                                <p>VIN: {vehicle?.vin.toUpperCase()}</p>
                                <p>Make: {vehicle?.make?.charAt(0).toUpperCase() + vehicle?.make?.slice(1)}</p>
                                <p>Model: {vehicle?.model}</p>
                            </div>
                        </div >
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword"
                                className="col col-form-label"
                            >kms:</label>
                            <div className="col-sm-4">
                                <InputComponent className="input-group"
                                    id="entryKms"
                                    error={backErrors?.entryKms || errors.entryKms?.message}
                                    placeholder="Enter kms"
                                    name="entryKms"
                                    type={'number'}
                                    register={register}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                            >Describe the problem: </label>
                            <textarea className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                style={{ backgroundColor: "white" }}
                            >
                            </textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                            >Operation: </label>
                            <textarea className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                style={{ backgroundColor: "white" }}
                            >
                            </textarea>
                        </div>
                    </div>
                )}
                <button type="submit" className={`mt-4 btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>{isSubmitting ? 'Creating vehicle...' : 'Submit'}</button>
            </form>
            <DropDownMenu/>
        </div>
    )
}


export default Or;


