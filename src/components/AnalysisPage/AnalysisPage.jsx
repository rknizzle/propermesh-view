import { useState } from "react";
import UploadPartButton from "./UploadPartButton/UploadPartButton";
import ViewPartsButton from "./ViewPartsButton/ViewPartsButton";
import ModelViewer from "./3dModelViewer/3dModelViewer";
import UnitsSelector from "./UnitsSelector/UnitsSelector";

const AnalysisPage = () => {
  const [fileFor3dModel, setFileFor3dModel] = useState(null);

  return (
    <div>
      <h1 style={{ fontFamily: '"Roboto", sans-serif' }}>Analysis Page</h1>
      <UploadPartButton setFileFor3dModel={setFileFor3dModel} />
      <ViewPartsButton setFileFor3dModel={setFileFor3dModel} />
      <ModelViewer fileFor3dModel={fileFor3dModel} />
      <UnitsSelector fileFor3dModel={fileFor3dModel} />
    </div>
  );
};

export default AnalysisPage;
