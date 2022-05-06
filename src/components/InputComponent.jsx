const InputComponent = ({ label, id, name, type, placeholder, register, error, icon, eye, onToggle}) => {
  return (
    <div className="">
      {
        icon ? (
          <div className="input-group input-group-sm mb-4">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm"><i className={icon}></i></span>
            </div>
            <input
              style={{ backgroundColor: "white" }}
              type={type}
              className={`form-control rounded ${error ? 'is-invalid' : ''}`}
              id={id}
              placeholder={placeholder}
              {...register(name)}
            /> {eye && 
              <div>
                <span className="input-group-text">
                  <i className={eye}
                    style={{ cursor: "pointer" }}
                    onClick={onToggle}></i>
                </span>
              </div>
            }
            <p className="invalid-feedback">{error}</p>
          </div>
        ) : (
          <div>
            <label htmlFor={id} className="form-label">
              {label}
            </label>
            <input
              type={type}
              style={{ backgroundColor: "white" }}
              className={`form-control-sm form-control ${error ? 'is-invalid' : ''}`}
              id={id}
              placeholder={placeholder}
              {...register(name)}
            />
            <p className="invalid-feedback">{error}</p>
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
