import logo from './../../assets/logo.png'
import { Link } from 'react-router-dom';
import './Navbar.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../../store/AccessTokenStore'



const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg d-flex justify-content-between bg-body-tertiary">
            <div>
                <Link to='/home'>
                    <img src={logo} alt='logo' style={{ width: 50, height: 50 }} />
                </Link>
            </div>
            <div className=''>
                <h6>EMPRESA: FULANITO PEREZ</h6>
            </div>
            <ul className="navbar-nav mx-2">

                <li className='nav-item'>
                    <Link className="nav-link" to="/vehicles">Vehicles</Link></li>

                <li className='nav-item'>
                    <Link className="nav-link" to="/carowners">Clients</Link></li>

                <li className='nav-item'>
                    <NavDropdown title={<i style={{color: "black"}} className="fa-solid fa-bars"></i>}>
                        <NavDropdown.Item href="/ors/new">
                            <i className="fa-solid fa-file-circle-plus"></i> New Or</NavDropdown.Item>
                        <NavDropdown.Item href="/vehicles/new"><i className="fa-solid fa-car"></i>  Add vehicle</NavDropdown.Item>
                        <NavDropdown.Item onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i> <span/>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </li>
            </ul>
        </nav>
    )

}

export default Navbar