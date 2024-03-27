import { useState, useEffect } from "react";
import { Select, Space, Tooltip, Modal } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./unitsSelector.css";
import PropTypes from "prop-types";
import { updatePartUnits } from "./updatePartUnits";
import { getPartData } from "./getPartData";

const UnitsSelector = ({ partId }) => {
  const [units, setUnits] = useState(undefined);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const getCurrentUnits = async () => {
      if (partId) {
        try {
          const data = await getPartData(partId);
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
      await updatePartUnits(partId, value);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error updating units:", error);
      Modal.error({
        title: "Failed to Update Units",
        content: <span style={{ fontSize: "24px" }}>🫤</span>,
        centered: true,
      });
    }
  };

  const isDisabled = !partId;
  const tooltipTitle = partId
    ? ""
    : "View or upload a part to the viewer before selecting a unit of measurement.";

  return (
    <Space wrap>
      <div id="select-container" className={!isDisabled ? "enabledSelect" : ""}>
        <span id="units-selector-label">Units: </span>
        <Tooltip title={tooltipTitle} placement="top">
          <Select
            placeholder="Select units"
            value={units}
            style={{ width: 120 }}
            onChange={handleChange}
            disabled={isDisabled}
            options={[
              { value: "mm", label: "mm" },
              { value: "inches", label: "inches" },
            ]}
          />
        </Tooltip>
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
