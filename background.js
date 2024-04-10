// Background script logic to receive city names from content script
// and perform further actions, such as API requests

const getPopulation = (cityName) => {
  // API endpoint for San Francisco population data
  const apiUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/us-cities-demographics/records?select=SUM(count)%20as%20sum_population&where=city%3D%22${encodeURIComponent(
    cityName
  )}%22&group_by=city&limit=20`;

  // Fetch population data from the API
  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Extract population data from the response
      const population =
        data &&
        data.results &&
        data.results[0] &&
        data.results[0].sum_population;
      console.log(`Population of ${cityName}: ${population}`);
      return population || null;
    })
    .catch((error) => {
      console.error("Error fetching population data:", error);
    });
};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.cities) {
    const cityNames = message.cities;
    const promises = Object.entries(cityNames).map(([id, element]) => {
      const address = element[0];
      const city = element[1];
      console.log(id, city);

      return getPopulation(city);
    });
    const populations = await Promise.all(promises);
    console.error(populations);
  }
});
