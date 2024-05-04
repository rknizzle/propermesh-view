import { useState } from "react";
import { Button, Modal, List } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { downloadBlobToLocalMachine } from "./downloadBlob";
import "./viewPartsButton.css";

const ViewPartsButton = ({
  setFileFor3dModel,
  setPartId,
  setGeoData,
  setListOfThicknessData,
  setUnits,
  fileNameFor3dViewer,
  setFileNameFor3dViewer,
  setOriginalFileFor3dModel,
  setOriginalFileNameForUpload,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [partsData, setPartsData] = useState([]);

  const checkForAnalysisData = (part_id) => {
    fetch(`/api/v0/parts/${part_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.geometry_analysis) {
          setGeoData(data.geometry_analysis);
        }
        if (data.thickness_analyses) {
          setListOfThicknessData(data.thickness_analyses);
        }
        if (data.units) {
          setUnits(data.units);
        } else {
          setUnits(null);
        }
      });
  };

  const downloadPartFileAndPlaceIn3dViewer = (part_id) => {
    fetch(`/api/v0/parts/${part_id}/file`)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], fileNameFor3dViewer, { type: blob.type });
        setFileFor3dModel(file);
        setOriginalFileFor3dModel(file);
      });
  };

  const clicked = () => {
    fetch("/api/v0/parts")
      .then((response) => response.json())
      .then((data) => {
        setPartsData(data);
        setModalOpen(true);
      });
  };

  const downloadFileToLocalMachine = (part_id, fileName) => {
    fetch(`/api/v0/parts/${part_id}/file`)
      .then((res) => res.blob())
      .then((blob) => {
        downloadBlobToLocalMachine(blob, fileName);
      });
  };

  return (
    <div id="view-parts-button-container">
      <Button onClick={clicked} id="view-parts-button">
        View Parts
      </Button>
      <Modal
        title="PARTS"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={768}
        footer={null}
      >
        <div id="parts-list-container">
          <List
            dataSource={partsData}
            renderItem={(part) => (
              <List.Item
                key={part.id}
                actions={[
                  <Button
                    type="link"
                    key={part.id}
                    size="large"
                    icon={<DownloadOutlined id="download-icon" />}
                    onClick={() =>
                      downloadFileToLocalMachine(part.id, part.name)
                    }
                  ></Button>,
                ]}
                onClick={() => {
                  setModalOpen(false);
                  downloadPartFileAndPlaceIn3dViewer(part.id);
                  checkForAnalysisData(part.id);
                  setFileNameFor3dViewer(part.name);
                  setOriginalFileNameForUpload(part.name);
                  setPartId(part.id);
                }}
                className="part-list-item-row"
              >
                <List.Item.Meta title={part.name} key={part.id} />
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </div>
  );
};

ViewPartsButton.propTypes = {
  setFileFor3dModel: PropTypes.func,
  setPartId: PropTypes.func,
  setGeoData: PropTypes.func,
  setListOfThicknessData: PropTypes.func,
  setUnits: PropTypes.func,
  fileNameFor3dViewer: PropTypes.string,
  setFileNameFor3dViewer: PropTypes.func,
  setOriginalFileFor3dModel: PropTypes.func,
  setOriginalFileNameForUpload: PropTypes.func,
};

export default ViewPartsButton;
