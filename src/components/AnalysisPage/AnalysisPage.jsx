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
        <Col xs={{ span: 24, order: 4 }} lg={{ span: 6, order: 1 }}>
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
        <Col xs={{ span: 24, order: 3 }} lg={{ span: 18, order: 2 }}>
          <div id="model-viewer-container">
            <ModelViewer fileFor3dModel={fileFor3dModel} />
          </div>
        </Col>
        <Col
          xs={{ span: 12, order: 1 }}
          lg={{ span: 12, order: 3 }}
          className="upload-view-info-row"
        >
          <UploadPartButton
            setFileFor3dModel={setFileFor3dModel}
            setPartId={setPartId}
          />
        </Col>
        <Col
          xs={{ span: 12, order: 2 }}
          lg={{ span: 12, order: 4 }}
          className="upload-view-info-row"
        >
          <ViewPartsButton
            setFileFor3dModel={setFileFor3dModel}
            setPartId={setPartId}
            setGeoData={setGeoData}
            setListOfThicknessData={setListOfThicknessData}
            setUnits={setUnits}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AnalysisPage;
