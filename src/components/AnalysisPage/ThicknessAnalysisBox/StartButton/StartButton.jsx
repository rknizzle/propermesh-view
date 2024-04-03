import { Button } from "antd";
import "./StartButton.css";
import PropTypes from "prop-types";

const StartButton = ({ partId }) => {
  const StartAnalysis = async () => {
    console.log("Starting analysis");
    console.log(partId);
  };

  return (
    <Button type="primary" id="thick-start-button" onClick={StartAnalysis}>
      Start
    </Button>
  );
};

StartButton.propTypes = {
  partId: PropTypes.string,
};

export default StartButton;
