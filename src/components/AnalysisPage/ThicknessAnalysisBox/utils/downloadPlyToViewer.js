import { notification } from "antd";

const downloadPlyFilePlaceIn3dViewer = async (
  jobId,
  partId,
  units,
  thresholdValue,
  setFileFor3dModel,
  setFileNameFor3dViewer,
  storeBlob
) => {
  let blob = null;
  try {
    const res = await fetch(`/api/v0/thickness/${jobId}/visual/ply`);
    if (!res.ok) {
      throw new Error();
    }
    blob = await res.blob();
    setFileNameFor3dViewer("file.ply");
    const file = new File([blob], "file.ply", { type: blob.type });
    setFileFor3dModel(file);
  } catch (error) {
    console.error("error while loading visualization:", error);
    notification.error({
      message: "Failed to load thickness visualization",
      duration: 4.5,
      placement: "top",
    });
    throw error;
  }

  try {
    return storeBlob(partId, units, thresholdValue, blob);
  } catch (error) {
    // error is being swallowed here, the user does not need to know about it
    // the app will still function correctly
    console.error("error while storing visualization:", error);
  }
};

export { downloadPlyFilePlaceIn3dViewer };
