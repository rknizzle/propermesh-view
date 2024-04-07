import { useState, useEffect } from "react";
import { Input } from "antd";
import PropTypes from "prop-types";

const DecimalInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(true);

  useEffect(() => {
    setInputValue(value?.toString());
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const reg = /^(\d+)?(\.\d{0,2})?$/;

    if (newValue === "" || reg.test(newValue)) {
      setInputValue(newValue);
      const numericValue = newValue === "" ? null : parseFloat(newValue);
      onChange(numericValue);
    }
  };

  return <Input value={inputValue} onChange={handleChange} />;
};

DecimalInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default DecimalInput;
