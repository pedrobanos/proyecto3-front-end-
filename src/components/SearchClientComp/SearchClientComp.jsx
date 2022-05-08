import { useState } from "react"
import React from 'react'
import { Link } from 'react-router-dom';
import SearchCarOwnerModal from '../SearchCarOwnerModal/SearchCarOwnerModal';
import InputComponent from "../InputComponent";

const SearchClientComp = ({ carOwnerSearch, setCarOwnerSearch, makes, getMakeOptions, getCompanyInsurance, getModelOptions, models, backErrors, handleSubmit, onSubmit, errors, register }) => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    return (
        <div>
            <div className='ClientContainer'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h6 style={{fontWeight: "bold"}} className="mb-4">STEP 1: Create/Search a client</h6>
                    {carOwnerSearch ? (
                        <div>
                            <p>Name: {carOwnerSearch.name}</p>
                            <p>Phone Number: {carOwnerSearch.phoneNumber}</p>
                            <SearchCarOwnerModal setCarOwnerSearch={setCarOwnerSearch} />
                            <Link className='mx-3' to={'/carowners/new'} style={{ textDecoration: 'none' }} >
                                <i style={{ color: 'black' }} className="fa-solid fa-user-plus"></i>
                            </Link>
                        </div>

                    ) : (
                        <div className="pt-2 mx-2 pb-4">
                            <p>Name: _____________________________________________  </p>
                            <p>Phone Number: _____________________________________________ </p>

                            <SearchCarOwnerModal setCarOwnerSearch={setCarOwnerSearch} />
                            <Link className='mx-3' to={'/carowners/new'} style={{ textDecoration: 'none' }} >
                                <i style={{ color: 'black' }} className="fa-solid fa-user-plus"></i>
                            </Link>
                        </div>
                    )}
                    {carOwnerSearch ? (
                        <div>
                            <h1>CREATE A VEHICLE</h1>

                            <h4 className="mt-4">Vehicle data</h4>
                            <InputComponent className="input-group mt-4"
                                id="plate"
                                error={backErrors?.plate || errors.plate?.message}
                                placeholder="Enter Plate"
                                name="plate"
                                register={register}
                            />
                            <InputComponent className="input-group mt-4"
                                id="vin"
                                error={backErrors?.vin || errors.vin?.message}
                                placeholder="Enter VIN"
                                name="vin"
                                register={register}
                            />
                            <select
                                className="form-select bg-light mt-4 "
                                arial-label="default input example"
                                error={backErrors?.make || errors.make?.message}
                                {...register('make')}
                            >
                                <option >Choose a Mark</option>
                                {getMakeOptions(makes)?.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            {models &&
                                <select
                                    className="form-select bg-light mt-4"
                                    arial-label="model"
                                    error={backErrors?.model || errors.plate?.model}
                                    {...register('model')}
                                >
                                    <option>Choose a Model</option>
                                    {getModelOptions(models)?.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            }
                            <select
                                className="form-select bg-light mt-4"
                                aria-label="Default select example"
                                {...register('vehicleInsurance')}
                                error={backErrors?.vehicleInsurance || errors.vehicleInsurance?.message}
                            >
                                <option >Select the Car Insurance</option>
                                {getCompanyInsurance().map((option) => (
                                    <option key={option.value}
                                        value={option.value}>
                                        {option.value}
                                    </option>
                                ))}
                            </select>
                            <button type="submit" className={`mt-4 btn btn-${isSubmitting ? 'secondary' : 'primary'}`}>{isSubmitting ? 'Creating vehicle...' : 'Submit'}</button>
                        </div>

                    ) : (
                        <></>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SearchClientComp;