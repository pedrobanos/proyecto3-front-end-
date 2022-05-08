import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Spinner from "../../components/Spinner/Spinner"
import { deleteVehicle, listVehicles } from "../../services/VehicleServices"
import SearchBar from "../../components/SearchBar"
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu"
import { useAuthContext } from "../../contexts/AuthContext"
import BackButton from "../../components/BackButton/BackButton"


const ListOfVehicles = () => {

    const [vehicles, setVehicles] = useState(null)
    const { garage, getGarage } = useAuthContext()
    const [filteredResults, setFilteredResults] = useState([]);
    const [search, setSearch] = useState("")

    // const [currentUser, setCurrentUser] = useState({})

    // useEffect(() => {
    //     getGarageDetail(id)
    //       .then(garage => {
    //         setCurrentUser(garage)
    //       })
    //   }, [])


    const handleDelete = (id) => {
        deleteVehicle(id)
          .then(() => {
            getGarage()
          })
      }

    useEffect(() => {
        listVehicles()
            .then(response => {
                setVehicles(response)
            })
    }, [garage])

    const searchItems = (searchValue) => {
        setSearch(searchValue)
        if (search !== '') {
            const filteredData = vehicles.filter((vehicle) => {
                return Object.values(vehicle).join('').toLowerCase().includes(search.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(vehicles)
        }
    }



    return (
        <div>
            <h1 className="mt-4 mb-3 text-center" id="vehicleListTitle">VEHICLE DATA</h1>
            {!vehicles ? (
                <Spinner />
            ) : (
                <div className="panel">
                    <SearchBar 
                        setSearch={searchItems}>
                    </SearchBar>
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
                            {search ? (
                                filteredResults?.map((vehicle) => (
                                    <tr key={vehicle.id}>
                                        <th scope="row">{vehicle.plate}</th>
                                        <td>{vehicle.make.charAt(0).toUpperCase() + vehicle.make.slice(1)}</td>
                                        <td>{vehicle.model}</td>
                                        <td>{vehicle?.carOwner?.name}</td>
                                        <td>{vehicle?.carOwner?.phoneNumber}</td>
                                        <Link to={`/vehicles/${vehicle.id}/edit`}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                        <button className="btn " 
                                        onClick={() => handleDelete(vehicle.id)}>
                                            <i className="fa-solid fa-trash"
                                            style={{color:"red", border:'none'}}></i> 
                                            </button>
                                    </tr>
                                ))
                            ) : (
                                vehicles?.map((vehicle) => (
                                    <tr key={vehicle.id}>
                                        <th scope="row">{vehicle.plate}</th>
                                        <td>{vehicle.make.charAt(0).toUpperCase() + vehicle.make.slice(1)}</td>
                                        <td>{vehicle.model}</td>
                                        <td>{vehicle?.carOwner?.name}</td>
                                        <td>{vehicle?.carOwner?.phoneNumber}</td>
                                        <Link to={`/vehicles/${vehicle.id}`}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                        <button className="btn " 
                                        onClick={() => handleDelete(vehicle.id)}>
                                            <i className="fa-solid fa-trash"
                                            style={{color:"red", borderColor:'none'}}></i> 
                                            </button>
                                    </tr>
                                )
                                ))}
                        </tbody>
                        {/* </Link> */}
                    </table>
                </div>
            )}
            <BackButton customRoute={"profile"}/>
            <DropDownMenu/>
        </div >
    )
}

export default ListOfVehicles


