import { useEffect, useRef, useState } from "react";
import setupThreeScene from "./setupThreeScene";
import PropTypes from "prop-types";
import "./3dModelViewer.css";

//TODO: Add loading spinner if a file is taking a second to load

const ModelViewer = ({ fileFor3dModel }) => {
  const canvasRef = useRef(null);
  const [objectURL, setObjectURL] = useState(null);

  useEffect(() => {
    if (fileFor3dModel) {
      const url = URL.createObjectURL(fileFor3dModel);
      setObjectURL(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [fileFor3dModel]);

  useEffect(() => {
    if (!objectURL) return;

    // setupThreeScene returns a cleanup function
    const cleanup = setupThreeScene(canvasRef.current, objectURL);

    // Call cleanup function when the component unmounts/before re-running the effect
    return () => cleanup();
  }, [objectURL]);

  return (
    <div id="model-viewer-container">
      <canvas ref={canvasRef} id="model-canvas" />
    </div>
  );
};

ModelViewer.propTypes = {
  fileFor3dModel: PropTypes.object,
};

export default ModelViewer;
