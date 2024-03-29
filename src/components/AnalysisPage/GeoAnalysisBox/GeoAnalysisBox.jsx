import { Row, Col } from "antd";
import { useState, useEffect } from "react";
import "./geoAnalysisBox.css";
import StartButton from "./StartButton/StartButton";
import GeoStatistic from "./GeoStatistic";
import { InfoCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const GeoAnalysisBox = ({ partId }) => {
  const [geoData, setGeoData] = useState(null);
  const [volume, setVolume] = useState(null);
  const [surfaceArea, setSurfaceArea] = useState(null);
  const [numBoundaryEdges, setNumBoundaryEdges] = useState(null);
  const [numShells, setNumShells] = useState(null);
  const [roundedVolume, setRoundedVolume] = useState("--");
  const [roundedSurfaceArea, setRoundedSurfaceArea] = useState("--");
  const [roundedNumBoundaryEdges, setRoundedNumBoundaryEdges] = useState("--");
  const [roundedNumShells, setRoundedNumShells] = useState("--");

  useEffect(() => {
    console.log(geoData);
    if (geoData) {
      setVolume(geoData.volume);
      setSurfaceArea(geoData.surface_area);
      setNumBoundaryEdges(geoData.num_boundary_edges);
      setNumShells(geoData.num_shells);
      setRoundedVolume(Math.round(geoData.volume));
      setRoundedSurfaceArea(Math.round(geoData.surface_area));
      setRoundedNumBoundaryEdges(Math.round(geoData.num_boundary_edges));
      setRoundedNumShells(Math.round(geoData.num_shells));
    }
  }, [geoData]);

  return (
    <div id="geo-analysis-box">
      <h2 id="geo-analysis-title">Geometry Analysis</h2>
      <Row id="geo-top-row">
        <Col span={12}>
          <GeoStatistic
            title="Volume"
            value={roundedVolume}
            preciseValue={volume}
          />
        </Col>
        <Col span={12}>
          <GeoStatistic
            title="# of Boundary Edges"
            value={roundedNumBoundaryEdges}
            preciseValue={numBoundaryEdges}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <GeoStatistic
            title="Surface Area"
            value={roundedSurfaceArea}
            preciseValue={surfaceArea}
          />
        </Col>
        <Col span={12}>
          <GeoStatistic
            title="# of Shells"
            value={roundedNumShells}
            preciseValue={numShells}
          />
          {/* <StartButton partId={partId} setGeoData={setGeoData} /> */}
        </Col>
      </Row>
      <Row id="geo-bottom-row">
        <Col span={11} offset={1}>
          <InfoCircleOutlined style={{ color: "#3e498f" }} />{" "}
          <span id="info-circle-explain">
            indicates precise value available on hover
          </span>
        </Col>
        <Col span={12}>
          <StartButton partId={partId} setGeoData={setGeoData} />
        </Col>
      </Row>
    </div>
  );
};

GeoAnalysisBox.propTypes = {
  partId: PropTypes.string,
};

export default GeoAnalysisBox;
