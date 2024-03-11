import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const UploadPart = () => {
  const [isUploadAllowed, setIsUploadAllowed] = useState(true);

  const acceptedFileTypes = [".stl", ".obj", ".ply", ".gltf", ".glb", ".3mf"];

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
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
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
    //i'm not sure of the correct way to identify the units of the file yet. This always defaults to mm, or the files are in mm
    data: {
      units: "mm" || "inches",
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Accepted file types: .stl .obj .ply .gltf .glb .3mf
      </p>
    </Dragger>
  );
};

export default UploadPart;
