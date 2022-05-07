import { Link } from "react-router-dom"
import "./MainMenu.css"
import carImage from "../../assets/car-image.webp"
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu"


const MainMenu = () => {

    return (
        <div className="container">
            <div className="mt-3 mx-4 row text-center justify-content-center">
                <h1 className="text-decoration-underline">Main Menu</h1>
                <div className="col">
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
                    <Link className="btn btn-warning mt-3" style={{width:200,height:45}} to="/carowners">
                        <h5> CLIENTS DATA </h5>
                    </Link>
                    </div>
                    <div className="mt-5">
                        <img src={carImage} style={{ height: 180, width: 300 }} className="card-img-top" alt=" " />
                    </div>
                    <DropDownMenu />
                    <Link to='/login'><i className="fa-solid fa-xl fa-person-through-window"></i></Link>
                </div>
            </div>
        </div>
    )
}

export default MainMenu
