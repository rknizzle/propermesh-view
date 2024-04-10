import { useState } from "react";
import UploadPartButton from "./UploadPartButton/UploadPartButton";
import ViewPartsButton from "./ViewPartsButton/ViewPartsButton";
import ModelViewer from "./3dModelViewer/3dModelViewer";
import UnitsSelector from "./UnitsSelector/UnitsSelector";
import GeoAnalysisBox from "./GeoAnalysisBox/GeoAnalysisBox";
import ThickAnalysisBox from "./ThicknessAnalysisBox/ThickAnalysisBox";
import { Row, Col } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./analysisPage.css";

const AnalysisPage = () => {
  const [fileFor3dModel, setFileFor3dModel] = useState(null);
  const [partId, setPartId] = useState(null);
  const [geoData, setGeoData] = useState(null);
  //initialize as an array to use the spread operator in startButton.jsx
  const [listOfThicknessData, setListOfThicknessData] = useState([]);
  const [units, setUnits] = useState(null);

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <div id="geo-hoverInfo-thick-container">
            <GeoAnalysisBox
              partId={partId}
              geoData={geoData}
              setGeoData={setGeoData}
            />
            <div id="hoverInfo-container">
              <span id="hoverInfo-span">
                <InfoCircleOutlined id="hoverInfo-icon" /> indicates precise
                value available on hover
              </span>
            </div>
            <ThickAnalysisBox
              partId={partId}
              listOfThicknessData={listOfThicknessData}
              //setListOfThicknessData and units headed to start button
              setListOfThicknessData={setListOfThicknessData}
              units={units}
            />
          </div>
          <UnitsSelector partId={partId} units={units} setUnits={setUnits} />
        </Col>
        <Col span={18}>
          <div id="model-viewer-container">
            <ModelViewer fileFor3dModel={fileFor3dModel} />
          </div>
        </Col>
      </Row>
      <Row gutter={16} id="upload-view-info-row">
        <Col span={12}>
          <div id="upload-part-button-container">
            <UploadPartButton
              setFileFor3dModel={setFileFor3dModel}
              setPartId={setPartId}
            />
          </div>
        </Col>
        <Col span={12}>
          <div id="view-parts-button-container">
            <ViewPartsButton
              setFileFor3dModel={setFileFor3dModel}
              setPartId={setPartId}
              setGeoData={setGeoData}
              setListOfThicknessData={setListOfThicknessData}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AnalysisPage;
