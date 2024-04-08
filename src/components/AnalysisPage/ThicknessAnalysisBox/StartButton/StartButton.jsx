import { useEffect, useState } from "react";
import { Button, notification, Tooltip, Spin } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "./startButton.css";
import PropTypes from "prop-types";
import { pollForResults } from "./pollForResults";
import { startThicknessAnalysis } from "./startThickAnalysis";

const StartButton = ({
  partId,
  thresholdValue,
  setThinSurfaceArea,
  setIsThin,
  setListOfThicknessData,
  analysisComplete,
  setAnalysisComplete,
  showCheckmark,
  setShowCheckmark,
  units,
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
      const job = await startThicknessAnalysis(partId, thresholdValue);

      const results = await pollForResults(job.id);

      console.log(results);
      setThinSurfaceArea(results.thin_surface_area);
      setIsThin(results.is_thin);
      //updating listOfThicknessData with newest results
      setListOfThicknessData((prev) => [...prev, results]);
      setIsLoading(false);
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
      return;
    }
  };

  const isDisabled =
    !partId || analysisComplete || thresholdValue === null || units === null;

  let tooltipTitle = "";
  if (!partId) {
    tooltipTitle =
      "View or upload a part to the viewer before running Thickness Analysis.";
  } else if (thresholdValue === null && units === null) {
    tooltipTitle =
      "Enter a threshold value and select units of measurement to start analysis";
  } else if (thresholdValue === null) {
    tooltipTitle = "Enter a threshold value to start analysis";
  } else if (units === null) {
    tooltipTitle = "Select units of measurement to start analysis";
  }

  return (
    <Tooltip title={tooltipTitle} placement="top">
      <Button
        type="primary"
        onClick={startAnalysis}
        id="thick-start-button"
        disabled={isDisabled}
      >
        {isLoading ? "Analyzing..." : analysisComplete ? "Complete" : "Start"}
        {isLoading ? <Spin style={{ marginLeft: "10px" }} /> : null}
        {showCheckmark ? <CheckCircleOutlined id="checkmark-icon" /> : null}
        {showFailure ? (
          <CloseCircleOutlined
            style={{ marginLeft: "10px" }}
            id="failure-icon"
          />
        ) : null}
      </Button>
    </Tooltip>
  );
};

StartButton.propTypes = {
  partId: PropTypes.string,
  thresholdValue: PropTypes.number,
  setThinSurfaceArea: PropTypes.func,
  setIsThin: PropTypes.func,
  setListOfThicknessData: PropTypes.func,
  analysisComplete: PropTypes.bool,
  setAnalysisComplete: PropTypes.func,
  showCheckmark: PropTypes.bool,
  setShowCheckmark: PropTypes.func,
  units: PropTypes.string,
};

export default StartButton;
