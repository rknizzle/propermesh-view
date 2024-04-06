import { Button } from "antd";
import "./StartButton.css";
import PropTypes from "prop-types";
import { pollForResults } from "./pollForResults";
import { startThicknessAnalysis } from "./startThickAnalysis";

const StartButton = ({
  partId,
  thresholdValue,
  setThinSurfaceArea,
  setIsThin,
  setListOfThicknessData,
}) => {
  const StartAnalysis = async () => {
    console.log("Starting thickness analysis...");
    try {
      const job = await startThicknessAnalysis(partId, thresholdValue);

      const results = await pollForResults(job.id);

      console.log(results);
      setThinSurfaceArea(results.thin_surface_area);
      setIsThin(results.is_thin);
      //updating listOfThicknessData with newest results
      setListOfThicknessData((prev) => [...prev, results]);
    } catch (error) {
      console.error("Error occured during analyzation.", error);
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
  setIsThin: PropTypes.func,
  setListOfThicknessData: PropTypes.func,
};

export default StartButton;
