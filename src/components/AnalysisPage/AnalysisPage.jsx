import { useState } from "react";
import UploadPartButton from "./UploadPartButton/UploadPartButton";
import ViewPartsButton from "./ViewPartsButton/ViewPartsButton";
import ModelViewer from "./3dModelViewer/3dModelViewer";
import UnitsSelector from "./UnitsSelector/UnitsSelector";
import GeoAnalysisBox from "./GeoAnalysisBox/GeoAnalysisBox";
import ThickAnalysisBox from "./ThicknessAnalysisBox/ThickAnalysisBox";
import { Row, Col } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const AnalysisPage = () => {
  const [fileFor3dModel, setFileFor3dModel] = useState(null);
  const [partId, setPartId] = useState(null);
  const [autoPopAnalysis, setAutoPopAnalysis] = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  return (
    <div>
      <h1 style={{ fontFamily: '"Roboto", sans-serif' }}>Analysis Page</h1>
      <Row>
        <Col span={6}>
          <GeoAnalysisBox
            partId={partId}
            autoPopAnalysis={autoPopAnalysis}
            analysisComplete={analysisComplete}
            setAnalysisComplete={setAnalysisComplete}
            showCheckmark={showCheckmark}
            setShowCheckmark={setShowCheckmark}
          />
          <div style={{ marginTop: 12 }}>
            <span style={{ fontSize: "0.7rem", color: "black" }}>
              <InfoCircleOutlined style={{ color: "#3e498f" }} /> indicates
              precise value available on hover
            </span>
          </div>
          <ThickAnalysisBox partId={partId} />
        </Col>
      </Row>
      <UploadPartButton
        setFileFor3dModel={setFileFor3dModel}
        setPartId={setPartId}
      />
      <ViewPartsButton
        setFileFor3dModel={setFileFor3dModel}
        setPartId={setPartId}
        setAutoPopAnalysis={setAutoPopAnalysis}
        setAnalysisComplete={setAnalysisComplete}
        setShowCheckmark={setShowCheckmark}
      />
      <ModelViewer fileFor3dModel={fileFor3dModel} />
      <UnitsSelector partId={partId} />
    </div>
  );
};

export default AnalysisPage;
