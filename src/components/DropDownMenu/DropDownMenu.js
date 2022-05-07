import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap'
import './DropDownMenu.css'


const DropDownMenu = () => {
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false)

  const openCloseDrop = () => {
    setDropdown(!dropdown)
  }
  return (
      <div className="dropdownContainer">
        <Dropdown isOpen={dropdown} toggle={openCloseDrop} direction="up">
          <DropdownToggle className="menuDropdown">
          <i className="fa-solid fa-bars"></i>
          </DropdownToggle>
          <DropdownMenu className="listOfItems">
            <DropdownItem onClick={() => navigate('/ors/new')} className="itemDropdownItem1">New Or</DropdownItem>
            <DropdownItem onClick={() => navigate('/vehicles/new')}className="itemDropdownItem2">Add vehicle</DropdownItem>
            <DropdownItem onClick={() => navigate('/ors')}className="itemDropdownItem2">Pending Or's</DropdownItem>
            <DropdownItem onClick={() => navigate('/vehicles')}className="itemDropdownItem3">List of vehicles</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
  );
};

export default DropDownMenu;