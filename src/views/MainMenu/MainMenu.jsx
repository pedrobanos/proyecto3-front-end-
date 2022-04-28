import { Link } from "react-router-dom"
import "./MainMenu.css"
import carImage from "../../assets/car-image.webp"


const MainMenu = () => {

    return (
        <div className="container">
            <div className="mt-3 mx-4 row text-center justify-content-center">
                <h1 className="text-decoration-underline">Main Menu</h1>
                <div className="col">
                    <Link className="btn btn-warning mt-4" style={{ width: 200, height: 45 }} to="/ors/new">
                        <h5> NEW OR </h5>
                    </Link>
                    <div className="col">
                        <Link className="btn btn-warning mt-3" style={{ width: 200, height: 45 }} to="/vehicles/new">
                            <h5> + ADD VEHICLE </h5>
                        </Link>
                    </div>
                    <div className="col">
                        <Link className="btn btn-warning mt-3" style={{ width: 200, height: 45 }} to="/carowners/new">
                            <h5> PENDING OR's </h5>
                        </Link>
                    </div>
                    <div className="col">
                        <Link className="btn btn-warning mt-3" style={{ width: 200, height: 45 }} to="/vehicles">
                            <h5> LIST OF VEHICLES </h5>
                        </Link>
                    </div>
                    <div className="col">
                    <Link className="btn btn-warning mt-3" style={{width:200,height:45}} to="/vehicles">
                        <h5> LIST OF VEHICLES </h5>
                    </Link>
                    </div>
                    <div className="mt-5">
                        <img src={carImage} style={{ height: 180, width: 300 }} className="card-img-top" alt=" " />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainMenu
