function PersonalInformation({
    id,
    label,
    type,
    placeholder,
    required,
    onchange,
    value,
  }) {
    return (
      <div className="input-group mb-3">
        <span className="input-group-text" id={id} style={{ width: "20%", minWidth: "100px" }} >
          {label}{" "}
        </span>
        
        <input
          type={type}
          className="form-control"
          id={id}
          placeholder={placeholder}
          required={required}
          onChange={onchange}
          value={value}
          autoComplete="off"
        />
      </div>
    );
  };

    export default PersonalInformation;