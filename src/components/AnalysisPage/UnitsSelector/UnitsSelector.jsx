import { useState, useEffect } from "react";
import { Select, Space } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./unitsSelector.css";
import PropTypes from "prop-types";

const UnitsSelector = ({ partId }) => {
  const [units, setUnits] = useState(undefined);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const getCurrentUnits = async () => {
      if (partId) {
        try {
          const response = await fetch(`/api/v0/parts/${partId}`);
          if (!response.ok) {
            throw new Error("Failed to get part data.");
          }
          const data = await response.json();
          setUnits(data.units);
        } catch (error) {
          console.error("Error getting part data:", error);
        }
      }
    };

    getCurrentUnits();
  }, [partId]);

  const handleChange = async (value) => {
    setUnits(value);
    try {
      const response = await fetch(`/api/v0/parts/${partId}/units`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ units: value }),
      });

      if (!response.ok) {
        throw new Error("Failed to update units.");
      }

      const data = await response.json();
      console.log(data);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error updating units:", error);
    }
  };

  return (
    <Space wrap>
      <div id="select-container">
        <span id="units-selector-label">Units: </span>
        <Select
          placeholder="Select units"
          value={units}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: "mm", label: "mm" },
            { value: "inches", label: "inches" },
          ]}
        />
        {showSuccess && (
          <CheckCircleOutlined
            style={{ color: "green", fontSize: "16px" }}
            id="unit-update-success-icon"
          />
        )}
      </div>
    </Space>
  );
};

UnitsSelector.propTypes = {
  partId: PropTypes.string,
};

export default UnitsSelector;
