import { useState } from "react";
import { Select, Space, Tooltip, notification } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleTwoTone,
} from "@ant-design/icons";
import "./unitsSelector.css";
import PropTypes from "prop-types";
import { updatePartUnits } from "./updatePartUnits";

const UnitsSelector = ({
  partId,
  units,
  setUnits,
  setFileFor3dModel,
  setFileNameFor3dViewer,
  originalFileFor3dModel,
  originalFileNameFor3dViewer,
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  //used to maintain the purple border around the select when it is active
  const [isActive, setIsActive] = useState(false);

  const handleChange = async (value) => {
    try {
      await updatePartUnits(partId, value);

      setUnits(value);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      setFileNameFor3dViewer(originalFileNameFor3dViewer);
      setFileFor3dModel(originalFileFor3dModel);
    } catch (error) {
      console.error("Error updating units:", error);
      notification.error({
        message: "Failed to update units",
        description:
          "Try again in a few minutes. Report the error to ryan@propermesh.com if the problem persists.",
        icon: <ExclamationCircleTwoTone twoToneColor="#eb2f96" />,
        placement: "top",
        duration: 4.5,
        style: { width: 300 },
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
            onMouseDown={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            className={isActive ? "active-select" : ""}
            placeholder="Select units"
            id="units-selector"
            value={units}
            onChange={handleChange}
            disabled={isDisabled}
            options={[
              { value: "mm", label: "mm" },
              { value: "inches", label: "inches" },
            ]}
          />
        </Tooltip>
        {showSuccess && <CheckCircleOutlined id="unit-update-success-icon" />}
      </div>
    </Space>
  );
};

UnitsSelector.propTypes = {
  partId: PropTypes.string,
  units: PropTypes.string,
  setUnits: PropTypes.func,
  setFileFor3dModel: PropTypes.func,
  setFileNameFor3dViewer: PropTypes.func,
  originalFileFor3dModel: PropTypes.object,
  originalFileNameFor3dViewer: PropTypes.string,
};

export default UnitsSelector;
