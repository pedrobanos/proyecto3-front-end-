import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap'
import './DropDownMenu.css'
import { logout } from '../../store/AccessTokenStore'


const DropDownMenu = () => {
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false)

  const openCloseDrop = () => {
    setDropdown(!dropdown)
  }
  return (
    <div className="dropdownContainer">
      <Dropdown isOpen={dropdown} toggle={openCloseDrop} direction="left">
        <DropdownToggle className="menuDropdown">
          <i className="fa-solid fa-bars"></i>
        </DropdownToggle>
        <DropdownMenu className="listOfItems">
          <div className="d-flex">
            <DropdownItem onClick={() => navigate('/profile')} className="itemDropdownItem1"><i className="fa-solid fa-house"></i></DropdownItem>
            <DropdownItem onClick={logout} className="itemDropdownItem2 text-center"><i className="fa-solid fa-arrow-right-from-bracket"></i></DropdownItem>
          </div>
          <DropdownItem onClick={() => navigate('/ors/new')} className="itemDropdownItem4">New Or</DropdownItem>
          <DropdownItem onClick={() => navigate('/vehicles/new')} className="itemDropdownItem">Add vehicle</DropdownItem>
          <DropdownItem onClick={() => navigate('/ors')} className="itemDropdownItem">Pending Or's</DropdownItem>
          <DropdownItem onClick={() => navigate('/vehicles')} className="itemDropdownItem3">List of vehicles</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropDownMenu;