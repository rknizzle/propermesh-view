import { useState } from "react";
import UploadPartButton from "./UploadPartButton/UploadPartButton";
import ViewPartsButton from "./ViewPartsButton/ViewPartsButton";
import ModelViewer from "./3dModelViewer/3dModelViewer";
import UnitsSelector from "./UnitsSelector/UnitsSelector";
import GeoAnalysisBox from "./GeoAnalysisBox/GeoAnalysisBox";
import { Row, Col } from "antd";

const AnalysisPage = () => {
  const [fileFor3dModel, setFileFor3dModel] = useState(null);
  const [partId, setPartId] = useState(null);

  return (
    <div>
      <h1 style={{ fontFamily: '"Roboto", sans-serif' }}>Analysis Page</h1>
      <Row>
        <Col span={6}>
          <GeoAnalysisBox partId={partId} />
        </Col>
      </Row>
      <UploadPartButton
        setFileFor3dModel={setFileFor3dModel}
        setPartId={setPartId}
      />
      <ViewPartsButton
        setFileFor3dModel={setFileFor3dModel}
        setPartId={setPartId}
      />
      <ModelViewer fileFor3dModel={fileFor3dModel} />
      <UnitsSelector partId={partId} />
    </div>
  );
};

export default AnalysisPage;
