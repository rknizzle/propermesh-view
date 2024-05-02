import { useEffect, useState } from "react";
import { Button, notification, Tooltip, Spin } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "./startButton.css";
import PropTypes from "prop-types";
import { pollForResults } from "./pollForResults";
import { startThicknessAnalysis } from "./startThickAnalysis";
import { storeBlob } from "../indexedDBBlobStorage";
import { downloadPlyFilePlaceIn3dViewer } from "../downloadPlyToViewer";

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
  setFileFor3dModel,
  setFileNameForUpload,
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

      setThinSurfaceArea(results.thin_surface_area);
      setIsThin(results.is_thin);
      //updating listOfThicknessData with newest results
      setListOfThicknessData((prev) => [...prev, results]);
      setIsLoading(false);
      setShowCheckmark(true);
      setAnalysisComplete(true);
      downloadPlyFilePlaceIn3dViewer(
        job.id,
        partId,
        units,
        thresholdValue,
        setFileFor3dModel,
        setFileNameForUpload,
        storeBlob
      );
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
    !partId ||
    analysisComplete ||
    !isValidThresholdInput(thresholdValue) ||
    units === null;

  let tooltipTitle = "";
  if (!partId) {
    tooltipTitle =
      "View or upload a part to the viewer before running Thickness Analysis.";
  } else if (thresholdValue === null && units === null) {
    tooltipTitle =
      "Select units of measurement then enter a threshold value and to start analysis";
  } else if (!isValidThresholdInput(thresholdValue)) {
    tooltipTitle = "Enter a threshold value to start analysis";
  }

  function isValidThresholdInput(threshold) {
    if (
      threshold === null ||
      threshold === "" ||
      threshold === "." ||
      Number(threshold) === 0
    ) {
      return false;
    }

    return true;
  }

  return (
    <Tooltip title={tooltipTitle} placement="top">
      <Button
        type="primary"
        onClick={startAnalysis}
        id="thick-start-button"
        className={`${isLoading ? "isLoading" : ""} ${
          analysisComplete ? "isComplete" : ""
        }`}
        disabled={isDisabled}
      >
        {isLoading ? (
          <span className="buttonText">Analyzing...</span>
        ) : analysisComplete ? (
          <span className="buttonText">Complete</span>
        ) : (
          <span className="buttonText">Start</span>
        )}
        {isLoading && (
          <span id="spin-container">
            <Spin id="thick-spin-icon" />
          </span>
        )}
        {showCheckmark ? (
          <CheckCircleOutlined id="thick-checkmark-icon" />
        ) : null}
        {showFailure ? <CloseCircleOutlined id="thick-failure-icon" /> : null}
      </Button>
    </Tooltip>
  );
};

StartButton.propTypes = {
  partId: PropTypes.string,
  thresholdValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setThinSurfaceArea: PropTypes.func,
  setIsThin: PropTypes.func,
  setListOfThicknessData: PropTypes.func,
  analysisComplete: PropTypes.bool,
  setAnalysisComplete: PropTypes.func,
  showCheckmark: PropTypes.bool,
  setShowCheckmark: PropTypes.func,
  units: PropTypes.string,
  setFileFor3dModel: PropTypes.func,
  setFileNameForUpload: PropTypes.func,
};

export default StartButton;
