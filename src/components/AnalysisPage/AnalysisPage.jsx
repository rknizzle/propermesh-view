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
  const [originalFileFor3dModel, setOriginalFileFor3dModel] = useState(null);
  const [partId, setPartId] = useState(null);
  const [geoData, setGeoData] = useState(null);
  //initialize as an array to use the spread operator in startButton.jsx
  const [listOfThicknessData, setListOfThicknessData] = useState([]);
  const [units, setUnits] = useState(null);
  const [fileNameFor3dModel, setFileNameFor3dModel] = useState("");
  const [originalFileNameFor3dModel, setOriginalFileNameFor3dModel] =
    useState("");
  const [showToggle, setShowToggle] = useState(false);

  return (
    <div>
      <Row gutter={16}>
        <Col xs={{ span: 24, order: 5 }} lg={{ span: 6, order: 1 }}>
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
              // setListOfThicknessData/units
              // setFileFor3dModel/fileNameFor3dModel
              // headed to start button
              setListOfThicknessData={setListOfThicknessData}
              units={units}
              setFileFor3dModel={setFileFor3dModel}
              setFileNameFor3dModel={setFileNameFor3dModel}
              originalFileFor3dModel={originalFileFor3dModel}
              originalFileNameFor3dModel={originalFileNameFor3dModel}
              setShowToggle={setShowToggle}
            />
          </div>
          <div id="unit-selector-parent-large">
            <UnitsSelector
              partId={partId}
              units={units}
              setUnits={setUnits}
              setFileFor3dModel={setFileFor3dModel}
              setFileNameFor3dModel={setFileNameFor3dModel}
              originalFileFor3dModel={originalFileFor3dModel}
              originalFileNameFor3dModel={originalFileNameFor3dModel}
            />
          </div>
          <div id="unit-selector-large-placeholder"></div>
        </Col>
        <Col xs={{ span: 24, order: 4 }} lg={{ span: 18, order: 2 }}>
          <ModelViewer
            fileFor3dModel={fileFor3dModel}
            fileNameFor3dModel={fileNameFor3dModel}
            originalFileFor3dModel={originalFileFor3dModel}
            originalFileNameFor3dModel={originalFileNameFor3dModel}
            showToggle={showToggle}
            setShowToggle={setShowToggle}
          />
        </Col>
        <Col
          xs={{ span: 12, order: 1 }}
          lg={{ span: 12, order: 3 }}
          className="upload-view-info-row"
        >
          <UploadPartButton
            setFileFor3dModel={setFileFor3dModel}
            setOriginalFileFor3dModel={setOriginalFileFor3dModel}
            setOriginalFileNameFor3dModel={setOriginalFileNameFor3dModel}
            setPartId={setPartId}
            setUnits={setUnits}
            setFileNameFor3dModel={setFileNameFor3dModel}
          />
        </Col>
        <Col
          xs={{ span: 12, order: 2 }}
          lg={{ span: 12, order: 4 }}
          className="upload-view-info-row"
        >
          <ViewPartsButton
            setFileFor3dModel={setFileFor3dModel}
            setOriginalFileFor3dModel={setOriginalFileFor3dModel}
            setOriginalFileNameFor3dModel={setOriginalFileNameFor3dModel}
            setPartId={setPartId}
            setGeoData={setGeoData}
            setListOfThicknessData={setListOfThicknessData}
            setUnits={setUnits}
            fileNameFor3dModel={fileNameFor3dModel}
            setFileNameFor3dModel={setFileNameFor3dModel}
          />
        </Col>
        <Col xs={{ span: 24, order: 3 }} lg={{ span: 24, order: 5 }}>
          <div id="unit-selector-parent-small">
            <UnitsSelector partId={partId} units={units} setUnits={setUnits} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AnalysisPage;
