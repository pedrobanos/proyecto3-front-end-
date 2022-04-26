import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { getMarks, getModels } from "../../services/RoutesServices"
import React, { Component } from 'react'
import Select from 'react-select'

const Vehicles = () => {

    const [marks, setMarks] = useState([])
    const [mark, setMark] = useState(null)
    const [models, setModels] = useState(null)

    const selectRef = useRef(null)

    
    useEffect(() => {
        getMarks()
            .then(response => {
                console.log(response);
                setMarks(response)
            })
    }, [])

    useEffect(() => {
        if (mark) {
                getModels(mark)
                    .then(res => console.log('res', res))
        }
    }, [mark])



    const getMakeOptions = (marks) => {
        let options = marks.sort((a, b) => a.name.localeCompare(b.name)).map(mark => {
            return {
                value: mark.id,
                label: mark.name.charAt(0).toUpperCase() + mark.name.slice(1)
            }
        });
        return options;

    }

    const getModelOptions = (marks) => {
        let options = marks.sort((a, b) => a.name.localeCompare(b.name)).map(vehicle => {
            return {
                value: mark.name,
                label: mark.name.charAt(0).toUpperCase() + vehicle.name.slice(1)
            }
        });
        return options;

    }
        return (
            <div className="Vehicle text-start">
                {!marks ? (
                    <h1 className="mx-3">Loading...</h1>
                ) : (
                    <div>
                        <Select 
                            onChange={(input) => setMark(input.value)}
                            ref={selectRef} 
                            className="mt-5" 
                            options={getMakeOptions(marks)}
                        > Choose Mark </Select>
                        {/* {models && <Select className="mt-5" options={getModelOptions(vehicles)}> Choose Mark </Select> } */}
                    </div>
                )}
            </div>
        )


    }



    export default Vehicles