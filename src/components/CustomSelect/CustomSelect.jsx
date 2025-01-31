const CustomSelect = ({ label, value, options, onChangeHandler, style }) => {
  return (
    <div className="customSelect">
      <label>{label}:</label>
      <select value={value} onChange={onChangeHandler} style={style}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
