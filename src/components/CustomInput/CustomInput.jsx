const CustomInput = ({
  inputLabel,
  inputValue,
  placeholder,
  onChangeHandler,
}) => {
  return (
    <div>
      <label>{inputLabel}: </label>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default CustomInput;
