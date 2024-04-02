export const pollForResults = async (jobId) => {
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  let status = "";

  while (status !== "complete") {
    const response = await fetch(`/api/v0/geometry/${jobId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch analysis results");
    }

    const results = await response.json();
    status = results.status;

    if (status !== "complete") {
      await delay(1000);
    } else {
      return results;
    }
  }
};
