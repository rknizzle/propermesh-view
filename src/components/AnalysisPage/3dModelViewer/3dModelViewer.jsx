import { useEffect, useRef, useState } from "react";
import setupThreeScene from "./setupThreeScene";
import PropTypes from "prop-types";
import "./3dModelViewer.css";

//TODO: Add loading spinner if a file is taking a second to load

const ModelViewer = ({ fileFor3dModel, fileNameFor3dModel }) => {
  const canvasRef = useRef(null);
  const [objectURL, setObjectURL] = useState(null);
  const [fileType, setFileType] = useState(null);

  useEffect(() => {
    if (fileFor3dModel) {
      const url = URL.createObjectURL(fileFor3dModel);
      setObjectURL(url);
      setFileType(fileNameFor3dModel.split(".").pop().toLowerCase());

      return () => {
        URL.revokeObjectURL(url);
      };
    }

    // if i add fileNameFor3dModel in the dependency array, like react wants me to,
    // everything breaks and i have to run docker compose down

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileFor3dModel]);

  useEffect(() => {
    if (!objectURL) return;

    // setupThreeScene returns a cleanup function
    const cleanup = setupThreeScene(canvasRef.current, objectURL, fileType);

    // Call cleanup function when the component unmounts/before re-running the effect
    return () => cleanup();

    // if i add fileType in the dependency array, like react wants me to,
    // everything breaks and i have to run docker compose down

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectURL]);

  return (
    <div id="model-viewer-container">
      <canvas ref={canvasRef} id="model-canvas" />
    </div>
  );
};

ModelViewer.propTypes = {
  fileFor3dModel: PropTypes.object,
  fileNameFor3dModel: PropTypes.string,
};

export default ModelViewer;
