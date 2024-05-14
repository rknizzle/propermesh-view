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
}) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [showToggle, setShowToggle] = useState(false);
  const [previousFileFor3dModel, setPreviousFileFor3dModel] = useState(null);
  const [previousOriginalFileFor3dModel, setPreviousOriginalFileFor3dModel] =
    useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    sceneRef.current = setupThreeScene(canvasRef.current);
  }, []);

  // This useEffect hook is used to load the original(gray) file for the 3d model
  // at this point fileFor3dModel === originalFileFor3dModel
  useEffect(() => {
    const isNewFileFor3dModel =
      fileFor3dModel && fileFor3dModel !== previousFileFor3dModel;
    const isNewOriginalFileFor3dModel =
      originalFileFor3dModel &&
      originalFileFor3dModel !== previousOriginalFileFor3dModel;

    const viewingNewPart = isNewFileFor3dModel && isNewOriginalFileFor3dModel;

    if (originalFileFor3dModel) {
      const fileType = fileNameFor3dModel.split(".").pop().toLowerCase();
      const objectURL = URL.createObjectURL(fileFor3dModel);
      sceneRef.current.clearOriginalMesh();
      sceneRef.current.loadModel(objectURL, fileType, viewingNewPart);
      URL.revokeObjectURL(objectURL);
      setPreviousOriginalFileFor3dModel(originalFileFor3dModel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalFileFor3dModel]);

  // This useEffect hook is used to load ply file for the 3d model
  // when the ply file arrives here it has become fileFor3dModel
  useEffect(() => {
    if (fileFor3dModel !== originalFileFor3dModel) {
      const fileType = fileNameFor3dModel.split(".").pop().toLowerCase();
      const objectURL = URL.createObjectURL(fileFor3dModel);
      sceneRef.current.loadModel(objectURL, fileType, false);
      URL.revokeObjectURL(objectURL);
      setPreviousFileFor3dModel(fileFor3dModel);
      setIsChecked(fileType === "ply");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileFor3dModel]);

  useEffect(() => {
    if (fileFor3dModel === originalFileFor3dModel) {
      // when changing threshold values, the original gray/mesh is displayed
      // instead of reloading the entire original gray/mesh file
      sceneRef.current.toggleMesh("original");
      setShowToggle(false);
    } else {
      setShowToggle(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileFor3dModel, originalFileFor3dModel]);

  const handleToggleChange = (checked) => {
    setIsChecked(checked);
    sceneRef.current.toggleMesh(checked ? "ply" : "original");
  };

  return (
    <div id="model-viewer-container">
      <canvas ref={canvasRef} id="model-canvas" />
      {showToggle && (
        <div className="model-viewer-toggle">
          <Switch checked={isChecked} onChange={handleToggleChange} />
        </div>
      )}
    </div>
  );
};

ModelViewer.propTypes = {
  fileFor3dModel: PropTypes.object,
  fileNameFor3dModel: PropTypes.string,
  originalFileFor3dModel: PropTypes.object,
};

export default ModelViewer;
