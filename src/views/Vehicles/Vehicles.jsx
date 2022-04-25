import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getMarks } from "../../services/RoutesServices"
import React, { Component } from 'react'
import Select from 'react-select'

const Vehicles = () => {

    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        getMarks()
            .then(response => {
                console.log(response);
                setVehicles(response)
            })
    }, [])
    const getMakeOptions = (vehicles) => {
        let options = vehicles.sort((a, b) => a.name.localeCompare(b.name)).map(vehicle => {
            return {
                value: vehicle.name,
                label: vehicle.name.charAt(0).toUpperCase() + vehicle.name.slice(1)
            }
        });
        return options;
    }
    return (
        <div className="Vehicle text-start">
            {!vehicles ? (
                <h1 className="mx-3">Loading...</h1>
            ) : (
                <Select className="mt-5" options={getMakeOptions(vehicles)}> Choose Mark </Select>
            )}
        </div>
    )

   
}



export default Vehicles