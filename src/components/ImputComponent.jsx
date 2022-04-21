const InputComponent = ({ label, id, name, type, placeholder, register, error }) => {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <input
          type={type}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id={id}
          placeholder={placeholder}
          {...register(id)}
        />
        <p className="invalid-feedback">{error}</p>
      </div>
    )
  }
  
  InputComponent.defaultProps = {
    type: 'text'
  }
  
  export default InputComponent