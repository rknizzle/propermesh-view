import { useState } from "react";
import { Button, Modal, List } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const ViewParts = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [partsData, setPartsData] = useState([]);

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
        const a = document.createElement("a");
        const href = URL.createObjectURL(blob);
        a.setAttribute("download", fileName);
        document.body.appendChild(a); // apparently, this line is needed to make 'a.click()' work in firefox/ensures that the link is part of the document
        a.href = href;
        a.click(); // Trigger the download
        document.body.removeChild(a); // Clean up by removing the link from the document
        URL.revokeObjectURL(href); // Free up memory by revoking the object URL
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
                onClick={() => console.log(part.id + "row clicked")}
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

export default ViewParts;
