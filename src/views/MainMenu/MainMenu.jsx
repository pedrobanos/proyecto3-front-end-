import { Link } from "react-router-dom"
import "./MainMenu.css"
import { useAuthContext } from "../../contexts/AuthContext"
import { Spinner } from "reactstrap"
import Navbar from "../../components/Misc/Navbar"
import { useEffect, useState } from "react"
import { listOfOrs } from "../../services/OrServices"
import "../Or/Or.css"
import SearchBar from "../../components/SearchBar"





const MainMenu = () => {

    const { garage } = useAuthContext()
    const [ors, setOrs] = useState(null)
    const [search, setSearch] = useState("")
    const [filteredResults, setFilteredResults] = useState([]);


    useEffect(() => {
        listOfOrs()
            .then(response => {
                setOrs(response)
            })

    }, [garage])

    const searchItems = (searchValue) => {
        setSearch(searchValue)
        if (search !== '') {
            const filteredData = ors.filter((or) => {
                return Object.values(or).join('').toLowerCase().includes(search.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(ors)
        }

        console.log(ors, "patata");
    }


    return (

        <div className="justify-content-center">
            <Navbar />
            {!ors && !garage ? (
                <Spinner />
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="panel">
                            <SearchBar
                                setSearch={searchItems}>
                            </SearchBar>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Or number</th>
                                        <th scope="col">Entry Date</th>
                                        <th scope="col">Plate</th>
                                        <th scope="col">Make & Model</th>
                                        <th scope="col">VIN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {search ? (
                                        filteredResults?.map((or) => (
                                            <tr key={or.id}>
                                                {/* <th scope="row">{vehicle.plate}</th> */}
                                                {/* <td>{or.vehicle.make.charAt(0).toUpperCase() + or.vehicle.make.slice(1)}</td> */}
                                                
                                                <td>{or.number}</td>
                                                <td>{or?.vehicle?.plate}</td>
                                                <td>{or?.vehicle?.make}</td>
                                                <td>{or?.vehicle?.model}</td>
                                                <td>{or?.vehicle?.vin}</td>



                                                <Link to={`/vehicles/${or.id}/edit`}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>

                                                {/* <button className="btn "
                                                    onClick={() => handleDelete(vehicle.id)}>
                                                    <i className="fa-solid fa-trash"
                                                        style={{ color: "red", border: 'none' }}></i>
                                                </button> */}

                                            </tr>
                                        ))
                                    ) : (ors?.map((or, i) => (
                                            <tr key={i}>
                                                {/* CUANDO CREAMOS UNA OR, SE DEBERÍA DE GENERAR UN ID CON EL QUE BUSCAR AQUI */}
                                                <th scope="row">{('23000') + i}</th>

                                                <td>{new Date(or.createdAt).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</td>
                                                <td>{or?.vehicle?.plate}</td>
                                                <td>{or?.vehicle?.make} {or?.vehicle?.model}</td>
                                                <td>{or?.vehicle?.vin}</td>
                                                <Link to={`/ors/${or.id}`}>
                                                    <td><i className="fa-solid fa-xl fa-info mt-2"></i></td></Link>
                                            </tr>
                                        )
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}

export default MainMenu
