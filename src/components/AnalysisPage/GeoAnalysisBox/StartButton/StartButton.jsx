import { useState } from "react";
import { Button, notification, Tooltip, Spin } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { startGeometryAnalysis } from "./startGeoAnalysis";
import { pollForResults } from "./pollForResults";
import PropTypes from "prop-types";
import "./startButton.css";

const StartButton = ({ partId, setGeoData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const startAnalysis = async () => {
    setIsLoading(true);
    setShowCheckmark(false);
    try {
      const job = await startGeometryAnalysis(partId);

      await pollForResults(job.id, setIsLoading, setGeoData);
      setShowCheckmark(true);
      setTimeout(() => setShowCheckmark(false), 5000);
    } catch (error) {
      notification.error({
        message: "Analysis Failed",
        description: error.message,
      });
      setIsLoading(false);
    }
  };

  const isDisabled = !partId;
  const tooltipTitle = partId
    ? ""
    : "View or upload a part to the viewer before running Geometry Analysis.";

  return (
    <Tooltip title={tooltipTitle} placement="top">
      <Button
        type="primary"
        onClick={startAnalysis}
        id="geo-start-button"
        disabled={isDisabled}
      >
        {isLoading ? "Analyzing..." : "Start"}
        {isLoading ? <Spin style={{ marginLeft: "10px" }} /> : null}
      </Button>
      {showCheckmark ? (
        <CheckCircleOutlined
          style={{ marginLeft: "10px" }}
          id="checkmark-icon"
        />
      ) : null}
    </Tooltip>
  );
};

StartButton.propTypes = {
  partId: PropTypes.string,
  setGeoData: PropTypes.func,
};

export default StartButton;
