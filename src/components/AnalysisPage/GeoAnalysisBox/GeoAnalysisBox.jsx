import { Row, Col } from "antd";
import { useState, useEffect } from "react";
import "./geoAnalysisBox.css";
import StartButton from "./StartButton/StartButton";
import GeoStatistic from "./GeoStatistic";
import { InfoCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const GeoAnalysisBox = ({
  partId,
  autoPopAnalysis,
  showCheckmark,
  setShowCheckmark,
  analysisComplete,
  setAnalysisComplete,
}) => {
  const [geoData, setGeoData] = useState(null);
  const [volume, setVolume] = useState(null);
  const [surfaceArea, setSurfaceArea] = useState(null);
  const [numBoundaryEdges, setNumBoundaryEdges] = useState(null);
  const [numShells, setNumShells] = useState(null);

  useEffect(() => {
    setGeoData(null);
    setVolume(null);
    setSurfaceArea(null);
    setNumBoundaryEdges(null);
    setNumShells(null);
  }, [partId]);

  useEffect(() => {
    if (autoPopAnalysis) {
      setVolume(autoPopAnalysis.volume);
      setSurfaceArea(autoPopAnalysis.surface_area);
      setNumBoundaryEdges(autoPopAnalysis.num_boundary_edges);
      setNumShells(autoPopAnalysis.num_shells);
      setShowCheckmark(true);
      setAnalysisComplete(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPopAnalysis]);

  useEffect(() => {
    console.log(geoData);
    if (geoData) {
      setVolume(geoData.volume);
      setSurfaceArea(geoData.surface_area);
      setNumBoundaryEdges(geoData.num_boundary_edges);
      setNumShells(geoData.num_shells);
    }
  }, [geoData]);

  return (
    <div id="geo-analysis-box">
      <h2 id="geo-analysis-title">Geometry Analysis</h2>
      <Row id="geo-top-row">
        <Col span={12}>
          <GeoStatistic title="Volume" value={volume} />
        </Col>
        <Col span={12}>
          <GeoStatistic title="# of Boundary Edges" value={numBoundaryEdges} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <GeoStatistic title="Surface Area" value={surfaceArea} />
        </Col>
        <Col span={12}>
          <GeoStatistic title="# of Shells" value={numShells} />
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
          <StartButton
            partId={partId}
            setGeoData={setGeoData}
            analysisComplete={analysisComplete}
            setAnalysisComplete={setAnalysisComplete}
            showCheckmark={showCheckmark}
            setShowCheckmark={setShowCheckmark}
          />
        </Col>
      </Row>
    </div>
  );
};

GeoAnalysisBox.propTypes = {
  partId: PropTypes.string,
  autoPopAnalysis: PropTypes.object,
  setShowCheckmark: PropTypes.func,
  showCheckmark: PropTypes.bool,
  setAnalysisComplete: PropTypes.func,
  analysisComplete: PropTypes.bool,
};

export default GeoAnalysisBox;
