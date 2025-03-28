import API_VERSION from '../../../API_VERSION'

export const updatePartUnits = async (partId, units) => {
  const response = await fetch(`/api/${API_VERSION}/parts/${partId}/units`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ units }),
  });

  if (!response.ok) {
    throw new Error("Failed to update units.");
  }

  const data = await response.json();
  return data;
};
