import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { getMakes, getModels } from "../../services/RoutesServices"
import React, { Component } from 'react'
import Select from 'react-select'

const Vehicles = () => {

    const [makes, setMakes] = useState([])
    const [models, setModels] = useState(null)
    const selectRef = useRef(null)
    

    
    useEffect(() => {
        getMakes()
            .then(response => {
                const responseWithoutBraquets = response.substring(1, response.length - 2).toLowerCase()
                setMakes(JSON.parse(responseWithoutBraquets))
             })
    }, [])
  

    // useEffect(() => {
    //     if (makes) {
    //             getModels(makes.makes)
    //                 .then(res => console.log('res', res))
    //     }
    // }, [makes.makes])



    const getMakeOptions = (makes) => {
        let options = makes.makes.map(make => {
            return {
                value: make.make_id,
                label: make.make_display.charAt(0).toUpperCase()+ make.make_display.slice(1)
            }
        });
        return options;

    }

    //  const getModelOptions = (makes) => {
    //     let options = makes.makes.map(vehicle => {
    //         return {
    //             value: make.name,
    //             label: make.name.charAt(0).toUpperCase() + vehicle.name.slice(1)
    //         }
    //      });
    //     return options;

    //  }
        return (
            <div className="Vehicle text-start">
                {/* {console.log(makes.makes)
                 makes.makes?.map(make => {
                    return(
                   <p key={make.make_id}>{make.make_display.charAt(0).toUpperCase()+ make.make_display.slice(1)}</p>
                    )
                 })
                } */}
                {!makes.makes ? (
                    <h1 className="mx-3">Loading...</h1>
                ) : (
                    <div>
                        <Select 
                            onChange={(input) => setMakes(input.value)}
                            ref={selectRef} 
                            className="mt-5" 
                            options={getMakeOptions(makes)}
                        > Choose Mark </Select>
                         {/* {models && <Select className="mt-5" options={getModelOptions(makes.makes)}> Choose Mark </Select> } */}
                    </div>
                )}
            </div>
        )


    }



    export default Vehicles