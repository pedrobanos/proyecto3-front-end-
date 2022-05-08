import React from 'react'
import InputComponent from "../../components/InputComponent"
import * as yup from 'yup';
import Spinner from "../../components/Spinner/Spinner"


const schema = yup.object({
    plate: yup.string().required('Plate is required'),
    vin: yup.string().min(17).required('Need a VIN'),
    price: yup.number().positive(),
    make: yup.string().required('Choose a Make'),
    model: yup.string().required('Select a model'),
    vehicleInsurance: yup.string().required('kms is required'),
    carOwner: yup.string().required()
}).required()


const CreateCarOwnerComp = ({getMakeOptions, getModelOptions, getCompanyInsurance, carOwner,
    onSubmit, backErrors, isSubmitting, makes, errors, register, models, handleSubmit}) => {

    return (
        <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h4 className="mb-3">Client data</h4>
                        <small>Name: {carOwner.name}</small>
                        <br />
                        <small>DNI: {carOwner.nifOrNie}</small>
                        <br />
                        <small>Tel: {carOwner.phoneNumber}</small>
                    </div>

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
                    {!makes ? (
                        <Spinner />
                    ) : (
                        <div>
                            <select
                                className="form-select bg-light mt-4 "
                                arial-label="default input example"
                                error={backErrors?.make || errors.make?.message}
                                {...register('make')}
                            >
                                <option >Choose a Mark</option>
                                {getMakeOptions(makes).map((option) => (
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
                        </div>
                    )}
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
                    <button type="submit" className={`mt-4 btn btn-${isSubmitting ? 'secondary' : 'warning'} rounded-pill mt-4 mb-4`}>{isSubmitting ? 'Creating vehicle...' : 'Submit'}</button>
                </form>
        </div>
    );
};

export default CreateCarOwnerComp;