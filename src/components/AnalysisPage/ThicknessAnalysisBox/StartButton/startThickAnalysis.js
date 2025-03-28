import API_VERSION from '../../../../API_VERSION'

export const startThicknessAnalysis = async (partId, thresholdValue) => {
  const response = await fetch(`/api/${API_VERSION}/thickness/${partId}/start`, {
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
