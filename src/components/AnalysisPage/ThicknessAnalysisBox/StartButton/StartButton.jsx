import { Button } from "antd";
import "./StartButton.css";
import PropTypes from "prop-types";
import { startThicknessAnalysis } from "./startThickAnalysis";

const StartButton = ({ partId, thresholdValue }) => {
  const StartAnalysis = async () => {
    console.log("Starting thickness analysis...");
    try {
      const job = await startThicknessAnalysis(partId, thresholdValue);

      console.log(job);
    } catch (error) {
      console.error("Failed to start thickness analysis.", error);
      return;
    }
  };

  return (
    <Button type="primary" id="thick-start-button" onClick={StartAnalysis}>
      Start
    </Button>
  );
};

StartButton.propTypes = {
  partId: PropTypes.string,
  thresholdValue: PropTypes.number,
};

export default StartButton;
