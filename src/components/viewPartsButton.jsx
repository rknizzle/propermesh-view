import { useState } from "react";
import { Button, Modal } from "antd";

const ViewParts = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [partsData, setPartsData] = useState([]);

  const clicked = () => {
    console.log("View Parts button clicked");
    fetch("/api/v0/parts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPartsData(data);
        setModalOpen(true);
      });
  };

  return (
    <>
      <Button onClick={() => clicked()}> View Parts </Button>
      <Modal
        title="Parts"
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setModalOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {partsData.map((part, index) => (
          <p key={index}>{part.name}</p>
        ))}
      </Modal>
    </>
  );
};

export default ViewParts;
