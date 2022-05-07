import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarOwner } from '../../services/CarOwnserService';
import { OrDetails } from '../../services/OrServices';
import { getVehicle } from '../../services/VehicleServices';
import logo from "../../assets/full_width.png"
import "./DetailFromOr.css"
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu';

const DetailFromOr = () => {
    const [or, setOr] = useState({})
    const [carOwner, setCarOwner] = useState(null)
    const [vehicle, setVehicle] = useState(null)
    const { id } = useParams()

    // useEffect(() => {
    //     getCarOwner()
    //         .then(carOwner => {
    //             setCarOwner(carOwner)
    //         })
    // }, [])

    // useEffect(() => {
    //     getVehicle()
    //         .then(vehicle => {
    //             setVehicle(vehicle)
    //         })
    // }, [])

    useEffect(() => {
        OrDetails(id)
            .then(or => setOr(or))
    }, [])

    return (

        < div className="container mt-5 mb-3" >
            <div className="row d-flex justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="d-flex flex-row p-2 mt-2"> <img src={logo} style={{width:100, height:100}} />
                            <div className="d-flex flex-column mx-5"> <h1 className="font-weight-bold">Repair Budget</h1> 
                            <small>Nº: {or.id}</small> 
                            <small>Entry: {new Date(or.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</small>
                            </div>
                        </div>
                        <hr />
                        <div className="table-responsive p-2">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr className="add">
                                        <td>Vehicle:</td>
                                        <td>Client:</td>
                                    </tr>
                                    <tr className="content">
                                        <td className="font-weight-bold">Google <br />Attn: John Smith Pymont <br />Australia</td>
                                        <td className="font-weight-bold">Facebook <br /> Attn: John Right Polymont <br /> USA</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr/>
                        <div className="table-responsive p-2">
                            <table className="table table-borderless mx-2"> Damage Images:
                                <tbody>
                                    <tr className="add">
                                        <td><img src={or.damageFotos} style={{width:125, height:100}}></img></td>
                                        <td><img src={or.damageFotos} style={{width:125, height:100}}></img></td>
                                        <td><img src={or.damageFotos} style={{width:125, height:100}}></img></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className='mx-3 mt-2'>Description: {or.descriptionProblem}</p>
                        <hr />
                        <div className="products p-2">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr className="add">
                                        <td>Operation</td>
                                        <td>Quantity</td>
                                        <td>Price</td>
                                        <td className="text-center">Total</td>
                                    </tr>
                                    <tr className="content">
                                        <td>{or.operation}</td>
                                        <td>{or.qty}</td>
                                        <td>{or.price}€</td>
                                        <td className="text-center">{or.qty * or.price}€</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr />
                        <div className="products p-2">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr className="add">
                                        <td></td>
                                        <td>Subtotal</td>
                                        <td>TAX(21%)</td>
                                        <td className="text-center">Total</td>
                                    </tr>
                                    <tr className="content">
                                        <td></td>
                                        <td>{or.qty * or.price}€</td>
                                        <td>{(or.qty * or.price * 0.21).toFixed(2)}€</td>
                                        <td className="text-center">{((or.qty * or.price * 0.21)+or.qty).toFixed(2)}€</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr />
                        <div className="address p-2">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr className="add">
                                        <td>Bank Details</td>
                                    </tr>
                                    <tr className="content">
                                        <td> Bank Name : ADS BANK <br /> Swift Code : ADS1234Q <br /> Account Holder : Jelly Pepper <br /> Account Number : 5454542WQR <br /> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <DropDownMenu/>
        </div>

    )
}

export default DetailFromOr;



