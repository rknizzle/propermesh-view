import { Row, Col, Statistic } from "antd";
import { useState, useEffect } from "react";
import "./geoAnalysisBox.css";
import StartButton from "./StartButton/StartButton";
import PropTypes from "prop-types";

const GeoAnalysisBox = ({ partId }) => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    console.log("geoData", geoData);
  }, [geoData]);

  return (
    <div id="geo-analysis-box">
      <h2 id="geo-analysis-title">Geometry Analysis</h2>
      <Row id="geo-top-row">
        <Col span={12}>
          <div className="statistic-container">
            <Statistic title="Volume" value={117.5} />
          </div>
        </Col>
        <Col span={12}>
          <Statistic title="# of Boundary Edges" value={12} precision={0} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Statistic title="Surface Area" value={240.7} />
        </Col>
        <Col span={12}>
          <Statistic title="# of Shells" value={3} precision={0} />
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
