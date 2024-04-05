import { useState, useEffect } from "react";
import { Row, Col, InputNumber, Typography, Segmented } from "antd";
const { Text } = Typography;
import "./ThickAnalysisBox.css";
import DisplayStatistic from "../DisplayStatistic";
import StartButton from "./StartButton/StartButton";
import PropTypes from "prop-types";

const ThickAnalysisBox = ({
  partId,
  thickData,
  partsThresholdHistory,
  setPartsThresholdHistory,
}) => {
  const [thresholdValue, setThresholdValue] = useState(null);
  const [thinSurfaceArea, setThinSurfaceArea] = useState(null);
  const [isThin, setIsThin] = useState(null);

  console.log(thickData);

  useEffect(() => {
    if (thickData) {
      setPartsThresholdHistory(thickData.map((data) => data.threshold));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thickData]);

  useEffect(() => {
    setThresholdValue(null);
  }, [partId]);

  const onChange = (value) => {
    setThresholdValue(value);
  };

  const renderThinAreaMessage = () => {
    if (isThin === null) return;
    return isThin ? (
      <Text type="danger">Thin areas detected</Text>
    ) : (
      <Text type="success">No thin areas detected</Text>
    );
  };

  return (
    <div id="thick-analysis-box">
      <h2 id="thick-analysis-title">Thickness Analysis</h2>
      <Row id="thick-top-row">
        <Col span={12}>
          <DisplayStatistic title="Thin Surface Area" value={thinSurfaceArea} />
        </Col>
        <Col span={12}>
          <div
            style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
          >
            {renderThinAreaMessage()}
          </div>
        </Col>
      </Row>
      <Row id="thick-bottom-row">
        <Col span={14} offset={1}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: 16 }}>Threshold:</div>
            <InputNumber
              defaultValue={null}
              value={thresholdValue}
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
            setPartsThresholdHistory={setPartsThresholdHistory}
          />
        </Col>
      </Row>
      {partsThresholdHistory && (
        <div style={{ marginTop: ".5em" }}>
          <Row>
            <Segmented
              options={partsThresholdHistory.map((threshold) => ({
                label: `${threshold}`,
                value: threshold,
                key: `${threshold}`,
              }))}
            />
          </Row>
        </div>
      )}
    </div>
  );
};

ThickAnalysisBox.propTypes = {
  partId: PropTypes.string,
  thickData: PropTypes.array,
  partsThresholdHistory: PropTypes.array,
  setPartsThresholdHistory: PropTypes.func,
};

export default ThickAnalysisBox;
