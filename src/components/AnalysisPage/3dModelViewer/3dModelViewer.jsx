import { useEffect, useRef, useState } from "react";
import setupThreeScene from "./setupThreeScene";
import PropTypes from "prop-types";
import "./3dModelViewer.css";
import { Switch } from "antd";

//TODO: Add loading spinner if a file is taking a second to load

const ModelViewer = ({
  fileFor3dModel,
  fileNameFor3dModel,
  originalFileFor3dModel,
  originalFileNameFor3dModel,
}) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [showToggle, setShowToggle] = useState(false);
  const [previousFileFor3dModel, setPreviousFileFor3dModel] = useState(null);
  const [previousOriginalFileFor3dModel, setPreviousOriginalFileFor3dModel] =
    useState(null);

  useEffect(() => {
    sceneRef.current = setupThreeScene(canvasRef.current);
  }, []);

  useEffect(() => {
    const isNewFileFor3dModel =
      fileFor3dModel && fileFor3dModel !== previousFileFor3dModel;
    const isNewOriginalFileFor3dModel =
      originalFileFor3dModel &&
      originalFileFor3dModel !== previousOriginalFileFor3dModel;

    const viewingNewPart = isNewFileFor3dModel && isNewOriginalFileFor3dModel;

    if (fileFor3dModel) {
      const fileType = fileNameFor3dModel.split(".").pop().toLowerCase();
      const objectURL = URL.createObjectURL(fileFor3dModel);
      sceneRef.current.loadModel(objectURL, fileType, viewingNewPart);
      URL.revokeObjectURL(objectURL);
      sceneRef.current.clearModel();
      setPreviousFileFor3dModel(fileFor3dModel);
      setPreviousOriginalFileFor3dModel(originalFileFor3dModel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileFor3dModel]);

  useEffect(() => {
    if (fileFor3dModel === originalFileFor3dModel) {
      setShowToggle(false);
    }
    if (fileFor3dModel !== originalFileFor3dModel) {
      setShowToggle(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileFor3dModel, originalFileFor3dModel]);

  const handleToggleChange = (checked) => {
    if (checked) {
      const objectURL = URL.createObjectURL(fileFor3dModel);
      const fileType = fileNameFor3dModel.split(".").pop().toLowerCase();
      sceneRef.current.loadModel(objectURL, fileType, false);
      URL.revokeObjectURL(objectURL);
      sceneRef.current.clearModel();
    }

    if (!checked) {
      const objectURL = URL.createObjectURL(originalFileFor3dModel);
      const fileType = originalFileNameFor3dModel
        .split(".")
        .pop()
        .toLowerCase();
      sceneRef.current.loadModel(objectURL, fileType, false);
      URL.revokeObjectURL(objectURL);
      sceneRef.current.clearModel();
    }
  };

  return (
    <div id="model-viewer-container">
      <canvas ref={canvasRef} id="model-canvas" />
      {showToggle && (
        <div className="model-viewer-toggle">
          <Switch defaultChecked onChange={handleToggleChange} />
        </div>
      )}
    </div>
  );
};

ModelViewer.propTypes = {
  fileFor3dModel: PropTypes.object,
  fileNameFor3dModel: PropTypes.string,
  originalFileFor3dModel: PropTypes.object,
  originalFileNameFor3dModel: PropTypes.string,
};

export default ModelViewer;
