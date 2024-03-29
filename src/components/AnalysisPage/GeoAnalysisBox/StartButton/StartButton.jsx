import { useState } from "react";
import { Button, notification } from "antd";
import { startGeometryAnalysis } from "./startGeoAnalysis";
import { pollForResults } from "./pollForResults";
import PropTypes from "prop-types";

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

  return (
    <Button
      type="primary"
      loading={isLoading}
      onClick={startAnalysis}
      id="geo-start-button"
    >
      Start
    </Button>
  );
};

StartButton.propTypes = {
  partId: PropTypes.string,
  setGeoData: PropTypes.func,
};

export default StartButton;
