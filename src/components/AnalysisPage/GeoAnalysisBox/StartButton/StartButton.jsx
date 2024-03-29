import { useState } from "react";
import { Button, notification } from "antd";
import { startGeometryAnalysis } from "./startGeoAnalysis";
import PropTypes from "prop-types";

const StartButton = ({ partId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startAnalysis = async () => {
    setIsLoading(true);
    try {
      const job = await startGeometryAnalysis(partId);
      console.log("job", job);
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
};

export default StartButton;
