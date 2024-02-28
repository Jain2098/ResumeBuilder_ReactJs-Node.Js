
function FieldNavItem({ title, icon, id, onChange, activeTab }){
    return (
      <div className="navbtn border border-primary-subtle border-1 rounded">
        <input
          type="radio"
          className="btn-check"
          name="group1"
          id={title}
          autoComplete="off"
          onChange={onChange}
          checked={activeTab === title}
        />
        <label
          className="btn btn-outline-primary border-0 "
          htmlFor={title}
          style={{ padding: "15px" }}
        >
          {icon}
        </label>
      </div>
    );
  };

export default FieldNavItem;