import { useState } from "react";
import { Button, Modal, List } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { downloadBlobToLocalMachine } from "./downloadBlob";

const ViewPartsButton = ({
  setFileFor3dModel,
  setPartId,
  setAutoPopAnalysis,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [partsData, setPartsData] = useState([]);
  const [fileNameForUpload, setFileNameForUpload] = useState("");

  const checkForAnalysisData = (part_id) => {
    fetch(`/api/v0/parts/${part_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.geometry_analysis) {
          setAutoPopAnalysis(data.geometry_analysis);
        }
      });
  };

  //not sure if this fetch call was the best approach
  //It's the only way i could get the entire file at the moment
  const downloadPartFileAndPlaceIn3dViewer = (part_id) => {
    fetch(`/api/v0/parts/${part_id}/file`)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], fileNameForUpload, { type: blob.type });
        setFileFor3dModel(file);
      });
  };

  const clicked = () => {
    fetch("/api/v0/parts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
    <>
      <Button onClick={clicked}>View Parts</Button>
      <Modal
        title="Parts"
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={768}
        footer={[
          <Button key="close" onClick={() => setModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        <div
          style={{
            height: 400,
            overflow: "auto",
            padding: "0 16px",
          }}
        >
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
                    icon={<DownloadOutlined />}
                    onClick={() =>
                      downloadFileToLocalMachine(part.id, part.name)
                    }
                  ></Button>,
                ]}
                onClick={() => {
                  setModalOpen(false);
                  downloadPartFileAndPlaceIn3dViewer(part.id);
                  checkForAnalysisData(part.id);
                  setFileNameForUpload(part.name);
                  setPartId(part.id);
                }}
                className="part-list-item-row"
              >
                <List.Item.Meta
                  title={part.name}
                  key={part.id}
                  description={part.file_size_bytes + " bytes"}
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </>
  );
};

ViewPartsButton.propTypes = {
  setFileFor3dModel: PropTypes.func,
  setPartId: PropTypes.func,
  setAutoPopAnalysis: PropTypes.func,
};

export default ViewPartsButton;
