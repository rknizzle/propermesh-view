import { useState } from "react";
import { Select, Space } from "antd";
import "./unitsSelector.css";

const UnitsSelector = () => {
  const [units, setUnits] = useState(undefined);

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

export default UnitsSelector;
