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
  const [geoData, setGeoData] = useState(null);
  //initialize as an array to use the spread operator in startButton.jsx
  const [listOfThicknessData, setListOfThicknessData] = useState([]);
  const [units, setUnits] = useState(null);

  return (
    <div>
      <h1 style={{ fontFamily: '"Roboto", sans-serif' }}>Analysis Page</h1>
      <Row>
        <Col span={6}>
          <GeoAnalysisBox
            partId={partId}
            geoData={geoData}
            setGeoData={setGeoData}
          />
          <div style={{ marginTop: 12 }}>
            <span style={{ fontSize: "0.7rem", color: "black" }}>
              <InfoCircleOutlined style={{ color: "#3e498f" }} /> indicates
              precise value available on hover
            </span>
          </div>
          <ThickAnalysisBox
            partId={partId}
            listOfThicknessData={listOfThicknessData}
            //setListOfThicknessData and units headed to start button
            setListOfThicknessData={setListOfThicknessData}
            units={units}
          />
        </Col>
      </Row>
      <UploadPartButton
        setFileFor3dModel={setFileFor3dModel}
        setPartId={setPartId}
        setListOfThicknessData={setListOfThicknessData}
      />
      <ViewPartsButton
        setFileFor3dModel={setFileFor3dModel}
        setPartId={setPartId}
        setGeoData={setGeoData}
        setListOfThicknessData={setListOfThicknessData}
      />
      <ModelViewer fileFor3dModel={fileFor3dModel} />
      <UnitsSelector partId={partId} units={units} setUnits={setUnits} />
    </div>
  );
};

export default AnalysisPage;
