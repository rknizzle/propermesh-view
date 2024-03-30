export const pollForResults = async (jobId, setIsLoading, setGeoData) => {
  return new Promise((resolve, reject) => {
    const poll = async () => {
      console.log("polling...");
      try {
        const response = await fetch(`/api/v0/geometry/${jobId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch analysis results");
        }
        const results = await response.json();

        if (results.status === "complete") {
          setIsLoading(false);
          setGeoData(results);
          resolve(results);
        } else {
          setTimeout(poll, 1000);
        }
      } catch (error) {
        reject(error);
      }
    };

    poll();
  });
};
