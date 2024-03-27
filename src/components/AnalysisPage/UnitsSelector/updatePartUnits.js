export const updatePartUnits = async (partId, units) => {
  try {
    const response = await fetch(`/api/v0/parts/${partId}/units`, {
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
  } catch (error) {
    console.error("Error updating units:", error);
    throw error;
  }
};
