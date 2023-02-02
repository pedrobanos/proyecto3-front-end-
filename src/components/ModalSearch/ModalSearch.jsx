import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { searchPlate } from '../../services/VehicleServices';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './ModalSearch.css'
// import plateSheet from '../../assets/matricula-removebg-preview.png'


const ModalSearch = ({ setVehicleSearch }) => {
    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [numberPlate, setNumberPlate] = useState("")
    const [letterPlate, setLetterPlate] = useState("")
    const [vehicle, setVehicle] = useState();

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      

    const onSearch = () => {

        const plate = numberPlate + letterPlate.toUpperCase()
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
                            <div className='container'>
                                <div className='modalPic row'>
                                    <div className='numberBox col'>
                                        <input className="numberInput input-group mb-2 mx-1"
                                            id="numberPlate"
                                            placeholder="1234"
                                            name="numberPlate"
                                            value={numberPlate}
                                            maxLength="4"
                                            onChange={(e) => setNumberPlate(e.target.value)}
                                        />
                                    </div>
                                    <div className='letterBox col'>
                                        <input className="letterInput input-group mb-2"
                                            id="letterPlate"
                                            placeholder="AAA"
                                            name="letterPlate"
                                            value={letterPlate.toUpperCase()}
                                            maxLength="3"
                                            onChange={(e) => setLetterPlate(e.target.value)}
                                        />
                                    </div>

                                    <div className='buttonSearch col'>
                                        <Button 
                                        type="button" 
                                        onClick={onSearch}
                                         variant="warning"><i className="fa-solid fa-magnifying-glass"></i></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4'>
                            {vehicle ? (
                                <>
                                    <p>MAKE: {capitalizeFirstLetter(vehicle?.make)}</p>
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