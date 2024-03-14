import { useState } from "react";
import UploadPart from "./uploadPartButton";
import ViewParts from "./viewPartsButton";
import ModelViewer from "./3D-model-viewer";

const AnalysisPage = () => {
  const [fileFor3dModel, setFileFor3dModel] = useState(null);

  return (
    <div>
      <h1 style={{ fontFamily: '"Roboto", sans-serif' }}>Analysis Page</h1>
      <UploadPart setFileFor3dModel={setFileFor3dModel} />
      <ViewParts setFileFor3dModel={setFileFor3dModel} />
      <ModelViewer fileFor3dModel={fileFor3dModel} />
    </div>
  );
};

export default AnalysisPage;
