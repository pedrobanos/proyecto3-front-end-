
const InputLogin = ({ id, name, type, placeholder, register, error, multiple }) => {
  return (
    <div className="mt-4">
      <input
        type={type}
        className={`${error ? 'is-invalid' : ''}`}
        id={id}
        placeholder={placeholder}
        {...register(name)}
        multiple={multiple}
      />
      <p className="invalid-feedback">{error}</p>
    </div>
  )
}
InputLogin.defaultProps = {
  type: 'text'
}

export default InputLogin