import UploadPart from "./uploadPartButton";
import ViewParts from "./viewPartsButton";
import ModelViewer from "./3D-model-viewer";

const AnalysisPage = () => {
  return (
    <div>
      <h1 style={{ fontFamily: '"Roboto", sans-serif' }}>Analysis Page</h1>
      <UploadPart />
      <ViewParts />
      <ModelViewer />
    </div>
  );
};

export default AnalysisPage;
