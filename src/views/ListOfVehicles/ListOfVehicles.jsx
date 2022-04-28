import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Spinner from "../../components/Spinner/Spinner"
import { listVehicles } from "../../services/VehicleServices"

const ListOfVehicles = () => {

    const [vehicles, setVehicles] = useState(null)


    useEffect(() => {
        listVehicles()
            .then(response => {
                console.log(response);
                setVehicles(response)
            })
    }, [])

    return (
        <div>
            {!vehicles ? (
                <Spinner />
            ) : (
                <table className="table">
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
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle.id}>
                                <th scope="row">{vehicle.plate}</th>
                                <td>{vehicle.make}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.carOwner.name}</td> 
                                <td>{vehicle.carOwner.phoneNumber}</td>

                            </tr>
                        ))}
                    </tbody>
                    {/* </Link> */}
                </table>
            )}
        </div >
    )
}

export default ListOfVehicles
