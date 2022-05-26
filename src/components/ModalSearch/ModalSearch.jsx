import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { searchPlate } from '../../services/VehicleServices';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const ModalSearch = ({ setVehicleSearch }) => {
    const navigate = useNavigate()
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [plate, setPlate] = useState("");
    const [vehicle, setVehicle] = useState();


    const onSearch = () => {
        searchPlate(plate).then(result => setVehicle(result))
    }

    const handleSelect = () => {
        if (vehicle) {
            navigate(`/ors/new?plate=${vehicle.plate}&nif=${vehicle.carOwner?.nifOrNie}`)
        }
        setVehicleSearch(vehicle);
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
                        <div className='container'>
                            <div className='col mb-3'>
                                <Modal.Title>Introduce a plate</Modal.Title>
                            </div>
                            <input className="input-group mb-2"
                                id="plate"
                                placeholder="Introduce a plate"
                                name="plate"
                                value={plate}
                                onChange={(e) => setPlate(e.target.value)}
                            />
                            <Button type="button" onClick={onSearch} variant="primary"><i className="fa-solid fa-magnifying-glass"></i></Button>
                        </div>
                        <div className='mt-2'>
                            {vehicle ? (
                                <>
                                    <p>MAKE: {vehicle?.make}</p>
                                    <p>MODEL: {vehicle?.model}</p>
                                    <p>VIN: {vehicle?.vin}</p>
                                </>
                            ) : (
                                <></>
                            )}

                        </div>
                    </form>

                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSelect}>Select</Button>
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

export default ModalSearch;