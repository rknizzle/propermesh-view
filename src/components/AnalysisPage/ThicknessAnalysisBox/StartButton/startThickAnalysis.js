export const startThicknessAnalysis = async (partId, thresholdValue) => {
  const response = await fetch(`/api/v0/thickness/${partId}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      threshold: thresholdValue,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to start thickness analysis.");
  }
  return response.json();
};
