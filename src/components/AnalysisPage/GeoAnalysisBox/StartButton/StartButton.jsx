import { useState } from "react";
import { Button, notification, Tooltip } from "antd";
import { startGeometryAnalysis } from "./startGeoAnalysis";
import { pollForResults } from "./pollForResults";
import PropTypes from "prop-types";
import "./startButton.css";

const StartButton = ({ partId, setGeoData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startAnalysis = async () => {
    setIsLoading(true);
    try {
      const job = await startGeometryAnalysis(partId);

      await pollForResults(job.id, setIsLoading, setGeoData);
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
        loading={isLoading}
        onClick={startAnalysis}
        id="geo-start-button"
        disabled={isDisabled}
      >
        Start
      </Button>
    </Tooltip>
  );
};

StartButton.propTypes = {
  partId: PropTypes.string,
  setGeoData: PropTypes.func,
};

export default StartButton;
