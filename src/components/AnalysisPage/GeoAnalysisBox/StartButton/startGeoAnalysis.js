import API_VERSION from '../../../../API_VERSION'

export const startGeometryAnalysis = async (partId) => {
  const response = await fetch(`/api/${API_VERSION}/geometry/${partId}/start`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to start geometry analysis.");
  }
  return response.json();
};
