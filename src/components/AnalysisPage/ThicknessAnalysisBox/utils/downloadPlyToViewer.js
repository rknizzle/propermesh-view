const downloadPlyFilePlaceIn3dViewer = (
  jobId,
  partId,
  units,
  thresholdValue,
  setFileFor3dModel,
  setFileNameForUpload,
  storeBlob
) => {
  return fetch(`/api/v0/thickness/${jobId}/visual/ply`)
    .then((res) => res.blob())
    .then((blob) => {
      setFileNameForUpload("file.ply");
      const file = new File([blob], "file.ply", { type: blob.type });
      setFileFor3dModel(file);
      storeBlob(partId, units, thresholdValue, blob);
    })
    .catch((error) => {
      console.error("Error downloading the PLY file:", error);
      throw new Error("Failed to download the PLY file");
    });
};

export { downloadPlyFilePlaceIn3dViewer };
