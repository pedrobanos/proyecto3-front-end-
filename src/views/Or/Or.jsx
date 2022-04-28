import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputComponent from '../../components/ImputComponent';
import SearchBar from '../../components/SearchBar';



const schema = yup.object({
    operation: yup.string("Please provide solution to fix the car"),
    entryKms: yup.string("Must need car's kms")
}).required()

const Or = () => {
    const navigate = useNavigate()
    const [backErrors, setBackErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [search, setSearch] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        // setError(undefined)
        setIsSubmitting(true)

    }
    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <p className="nav-link active" aria-current="page">Or</p>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">client</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Plate</a>
                </li>
            </ul>
            <SearchBar setSearch={setSearch} />

                {/* <form class="d-flex mx-4" method="GET" action="/parties/results">
                    <input class="form-control me-2" name="name" type="search" placeholder="Encuentra eventos" aria-label="Search">
                        <button class="btn btn-outline-success fa-solid" type="submit">
                            <i class="fa fa-magnifying-glass"></i>
                        </button>
                </form> */}
        </div>
    );
};

export default Or;