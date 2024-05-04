import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import PropTypes from "prop-types";
import "./uploadPartButton.css";

const { Dragger } = Upload;

const UploadPartButton = ({
  setFileFor3dModel,
  setPartId,
  setUnits,
  setFileNameFor3dModel,
  setOriginalFileFor3dModel,
  setOriginalFileNameFor3dModel,
}) => {
  const [isUploadAllowed, setIsUploadAllowed] = useState(true);

  // These are the file types the backend can handle... but we only support stl in the
  // frontend viewer right now so once we solve the support on the frontend we can go back
  // to this list
  // const acceptedFileTypes = [".stl", ".obj", ".ply", ".gltf", ".glb", ".3mf"];
  const acceptedFileTypes = [".stl"];

  const props = {
    name: "file",
    multiple: false,
    showUploadList: false,
    accept: acceptedFileTypes.join(", "),
    action: "/api/v0/parts",
    onChange(info) {
      const { status } = info.file;

      if (!isUploadAllowed) {
        return;
      }

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setPartId(info.file.response.id);
        setUnits(null);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      setFileNameFor3dModel(file.name);
      setFileFor3dModel(file);
      setOriginalFileNameFor3dModel(file.name);
      setOriginalFileFor3dModel(file);
      return true;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);

      // Prevent multiple files from being uploaded
      if (e.dataTransfer.files.length > 1) {
        setIsUploadAllowed(false);
        message.error("Only one file can be uploaded at a time.");
      }

      // Continue if only one file given
      const file = e.dataTransfer.files[0];
      setFileNameFor3dModel(file.name);

      //checking if the file is an accepted type
      const fileExtension = file.name
        .slice(file.name.lastIndexOf("."))
        .toLowerCase();
      if (!acceptedFileTypes.includes(fileExtension)) {
        message.error(`${file.name} is not a valid file type.`);
        e.preventDefault();
        setIsUploadAllowed(false);
        return;
      }
    },
  };

  return (
    <div id="upload-part-button-container">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined id="drag-icon" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          {/*
            // These are the file types the backend can handle... but we only support stl in the
            // frontend viewer right now so once we solve the support on the frontend we can go back
            // to this list
            Accepted file types: .stl .obj .ply .gltf .glb .3mf
          */}
          Accepted file type: .stl
        </p>
      </Dragger>
    </div>
  );
};

UploadPartButton.propTypes = {
  setFileFor3dModel: PropTypes.func,
  setPartId: PropTypes.func,
  setUnits: PropTypes.func,
  setFileNameFor3dModel: PropTypes.func,
  setOriginalFileFor3dModel: PropTypes.func,
  setOriginalFileNameFor3dModel: PropTypes.func,
};

export default UploadPartButton;
