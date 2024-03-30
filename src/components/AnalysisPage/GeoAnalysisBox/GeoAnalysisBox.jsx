import { Row, Col } from "antd";
import { useState, useEffect } from "react";
import "./geoAnalysisBox.css";
import StartButton from "./StartButton/StartButton";
import GeoStatistic from "./GeoStatistic";
import { InfoCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const GeoAnalysisBox = ({ partId }) => {
  const [geoData, setGeoData] = useState(null);
  const [volume, setVolume] = useState("--");
  const [surfaceArea, setSurfaceArea] = useState("--");
  const [numBoundaryEdges, setNumBoundaryEdges] = useState("--");
  const [numShells, setNumShells] = useState("--");

  useEffect(() => {
    setGeoData(null);
    setVolume("--");
    setSurfaceArea("--");
    setNumBoundaryEdges("--");
    setNumShells("--");
  }, [partId]);

  useEffect(() => {
    console.log(geoData);
    if (geoData) {
      setVolume(geoData.volume);
      setSurfaceArea(geoData.surface_area);
      setNumBoundaryEdges(geoData.num_boundary_edges);
      setNumShells(geoData.num_shells);
    }
  }, [geoData]);

  const displayValue = (value) => {
    if (typeof value !== "number") return value;

    const [integerPart, decimalPart] = value.toString().split(".");

    if (!decimalPart) {
      return integerPart;
    }

    return `${integerPart}.${decimalPart.slice(0, 3)}`;
  };

  return (
    <div id="geo-analysis-box">
      <h2 id="geo-analysis-title">Geometry Analysis</h2>
      <Row id="geo-top-row">
        <Col span={12}>
          <GeoStatistic
            title="Volume"
            value={displayValue(volume)}
            preciseValue={volume}
          />
        </Col>
        <Col span={12}>
          <GeoStatistic
            title="# of Boundary Edges"
            value={displayValue(numBoundaryEdges)}
            preciseValue={numBoundaryEdges}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <GeoStatistic
            title="Surface Area"
            value={displayValue(surfaceArea)}
            preciseValue={surfaceArea}
          />
        </Col>
        <Col span={12}>
          <GeoStatistic
            title="# of Shells"
            value={displayValue(numShells)}
            preciseValue={numShells}
          />
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
