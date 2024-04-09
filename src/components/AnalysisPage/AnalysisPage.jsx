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
          <UnitsSelector partId={partId} units={units} setUnits={setUnits} />
        </Col>
        <Col span={18}>
          <ModelViewer fileFor3dModel={fileFor3dModel} />
        </Col>
      </Row>
      <Row>
        <Col span={7}>
          <UploadPartButton
            setFileFor3dModel={setFileFor3dModel}
            setPartId={setPartId}
          />
        </Col>
        <Col span={7}>
          <ViewPartsButton
            setFileFor3dModel={setFileFor3dModel}
            setPartId={setPartId}
            setGeoData={setGeoData}
            setListOfThicknessData={setListOfThicknessData}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AnalysisPage;
