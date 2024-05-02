import { useState, useEffect } from "react";
import { Input, Tooltip } from "antd";
import PropTypes from "prop-types";

const DecimalInput = ({ value, onChange, units, partId }) => {
  const [inputValue, setInputValue] = useState("");
  const [tooltipTitle, setTooltipTitle] = useState("");
  const disabled = units === null;

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

  useEffect(() => {
    if (!partId) {
      setTooltipTitle("View or upload a part to the viewer.");
    } else if (disabled) {
      setTooltipTitle(
        "Select units of measurement before entering a threshold value"
      );
    } else {
      setTooltipTitle("");
    }
  }, [partId, disabled]);

  return (
    <>
      <Tooltip title={tooltipTitle} placement="top">
        <Input value={inputValue} onChange={handleChange} disabled={disabled} />
      </Tooltip>
    </>
  );
};

DecimalInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  partId: PropTypes.string,
  units: PropTypes.string,
};

export default DecimalInput;
