import { useState, useEffect, useRef } from "react";
import { Row, Col, Typography, Segmented } from "antd";
const { Text } = Typography;
import "./thickAnalysisBox.css";
import DisplayStatistic from "../DisplayStatistic/DisplayStatistic";
import StartButton from "./StartButton/StartButton";
import PropTypes from "prop-types";
import DecimalInput from "./DecimalInput";
import { retrieveBlob, storeBlob } from "./utils/indexedDBBlobStorage";
import { downloadPlyFilePlaceIn3dViewer } from "./utils/downloadPlyToViewer";

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

  // Clear the thickness box when a new part is loaded
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

  // populate the thickness box fields if the results exist for the given threshold & units
  const maybePopulateThicknessBoxWithExistingResult = (inputThreshold) => {
    //get the data from listOfThicknessData that matches the threshold value and units value
    const data = listOfThicknessData.find(
      (data) =>
        Number(data.threshold) == Number(inputThreshold) && data.units === units
    );
    if (data) {
      setThinSurfaceArea(data.thin_surface_area);
      setIsThin(data.is_thin);
      setThresholdValue(inputThreshold);
      setSelectedThreshold(Number(inputThreshold));
      setShowCheckmark(true);
      setAnalysisComplete(true);

      placeThicknessVisualizationIn3DViewer(data);
    }
  };

  // Get the thickness visualization file from the local indexedDB storage if
  // its there or fall back to downloading the file from the server and then
  // place the file in the model viewer
  const placeThicknessVisualizationIn3DViewer = async (data) => {
    try {
      const blob = await retrieveBlob(data.part_id, data.units, data.threshold);
      if (blob) {
        setFileNameForUpload("file.ply");
        const file = new File([blob], "file.ply", { type: blob.type });
        setFileFor3dModel(file);
      } else {
        if (listOfThicknessData.find((data) => data.id === data.id)) {
          downloadPlyFilePlaceIn3dViewer(
            data.id,
            data.part_id,
            data.units,
            data.threshold,
            setFileFor3dModel,
            setFileNameForUpload,
            storeBlob
          );
        }
      }
    } catch (error) {
      console.error("Failed to load PLY from IndexedDB:", error);
    }
  };

  const onChangeThresholdInput = (value) => {
    setThresholdValue(value);
    setSelectedThreshold(Number(value));

    // reset all populated fields when the theshold value gets changed
    setFileNameForUpload(originalFileNameForUpload);
    setFileFor3dModel(originalFileFor3dModel);
    setThinSurfaceArea(null);
    setIsThin(null);
    setShowCheckmark(false);
    setAnalysisComplete(false);

    // populate the fields again if there are existing results for this threshold
    maybePopulateThicknessBoxWithExistingResult(value);
  };

  const renderThinAreaMessage = () => {
    if (isThin === null) return;
    return isThin ? (
      <Text type="danger">Thin areas detected</Text>
    ) : (
      <Text type="success">No thin areas detected</Text>
    );
  };

  // If the threshold history grows large enough that it creates a second row,
  // show an animation scrolling between the rows to show to the user that
  // there are more boxes below the top row that they can scroll down to
  useEffect(() => {
    const container = listOfThicknessDataContainerRef.current;
    // if the threshold history is only 1 row; dont show the animation
    if (container && container.scrollHeight <= container.clientHeight) {
      return;
    }

    return createThresholdHistoryScrollAnimation();

    function createThresholdHistoryScrollAnimation() {
      const timer = setTimeout(() => {
        container.scrollBy({ top: 100, behavior: "smooth" });
        setTimeout(() => {
          container.scrollBy({ top: -100, behavior: "smooth" });
        }, 800);
      }, 1000);
      return () => clearTimeout(timer);
    }
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
              onChange={onChangeThresholdInput}
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
                    onChange={maybePopulateThicknessBoxWithExistingResult}
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
