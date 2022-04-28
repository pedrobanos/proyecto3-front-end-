import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Spinner from "../../components/Spinner/Spinner"
import { listVehicles } from "../../services/VehicleServices"

const ListOfVehicles = () => {

    const [vehicles, setVehicles] = useState(null)


    useEffect(() => {
        listVehicles()
            .then(response => {
                setVehicles(response)
            })
    }, [])

    return (
        <div>
            {!vehicles ? (
                <Spinner />
            ) : (
                vehicles.map((vehicle) => (
                    <table className="table"
                        key={vehicle.id}>
                        <thead>
                            <tr>
                                <th scope="col">Plate</th>
                                <th scope="col">Make</th>
                                <th scope="col">Model</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Tel</th>
                            </tr>
                        </thead>
                        {/* <Link to={`/vehicles/${vehicle.id}`}> */}
                            <tbody>
                                <tr>
                                    <th scope="row">{vehicle.plate}</th>
                                    {/* <td></td> */}
                                    <td>{vehicle.make}</td>
                                    <td>{vehicle.model}</td>
                                    <td>{vehicle.carOwner.name}</td>
                                    <td>{vehicle.carOwner.phoneNumber}</td>
                                </tr>
                            </tbody>
                        {/* </Link> */}
                    </table>

                )))
            }
        </div >
    )
}

export default ListOfVehicles

