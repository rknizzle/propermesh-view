import { useState } from "react";
import { Row, Col, Statistic, InputNumber } from "antd";
import "./ThickAnalysisBox.css";
import StartButton from "./StartButton/StartButton";
import PropTypes from "prop-types";

const ThickAnalysisBox = ({ partId }) => {
  const [thresholdValue, setThresholdValue] = useState(null);
  const [thinSurfaceArea, setThinSurfaceArea] = useState(null);
  const [isThin, setIsThin] = useState(null);

  const onChange = (value) => {
    setThresholdValue(value);
  };

  return (
    <div id="thick-analysis-box">
      <h2 id="thick-analysis-title">Thickness Analysis</h2>
      <Row id="thick-top-row">
        <Col span={11} offset={0}>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <div style={{ marginRight: 16 }}>Thin surface area:</div>
            <Statistic value={thinSurfaceArea} />
          </div>
          <div
            style={{ display: "flex", alignItems: "flex-start", marginTop: 20 }}
          >
            <div style={{ marginRight: 16 }}>Percentage of thin area:</div>
            <Statistic value={isThin} />
          </div>
        </Col>
      </Row>
      <Row id="thick-bottom-row">
        <Col span={14} offset={1}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: 16 }}>Threshold:</div>
            <InputNumber
              defaultValue={null}
              min={0}
              step={0.01}
              onChange={onChange}
            />
            (mm)
          </div>
        </Col>
        <Col span={6}>
          <StartButton
            partId={partId}
            thresholdValue={thresholdValue}
            setThinSurfaceArea={setThinSurfaceArea}
            setIsThin={setIsThin}
          />
        </Col>
      </Row>
    </div>
  );
};

ThickAnalysisBox.propTypes = {
  partId: PropTypes.string,
};

export default ThickAnalysisBox;
