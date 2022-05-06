import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SearchBar from '../../components/SearchBar';
import { listVehicles } from "../../services/VehicleServices"
import { carOwnersList } from "../../services/VehicleServices"



const Or = () => {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([]);
    const [vehicles, setVehicles] = useState([])


    useEffect(() => {
        listVehicles()
            .then(response => {
                setVehicles(response)
            })
    }, [])
    
    useEffect(() => {
        const results = vehicles.filter(vehicle =>
            vehicle.plate.toLowerCase().includes(search.toLowerCase())
          );
          setSearchResults(results);
    }, [search]);


    return (
        <div>
            <SearchBar label="Vehicles" setSearch={setSearch} />
            <ul>
                {searchResults.map(vehicle => (
                    <div key={vehicle.id}>
                        <li>{vehicle.plate}</li>
                    </div>
                ))}
            </ul>
            {/* <div>
                {vehicles.map(vehicle => {
                    if (vehicle.plate.toLowerCase().includes(search.toLowerCase())) {
                        return (
                            <div key={vehicle.id}>
                                <p>{vehicle.plate}</p>
                            </div>
                        )
                    }
                    return null
                })}
            </div> */}
        </div>
    );
};

export default Or;