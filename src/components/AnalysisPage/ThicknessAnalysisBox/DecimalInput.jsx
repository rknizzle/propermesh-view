import { useState, useEffect } from "react";
import { Input } from "antd";
import PropTypes from "prop-types";

const DecimalInput = ({ value, onChange, disabled }) => {
  const [inputValue, setInputValue] = useState("");

  // The inputValue controls what is displayed in the input field
  // allowing us to see values like ".0" or "."
  // once the user enters a valid number, the value will be updated as well as thresholdValue

  useEffect(() => {
    setInputValue(value?.toString().trim() ?? "");
  }, [value]);

  const handleChange = (e) => {
    //only allow numbers and limits the input to 2 decimal spots.
    const newValue = e.target.value.trim();
    const reg = /^(\d+)?(\.\d{0,2})?$/;

    if (reg.test(newValue)) {
      onChange(newValue)
    }
  };

  return (
    <Input value={inputValue} onChange={handleChange} disabled={disabled} />
  );
};

DecimalInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DecimalInput;
