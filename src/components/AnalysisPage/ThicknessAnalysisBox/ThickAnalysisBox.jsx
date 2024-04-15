import { useState, useEffect, useRef } from "react";
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
  const listOfThicknessDataContainerRef = useRef(null);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = listOfThicknessDataContainerRef.current;
      if (container && container.scrollHeight > container.clientHeight) {
        container.scrollBy({ top: 100, behavior: "smooth" });
        setTimeout(() => {
          container.scrollBy({ top: -100, behavior: "smooth" });
        }, 800);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [partId]);

  return (
    <div id="thick-analysis-box">
      <h2 id="thick-analysis-title">Thickness Analysis</h2>
      <Row id="thick-top-row">
        <Col span={12}>
          <DisplayStatistic title="Thin Surface Area" value={thinSurfaceArea} />
        </Col>
        <Col span={12}>
          <div id="thin-area-message-container">{renderThinAreaMessage()}</div>
        </Col>
      </Row>
      <Row id="thick-bottom-row">
        <Col span={14} offset={1}>
          <div id="decimal-input-container">
            <div id="threshold-input-label">Threshold:</div>
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
        <div
          ref={listOfThicknessDataContainerRef}
          id="listOfThicknessData-container"
        >
          <Row wrap={true} gutter={[0, 5]}>
            {listOfThicknessData.map((data) => (
              //not sure about having the key be the threshold value
              <Col key={data.threshold}>
                <Segmented
                  options={[
                    {
                      label: `${data.threshold}`,
                      value: data.threshold,
                      key: `${data.threshold}`,
                    },
                  ]}
                  value={selectedThreshold}
                  onChange={getSpecificDataRegardingThreshold}
                />
              </Col>
            ))}
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
