import { Button } from "antd";
import "./StartButton.css";
import PropTypes from "prop-types";
import { pollForResults } from "./pollForResults";
import { startThicknessAnalysis } from "./startThickAnalysis";

const StartButton = ({ partId, thresholdValue, setThinSurfaceArea }) => {
  const StartAnalysis = async () => {
    console.log("Starting thickness analysis...");
    try {
      const job = await startThicknessAnalysis(partId, thresholdValue);

      const results = await pollForResults(job.id);

      console.log(results);
      setThinSurfaceArea(results.thin_surface_area);
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
  setThinSurfaceArea: PropTypes.func,
};

export default StartButton;
