const InputComponent = ({ label, id, name, type, placeholder, register, error, icon, eye, onToggle, multiple }) => {
  return (
    <div className="">
      {
        icon ? (
          <div className="input-group mt-4">
            <span className="input-group-text" id="inputGroup-sizing-default"><i className={icon}></i></span>
            <input
              style={{ backgroundColor: "white" }}
              type={type}
              className={`form-control ${error ? 'is-invalid' : ''}`}
              id={id}
              placeholder={placeholder}
              {...register(name)}
              multiple={multiple}
            /> {eye &&
                <span id="eyeIcon" className="input-group-text">
                  <i className={eye}
                    style={{ cursor: "pointer" }}
                    onClick={onToggle}></i>
                </span>
            }
            <p className="invalid-feedback">{error}</p>
          </div>
        ) : (
          <div className="mt-">
            <label htmlFor={id} className="form-label mb-0">
              {label}
            </label>
            <input
              type={type}
              style={{ backgroundColor: "white" }}
              className={`form-control-sm form-control ${error ? 'is-invalid' : ''}`}
              id={id}
              placeholder={placeholder}
              {...register(name)}
              multiple={multiple}
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
