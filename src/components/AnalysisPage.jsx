import UploadPart from "./uploadPartButton";
import ViewParts from "./viewPartsButton";

const AnalysisPage = () => {
  return (
    <div>
      <h1 style={{ fontFamily: '"Roboto", sans-serif' }}>Analysis Page</h1>
      <UploadPart />
      <ViewParts />
    </div>
  );
};

export default AnalysisPage;
