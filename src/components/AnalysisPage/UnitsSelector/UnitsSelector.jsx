import { useState } from "react";
import { Select, Space } from "antd";
import "./unitsSelector.css";
import PropTypes from "prop-types";

const UnitsSelector = ({ partId }) => {
  const [units, setUnits] = useState(undefined);
  console.log("partId: ", partId);

  const handleChange = (value) => {
    setUnits(value);
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <Space wrap>
        <span id="units-selector-label">Units: </span>
        <Select
          placeholder="Select units"
          defaultValue={units}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: "mm", label: "mm" },
            { value: "inches", label: "inches" },
          ]}
        />
      </Space>
    </div>
  );
};

UnitsSelector.propTypes = {
  partId: PropTypes.string,
};

export default UnitsSelector;
