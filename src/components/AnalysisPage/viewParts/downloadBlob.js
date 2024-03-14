export const downloadBlobToLocalMachine = (blob, fileName) => {
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = fileName;
  document.body.appendChild(a); // This line ensures that the link is part of the document
  a.click(); // Trigger the download
  document.body.removeChild(a); // Clean up by removing the link from the document
  URL.revokeObjectURL(href); // Free up memory by revoking the object URL
};
