export const pollForResults = async (jobId, setIsLoading, setGeoData) => {
  console.log("polling...");
  const response = await fetch(`/api/v0/geometry/${jobId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch analysis results");
  }

  const results = await response.json();

  if (results.status === "complete") {
    setIsLoading(false);
    setGeoData(results);
    return results;
  } else {
    setTimeout(() => pollForResults(jobId, setIsLoading, setGeoData), 1000);
  }
};
