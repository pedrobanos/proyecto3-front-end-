import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SearchBar from "../../components/SearchBar"
import Spinner from "../../components/Spinner/Spinner"
import { listCarOwners } from "../../services/CarOwnserService"



const CarOwnersList = () => {

    const [carOwners, setCarOwners] = useState(null)
    const [filteredResults, setFilteredResults] = useState([]);
    const [search, setSearch] = useState("")

    useEffect(() => {
        listCarOwners()
            .then(response => {
                setCarOwners(response)
            })
    }, [])

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
            <h1 className="mt-4 mb-3 text-center text-decoration-underline">Client Data Base</h1>
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
                                                            <ul className="action-list">
                                                                <Link to={`/carowners/${carOwner.id}`}><i className="fa-solid fa-info"></i></Link>
                                                                <i className="fa fa-edit"></i>
                                                                <a href="#" data-tip="delete"><i className="fa fa-trash"></i></a>
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
                                                        <td>
                                                            <ul className="action-list">
                                                                <Link to={`/carowners/${carOwner.id}`}><i className="fa-solid fa-info"></i></Link>
                                                                <i className="fa fa-edit"></i>
                                                                <a href="#" data-tip="delete"><i className="fa fa-trash"></i></a>
                                                            </ul>
                                                        </td>
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
        </div>
    )
}

export default CarOwnersList



