import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BackButton from "../../components/BackButton/BackButton"
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu"
import SearchBar from "../../components/SearchBar"
import Spinner from "../../components/Spinner/Spinner"
import { useAuthContext } from "../../contexts/AuthContext"
import { deleteCarOwner, listCarOwners } from "../../services/CarOwnserService"
import './CarOwnersList.css'



const CarOwnersList = () => {

    const [carOwners, setCarOwners] = useState(null)
    const { garage, getGarage } = useAuthContext()
    const [filteredResults, setFilteredResults] = useState([]);
    const [search, setSearch] = useState("")

    const handleDelete = (id) => {
        deleteCarOwner(id)
            .then(() => {
                getGarage()
            })
    }

    useEffect(() => {
        listCarOwners()
            .then(response => {
                setCarOwners(response)
            })
    }, [garage])

    const searchItems = (searchValue) => {
        setSearch(searchValue)
        if (search !== '') {
            const filteredData = carOwners.filter((carOwner) => {
                return Object.values(carOwner).join('').toLowerCase().includes(search.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(carOwners)
        }
    }
    return (
        <div>
            <h1 className="mt-4 mb-3 text-center clientTitle">CLIENT DATA</h1>
            {!carOwners ? (
                <Spinner />
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-md-offset-1 col-md-10">
                            <div className="panel">
                                <SearchBar
                                    setSearch={searchItems}>
                                </SearchBar>
                                <div className="panel-body table-responsive" >

                                    <table className="table" >
                                        <thead >
                                            <tr>
                                                <th>Name</th>
                                                <th>NIF/NIE</th>
                                                <th>Tel</th>
                                                <th>Address</th>
                                                <th>City/State</th>
                                                <th>Zipcode</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {search ? (
                                                filteredResults.map((carOwner) => (
                                                    <tr key={carOwner.id}>
                                                        <td>{carOwner.name}</td>
                                                        <td>{carOwner.nifOrNie}</td>
                                                        <td>{carOwner.phoneNumber}</td>
                                                        <td>{carOwner.address.street}</td>
                                                        <td>{carOwner.address.city}</td>
                                                        <td>{carOwner.address.zipCode}</td>
                                                        <td>
                                                            <ul className="action-list justify-content-center">
                                                                <Link to={`/carowners/${carOwner.id}`}><i className="text-center fa-solid fa-info"></i></Link>
                                                                <Link to={`/carowners/${carOwner.id}/edit`}><i className="fa fa-edit"></i></Link>
                                                                <button className="btn "
                                                                    onClick={() => handleDelete(carOwner.id)}>
                                                                    <i className="fa-solid fa-trash"
                                                                        style={{ color: "red", border: 'none' }}></i>
                                                                </button>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                carOwners.map(carOwner => (
                                                    <tr key={carOwner.id}>
                                                        <td>{carOwner.name}</td>
                                                        <td>{carOwner.nifOrNie}</td>
                                                        <td>{carOwner.phoneNumber}</td>
                                                        <td>{carOwner.address.street}</td>
                                                        <td>{carOwner.address.city}</td>
                                                        <td>{carOwner.address.zipCode}</td>
                                                        <Link to={`/carowners/${carOwner.id}`}><i className="fa fa-edit"></i></Link>
                                                        <button className="btn  "
                                                            onClick={() => handleDelete(carOwner.id)}>
                                                            <i className="fa-solid fa-trash"
                                                                style={{ color: "red", border: 'none' }}></i>
                                                        </button>
                                                    </tr>
                                                )
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-4">
                <BackButton customRoute={"home"} />
                <DropDownMenu />
            </div>
        </div>
    )
}

export default CarOwnersList




