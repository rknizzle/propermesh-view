export const getPartData = async (partId) => {
  const response = await fetch(`/api/v0/parts/${partId}`);

  if (!response.ok) {
    throw new Error("Failed to get part data.");
  }

  const data = await response.json();
  return data;
};
