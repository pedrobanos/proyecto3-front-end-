import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button } from 'react-bootstrap'
import InputComponent from '../InputComponent';
import { searchCarOwner } from '../../services/CarOwnserService';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'


const schema = yup.object({
    nifOrNie: yup.string().required('Nif is a required field').matches(/^(\d{8})([A-Z])$/, 'Invalid Nif form')
}).required()

const SearchCarOwnerModal = ({ setCarOwnerSearch }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [nifOrNie, setNifOrNie] = useState("");
    const [carOwner, setCarOwner] = useState();
    const { formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSearch = () => {
        if(nifOrNie){
            searchCarOwner(nifOrNie).then(result => setCarOwner(result))
        } 
        
    }

    const handleSelect = () => {
        setCarOwnerSearch(carOwner);
        handleClose();
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <form>
                        <div className='mb-3'>
                            <Modal.Title>Search car owner</Modal.Title>
                        </div>
                        <div className='container'>
                            <div className='row'>
                                <div className='col'>
                                    <input className="input-group mb-2"
                                        id="plate"
                                        placeholder="Introduce a nie"
                                        name="plate"
                                        value={nifOrNie}
                                        onChange={(e) => setNifOrNie(e.target.value)}
                                    />
                                </div>
                                <div className='col'>
                                    <Button type="button" onClick={onSearch} variant="primary"><i className="fa-solid fa-magnifying-glass"></i></Button>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4'>
                            {carOwner ? (
                                <>
                                    <p>Name: {carOwner?.name}</p>
                                    <p>Email: {carOwner?.email}</p>
                                    <p>Phone: {carOwner?.phoneNumber}</p>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </form>

                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={handleSelect}>Select</Button>
                </Modal.Footer>
            </Modal>
            <Button
                style={{ backgroundColor: 'transparent', border: 'none' }}
                onClick={handleShow}>
                <i style={{ color: 'black' }} className="fa-solid fa-magnifying-glass"></i>
            </Button>
        </>
    );
};

export default SearchCarOwnerModal;