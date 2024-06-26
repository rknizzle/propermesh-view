import { useState, useEffect } from "react";
import { Button, notification, Tooltip, Spin } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { startGeometryAnalysis } from "./startGeoAnalysis";
import { pollForResults } from "./pollForResults";
import PropTypes from "prop-types";
import "./startButton.css";

const StartButton = ({
  partId,
  setGeoData,
  analysisComplete,
  setAnalysisComplete,
  showCheckmark,
  setShowCheckmark,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setShowCheckmark(false);
    setShowFailure(false);
    setAnalysisComplete(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partId]);

  const startAnalysis = async () => {
    setIsLoading(true);

    try {
      const job = await startGeometryAnalysis(partId);

      const results = await pollForResults(job.id);

      setIsLoading(false);
      setGeoData(results);
      setShowCheckmark(true);
      setAnalysisComplete(true);
    } catch (error) {
      notification.error({
        message: "Analysis Failed",
        description: error.message,
      });
      setIsLoading(false);
      setShowFailure(true);
      setTimeout(() => setShowFailure(false), 5000);
    }
  };

  const isDisabled = !partId || analysisComplete;
  const tooltipTitle = partId
    ? ""
    : "View or upload a part to the viewer before running Geometry Analysis.";

  return (
    <Tooltip title={tooltipTitle} placement="top">
      <Button
        type="primary"
        onClick={startAnalysis}
        id="geo-start-button"
        className={`${isLoading ? "geoIsLoading" : ""} ${
          analysisComplete ? "geoIsComplete" : ""
        }`}
        disabled={isDisabled}
      >
        {isLoading ? (
          <span className="geoButtonText">Analyzing...</span>
        ) : analysisComplete ? (
          <span className="geoButtonText">Complete</span>
        ) : (
          <span className="geoButtonText">Start</span>
        )}
        {isLoading && (
          <span id="geo-spin-container">
            <Spin id="geo-spin-icon" />
          </span>
        )}
        {showCheckmark ? <CheckCircleOutlined id="geo-checkmark-icon" /> : null}
        {showFailure ? <CloseCircleOutlined id="geo-failure-icon" /> : null}
      </Button>
    </Tooltip>
  );
};

StartButton.propTypes = {
  partId: PropTypes.string,
  setGeoData: PropTypes.func,
  analysisComplete: PropTypes.bool,
  setAnalysisComplete: PropTypes.func,
  showCheckmark: PropTypes.bool,
  setShowCheckmark: PropTypes.func,
};

export default StartButton;
