import { Link } from "react-router-dom"
import "./MainMenu.css"
import carImage from "../../assets/car-image.webp"
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu"
import { useAuthContext } from "../../contexts/AuthContext"
import { Spinner } from "reactstrap"




const MainMenu = () => {

const { garage } = useAuthContext()


    return (

        <div className="container1">
            {!garage ? (
                <Spinner />
            ) : (
                <div className="mt-3 mx-4 row text-center justify-content-center">
                <h1 id="MainMenu" className="mt-2">HOME<i className="fa-solid fa-car-burst"></i></h1>
                    <div className="col positionMenu">
                        <Link className="btn btn-warning mt-3" style={{ width: 200, height: 45 }} to="/ors/new">
                            <h5> NEW OR </h5>
                        </Link>
                        <div className="col">
                            <Link className="btn btn-warning mt-3" style={{ width: 200, height: 45 }} to="/vehicles/new">
                                <h5> + ADD VEHICLE </h5>
                            </Link>
                        </div>
                        <div className="col">
                            <Link className="btn btn-warning mt-3" style={{ width: 200, height: 45 }} to="/ors">
                                <h5> PENDING OR's </h5>
                            </Link>
                        </div>
                        <div className="col">
                            <Link className="btn btn-warning mt-3" style={{ width: 200, height: 45 }} to="/vehicles">
                                <h5> VEHICLES DATA </h5>
                            </Link>
                        </div>
                        <div className="col">
                            <Link className="btn btn-warning mt-3" style={{ width: 200, height: 45 }} to="/carowners">
                                <h5> CLIENTS DATA </h5>
                            </Link>
                        </div>
                        <div className="mt-5">
                            <img src={carImage} style={{ height: 270, width: 300 }} className="card-img-top" alt=" " />
                        </div>
                        <DropDownMenu />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MainMenu
