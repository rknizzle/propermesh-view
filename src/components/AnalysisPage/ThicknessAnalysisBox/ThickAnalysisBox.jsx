import { useState, useEffect } from "react";
import { Row, Col, Typography, Segmented } from "antd";
const { Text } = Typography;
import "./thickAnalysisBox.css";
import DisplayStatistic from "../DisplayStatistic";
import StartButton from "./StartButton/StartButton";
import PropTypes from "prop-types";
import DecimalInput from "./DecimalInput";

const ThickAnalysisBox = ({
  partId,
  listOfThicknessData,
  setListOfThicknessData,
  units,
}) => {
  const [thresholdValue, setThresholdValue] = useState(null);
  const [thinSurfaceArea, setThinSurfaceArea] = useState(null);
  const [isThin, setIsThin] = useState(null);
  const [selectedThreshold, setSelectedThreshold] = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    setListOfThicknessData([]);
    setThresholdValue(null);
    setThinSurfaceArea(null);
    setIsThin(null);
    setSelectedThreshold(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partId]);

  const getSpecificDataRegardingThreshold = (value) => {
    //get the data from listOfThicknessData that matches the threshold value
    const data = listOfThicknessData.find((data) => data.threshold === value);
    if (data) {
      setThinSurfaceArea(data.thin_surface_area);
      setIsThin(data.is_thin);
      setThresholdValue(value);
      setSelectedThreshold(value);
      setShowCheckmark(true);
      setAnalysisComplete(true);
    }
  };

  const onChange = (value) => {
    setThresholdValue(value);
    setSelectedThreshold(value);
    setThinSurfaceArea(null);
    setIsThin(null);
    setShowCheckmark(false);
    setAnalysisComplete(false);
    getSpecificDataRegardingThreshold(value);
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
            <DecimalInput value={thresholdValue} onChange={onChange} />
            (mm)
          </div>
        </Col>
        <Col span={6}>
          <StartButton
            partId={partId}
            thresholdValue={thresholdValue}
            setThinSurfaceArea={setThinSurfaceArea}
            setIsThin={setIsThin}
            setListOfThicknessData={setListOfThicknessData}
            analysisComplete={analysisComplete}
            setAnalysisComplete={setAnalysisComplete}
            showCheckmark={showCheckmark}
            setShowCheckmark={setShowCheckmark}
            units={units}
          />
        </Col>
      </Row>
      {listOfThicknessData && (
        <div style={{ marginTop: ".5em" }}>
          <Row>
            <Segmented
              options={listOfThicknessData.map((data) => ({
                label: `${data.threshold}`,
                value: data.threshold,
                key: `${data.threshold}`,
              }))}
              value={selectedThreshold}
              onChange={getSpecificDataRegardingThreshold}
            />
          </Row>
        </div>
      )}
    </div>
  );
};

ThickAnalysisBox.propTypes = {
  partId: PropTypes.string,
  listOfThicknessData: PropTypes.array,
  setListOfThicknessData: PropTypes.func,
  units: PropTypes.string,
};

export default ThickAnalysisBox;
