import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { searchPlate } from '../../services/VehicleServices';
import InputComponent from '../../components/InputComponent';
import { register as registerNewOr } from '../../services/OrServices'
import './Or.css'
import { searchCarOwner } from '../../services/CarOwnserService';
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu';
import ModalSearch from '../../components/ModalSearch/ModalSearch';
import BackButton from '../../components/BackButton/BackButton';



const schema = yup.object({
    operation: yup.string("write the operation min 8 char").min(8),
    entryKms: yup.number().positive().required(),
    descriptionProblem: yup.string("Need a brief description min16 char").min(16),
    qty: yup.number().required(),
    price: yup.number().required(),
    discount: yup.number()

}).required()

const Or = () => {
    const navigate = useNavigate()
    const { search } = useLocation()
    const urlParams = new URLSearchParams(search);
    const [vehicleSearch, setVehicleSearch] = useState()
    const [backErrors, setBackErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [carOwner, setCarOwner] = useState(null)
    const [vehicle, setVehicle] = useState(null)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if (vehicle && vehicle.id) {
            setValue('vehicle', vehicle.id)
        }
    }, [vehicle])

    const vehiclePlate = urlParams.get('plate')
    const clientNif = urlParams.get('nif')

    useEffect(() => {
        vehiclePlate && searchPlate(vehiclePlate)
            .then((v) => setVehicle(v)).catch(e => console.log(e))
        clientNif && searchCarOwner(clientNif)
            .then((c) => setCarOwner(c)).catch(e => console.log(e))
    }, [vehiclePlate, clientNif])

    const onSubmit = data => {
        data = { vehicle, ...data };
        const formData = new FormData();
        const { damageFotos, ...fields } = data
        Object.keys(fields).forEach(key => formData.append(key, data[key]))

        if (data.damageFotos) {
            for (var i = 0; i < data.damageFotos.length; i++) {
                formData.append('damageFotos[]', data.damageFotos[i])
            }
        }

        setBackErrors({})
        setIsSubmitting(true)
        registerNewOr(formData)
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
                <h1 className='mt-3 mb-3 orTitle'>NEW OR</h1>
                {!vehicle ? (
                    <div className='OrContainer'>
                        <div className='ClientContainer'>
                            <p>Name: {vehicleSearch?.carOwner?.name}</p>
                            <p>Phone Number: {vehicleSearch?.carOwner?.phoneNumber}</p>
                        </div>
                        <hr className='line' />
                        <div className='VehicleContainer'>
                            <p>Plate: {vehicleSearch?.plate}</p>

                            <ModalSearch setVehicleSearch={setVehicleSearch} />

                            <Link className='mx-3' to={'/vehicles/new'} style={{ textDecoration: 'none' }} >
                                <i style={{ color: 'black' }} className="fa-solid fa-plus"></i>
                            </Link>
                            {vehicleSearch && (
                                <div>
                                    <hr></hr>
                                    <p>VIN: {vehicleSearch?.vin}</p>
                                    <p>Make: {vehicleSearch?.make}</p>
                                    <p>Model: {vehicleSearch?.model}</p>
                                </div>
                            )}
                            <hr></hr>
                        </div>
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
                                placeholder='Describe the issue'
                                {...register('descriptionProblem')}
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
                                {...register('operation')}
                            >
                            </textarea>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="damageFotos"
                                className="col col-form-label"
                            >Photos:</label>
                            <div className="col-sm-4">
                                <InputComponent
                                    className="input-group"
                                    id="damageFotos"
                                    error={backErrors?.damageFotos || errors.damageFotos?.message}
                                    placeholder="Add images"
                                    name="damageFotos"
                                    type="file"
                                    multiple
                                    register={register}
                                    style={{ backgroundColor: "white" }}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword"
                                className="col col-form-label"
                            >Quantity:</label>
                            <div className="col-sm-4">
                                <InputComponent className="input-group"
                                    id="qty"
                                    error={backErrors?.qty || errors.qty?.message}
                                    placeholder="Enter quantity"
                                    name="qty"
                                    type={'number'}
                                    register={register}
                                />
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword"
                                    className="col col-form-label"
                                >Price:</label>
                                <div className="col-sm-4">
                                    <InputComponent className="input-group"
                                        id="entryKms"
                                        error={backErrors?.price || errors.price?.message}
                                        placeholder="€"
                                        name="price"
                                        type={'number'}
                                        register={register}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 col-4 row">
                                <label htmlFor="inputPassword"
                                    className="col col-form-label"
                                >Discount:</label>
                                <div className="col-sm-4">
                                    <InputComponent className="input-group"
                                        id="discount"
                                        name="discount"
                                        placeholder="%"
                                        type={'number'}
                                        register={register}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <button type="submit" className={`col-4 buttonEditOr mt-4 btn btn-${isSubmitting ? 'secondary' : 'warning'} rounded-pill mt-4 mb-4`}>{isSubmitting ? 'Creating vehicle...' : 'Submit'}</button>
            </form>
            <BackButton customRoute={"profile"} />
            <DropDownMenu />
        </div>
    )
}


export default Or;


