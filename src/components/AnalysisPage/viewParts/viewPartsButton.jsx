import { useState } from "react";
import { Button, Modal, List } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { downloadBlobToLocalMachine } from "./downloadBlob";

const ViewParts = ({ setFileFor3dModel }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [partsData, setPartsData] = useState([]);
  const [fileNameForUpload, setFileNameForUpload] = useState("");

  //not sure if this fetch call was the best approach
  //It's the only way i could get the entire file at the moment
  const uploadPartTo3dModel = (part_id) => {
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

  const downloadFile = (part_id, fileName) => {
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
                    onClick={() => downloadFile(part.id, part.name)}
                  ></Button>,
                ]}
                onClick={() => {
                  setModalOpen(false);
                  uploadPartTo3dModel(part.id);
                  setFileNameForUpload(part.name);
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

ViewParts.propTypes = {
  setFileFor3dModel: PropTypes.func,
};

export default ViewParts;
