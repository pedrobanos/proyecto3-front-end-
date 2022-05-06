import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getVehicle, listVehicles, register } from '../../services/VehicleServices';
import InputComponent from '../../components/InputComponent';
import { register as registerNewOr } from '../../services/VehicleServices'
import { Modal, Button } from 'react-bootstrap'
import './Or.css'
import { getCarOwner } from '../../services/CarOwnserService';



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
    //console.log(vehicleInfo)
    const [backErrors, setBackErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [carOwner, setCarOwner] = useState(null)
    const [vehicle, setVehicle] = useState(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            vehicle: vehicleInfo
            //carOwner: carOwnerInfo
        }
    })

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

    useEffect(() => {
        getCarOwner(carOwnerInfo)
            .then(carOwner => {
                setCarOwner(carOwner)
            })
    }, [])

    useEffect(() => {
        getVehicle(vehicleInfo)
            .then(vehicle => {
                setVehicle(vehicle)
            })
    }, [])



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
                            <p>Plate: </p>
                            <Button
                                style={{ backgroundColor: 'transparent', border: 'none' }}
                                onClick={handleShow}>
                                <i style={{ color: 'black' }} className="fa-solid fa-magnifying-glass"></i>
                            </Button>
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <div className='container'>
                                        <div className='col'>
                                            <Modal.Title>Introduce a plate, make or model</Modal.Title>
                                        </div>
                                        <p>Búsqueda: </p>
                                        <InputComponent className="input-group"
                                            id="plate"
                                            error={backErrors?.entryKms || errors.entryKms?.message}
                                            placeholder="Introduce a plate"
                                            name="plate"
                                            register={register}
                                        />
                                        <Button variant="primary">Search</Button>
                                    </div>
                                </Modal.Header>
                                <Modal.Body>
                                    I will not close if you click outside me. Don't even try to press
                                    escape key.
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary">Submit</Button>
                                </Modal.Footer>
                            </Modal>
                            <Link className='mx-3' to={'/vehicles/new'} style={{ textDecoration: 'none' }} >
                                <i style={{ color: 'black' }} className="fa-solid fa-plus"></i>
                            </Link>
                            <p>VIN: </p>
                            <p>Make: </p>
                            <p>Model: </p>
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
                        <div class="mb-3 row">
                            <label for="inputPassword"
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
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1"
                                className="form-label"
                            >Describe the problem: </label>
                            <textarea className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                style={{ backgroundColor: "white" }}
                            >
                            </textarea>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1"
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
        </div>
    )
}


export default Or;


