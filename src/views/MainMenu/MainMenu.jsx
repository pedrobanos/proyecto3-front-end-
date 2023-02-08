import { Link } from "react-router-dom"
import "./MainMenu.css"
import { useAuthContext } from "../../contexts/AuthContext"
import { Spinner } from "reactstrap"
import Navbar from "../../components/Misc/Navbar"
import { useEffect, useState } from "react"
import { listOfOrs } from "../../services/OrServices"
import "../Or/Or.css"





const MainMenu = () => {

    const { garage } = useAuthContext()
    const [ors, setOrs] = useState(null)



    useEffect(() => {
        listOfOrs()
            .then(response => {
                setOrs(response)
            })
    }, [garage])



    return (

        <div className="justify-content-center">
            <Navbar />
            {!ors && !garage ? (
                <Spinner />
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="panel">
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
                                {/* <Link to={`/vehicles/${vehicle.id}`}> */}
                                <tbody>
                                    {ors?.map((or, i) => (
                                        <tr key={i}>
                                            <th scope="row">{('22000') + i}</th>
                                            <td>{new Date(or.createdAt).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</td>
                                            <td>{or?.vehicle?.plate}</td>
                                            <td>{or?.vehicle?.make} {or?.vehicle?.model}</td>
                                            <td>{or?.vehicle?.vin}</td>
                                            <Link to={`/ors/${or.id}`}>
                                                <td><i className="fa-solid fa-xl fa-info mt-2"></i></td></Link>
                                        </tr>
                                    )
                                    )}
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
