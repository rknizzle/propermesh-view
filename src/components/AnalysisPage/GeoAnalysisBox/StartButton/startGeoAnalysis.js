export const startGeometryAnalysis = async (partId) => {
  const response = await fetch(`/api/v0/geometry/${partId}/start`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to start geometry analysis.");
  }
  return response.json();
};
