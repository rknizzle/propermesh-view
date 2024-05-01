import { useState, useEffect, useRef } from "react";
import { Row, Col, Typography, Segmented } from "antd";
const { Text } = Typography;
import "./thickAnalysisBox.css";
import DisplayStatistic from "../DisplayStatistic/DisplayStatistic";
import StartButton from "./StartButton/StartButton";
import PropTypes from "prop-types";
import DecimalInput from "./DecimalInput";
import { retrieveBlob } from "./indexedDBBlobStorage";

const ThickAnalysisBox = ({
  partId,
  listOfThicknessData,
  setListOfThicknessData,
  units,
  setFileFor3dModel,
  setFileNameForUpload,
  originalFileFor3dModel,
  originalFileNameForUpload,
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

  useEffect(() => {
    //**reset state when units change
    setThresholdValue(null);
    setThinSurfaceArea(null);
    setIsThin(null);
    setSelectedThreshold(null);
    setShowCheckmark(false);
    setAnalysisComplete(false);
  }, [units]);

  const getSpecificDataRegardingThreshold = (value) => {
    //get the data from listOfThicknessData that matches the threshold value and units value
    const data = listOfThicknessData.find(
      (data) => Number(data.threshold) == Number(value) && data.units === units //**added units check
    );
    if (data) {
      setThinSurfaceArea(data.thin_surface_area);
      setIsThin(data.is_thin);
      setThresholdValue(value);
      setSelectedThreshold(Number(value));
      setShowCheckmark(true);
      setAnalysisComplete(true);
    }
  };

  async function loadPLYFromIndexedDB(partId, units, thresholdValue) {
    try {
      const blob = await retrieveBlob(partId, units, thresholdValue);
      if (blob) {
        setFileNameForUpload("file.ply");
        const file = new File([blob], "file.ply", { type: blob.type });
        setFileFor3dModel(file);
      }
    } catch (error) {
      console.error("Failed to load PLY from IndexedDB:", error);
    }
  }

  const onChange = (value) => {
    setFileNameForUpload(originalFileNameForUpload);
    setFileFor3dModel(originalFileFor3dModel);
    setThresholdValue(value);
    setSelectedThreshold(Number(value));
    setThinSurfaceArea(null);
    setIsThin(null);
    setShowCheckmark(false);
    setAnalysisComplete(false);
    getSpecificDataRegardingThreshold(value);
    loadPLYFromIndexedDB(partId, units, value);
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
  }, [units, partId]);

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
            <DecimalInput
              value={thresholdValue}
              onChange={onChange}
              units={units}
              partId={partId}
            />
            <div id="threshold-mm">(mm)</div>
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
            setFileFor3dModel={setFileFor3dModel}
            setFileNameForUpload={setFileNameForUpload}
          />
        </Col>
      </Row>
      {listOfThicknessData && (
        <div
          ref={listOfThicknessDataContainerRef}
          id="listOfThicknessData-container"
        >
          <Row wrap={true} gutter={[0, 5]}>
            {listOfThicknessData
              .filter((data) => data.units === units) //**remove data that doesn't match the selected units
              .map((data) => (
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
                    onClick={() =>
                      loadPLYFromIndexedDB(partId, units, data.threshold)
                    }
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
  setFileFor3dModel: PropTypes.func,
  setFileNameForUpload: PropTypes.func,
  originalFileFor3dModel: PropTypes.object,
  originalFileNameForUpload: PropTypes.string,
};

export default ThickAnalysisBox;
