import { Row, Col } from "antd";
import { useState, useEffect } from "react";
import "./geoAnalysisBox.css";
import StartButton from "./StartButton/StartButton";
import DisplayStatistic from "../DisplayStatistic/DisplayStatistic";
import PropTypes from "prop-types";

const GeoAnalysisBox = ({ partId, geoData, setGeoData }) => {
  const [volume, setVolume] = useState(null);
  const [surfaceArea, setSurfaceArea] = useState(null);
  const [numBoundaryEdges, setNumBoundaryEdges] = useState(null);
  const [numShells, setNumShells] = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    setGeoData(null);
    setVolume(null);
    setSurfaceArea(null);
    setNumBoundaryEdges(null);
    setNumShells(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partId]);

  useEffect(() => {
    if (geoData) {
      setVolume(geoData.volume);
      setSurfaceArea(geoData.surface_area);
      setNumBoundaryEdges(geoData.num_boundary_edges);
      setNumShells(geoData.num_shells);
      setShowCheckmark(true);
      setAnalysisComplete(true);
    }
  }, [geoData]);

  return (
    <div id="geo-analysis-box">
      <h2 id="geo-analysis-title">Geometry Analysis</h2>
      <Row id="geo-top-row">
        <Col span={12}>
          <DisplayStatistic title="Volume" value={volume} />
        </Col>
        <Col span={12}>
          <DisplayStatistic
            title="# of Boundary Edges"
            value={numBoundaryEdges}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DisplayStatistic title="Surface Area" value={surfaceArea} />
        </Col>
        <Col span={12}>
          <DisplayStatistic title="# of Shells" value={numShells} />
        </Col>
      </Row>
      <Row id="geo-bottom-row">
        <Col span={24} offset={6}>
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
  geoData: PropTypes.object,
  setGeoData: PropTypes.func,
};

export default GeoAnalysisBox;
