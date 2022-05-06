const InputComponent = ({ label, id, name, type, placeholder, register, error, icon }) => {
  return (
    <div className="">
      {
        icon ? (
          <div className="input-group input-group-sm mt-4">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm"><i className={icon}></i></span>
            </div>
            <input 
              style={{backgroundColor: "white"}}
              type={type}
              className={`form-control rounded ${error ? 'is-invalid' : ''}`}
              id={id}
              placeholder={placeholder}
              {...register(name)}
            />
            <p className="invalid-feedback">{error}</p>
          </div>
        ) : (
          <div className="mt-">
            <label htmlFor={id} className="form-label mb-0">
              {label}
            </label>
            <input
              type={type}
              style={{backgroundColor: "white"}}
              className={`form-control-sm form-control ${error ? 'is-invalid' : ''}`}
              id={id}
              placeholder={placeholder}
              {...register(name)}
            />
            <p className="invalid-feedback mt-0">{error}</p>
          </div>
        )
      }
    </div>
  );
};

InputComponent.defaultProps = {
  type: 'text'
}

export default InputComponent
