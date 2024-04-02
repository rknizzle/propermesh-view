import { useState, useEffect } from "react";
import { Button, notification, Tooltip, Spin } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { startGeometryAnalysis } from "./startGeoAnalysis";
import { pollForResults } from "./pollForResults";
import PropTypes from "prop-types";
import "./startButton.css";

const StartButton = ({ partId, setGeoData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setShowCheckmark(false);
    setShowFailure(false);
    setAnalysisComplete(false);
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
        disabled={isDisabled}
      >
        {isLoading ? "Analyzing..." : analysisComplete ? "Complete" : "Start"}
        {isLoading ? <Spin style={{ marginLeft: "10px" }} /> : null}
      </Button>
      {showCheckmark ? (
        <CheckCircleOutlined
          style={{ marginLeft: "10px" }}
          id="checkmark-icon"
        />
      ) : null}
      {showFailure ? (
        <CloseCircleOutlined style={{ marginLeft: "10px" }} id="failure-icon" />
      ) : null}
    </Tooltip>
  );
};

StartButton.propTypes = {
  partId: PropTypes.string,
  setGeoData: PropTypes.func,
};

export default StartButton;
