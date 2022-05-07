import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrDetails } from '../../services/OrServices';
import logo from "../../assets/full_width.png"
import "./DetailFromOr.css"
import { useAuthContext } from '../../contexts/AuthContext';
import { getCurrentGarage } from '../../services/GarageService';

const DetailFromOr = () => {
    const [or, setOr] = useState({})
    const { id } = useParams()
    const [currentGarage, setCurrentGarage] = useState({})
    const { garage } = useAuthContext()

    useEffect(() => {
        getCurrentGarage()
          .then(garage => {
            setCurrentGarage(garage)
          })
      }, [])
    

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
                            <small>Entry Date: {new Date(or.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</small>
                            <small>Entry kms: {or.entryKms}kms</small> 
                            </div>
                        </div>
                        <hr />
                        <div className="table-responsive p-2">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr className="add">
                                        <td>Vehicle:</td>
                                        <td className='mx-3'>Client:</td>
                                    </tr>
                                    <tr className="content">
                                        <td className="font-weight-bold">
                                            Plate:{or?.vehicle?.plate}<br />
                                            Make: {or?.vehicle?.make.toUpperCase()}<br />
                                            Model:{or?.vehicle?.model.toUpperCase()} <br />
                                            VIN:{or?.vehicle?.vin}
                                        </td>
                                        <td className="font-weight-bold mx-3">
                                            Name: {or?.vehicle?.carOwner?.name} <br /> 
                                            NIF/NIE: {or?.vehicle?.carOwner?.nifOrNie}<br /> 
                                            Tel: {or?.vehicle?.carOwner?.phoneNumber} </td>
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
                                        <td className="text-center">{((or.qty * or.price * 0.21)+(or.qty* or.price)).toFixed(2)}€</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr />
                        <div className="address p-2">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr className="add">
                                        <td>{garage.bussinesName}</td>
                                    </tr>
                                    <tr className="content">
                                        <td> CIF : {garage.cif} <br /> 
                                            Address : {garage.address.street} <br /> 
                                            {garage.address.zipCode},{garage.address.city}<br /> 
                                            {garage.address.state}({garage.address.country})<br /> 
                                            email : {garage.email} <br /> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DetailFromOr;



