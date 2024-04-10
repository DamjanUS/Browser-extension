// Popup script logic to handle interactions and display city information
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  if (message.cityInfo) {
    const cityInfo = message.cityInfo;
    // Display city information in the popup UI
    document.getElementById("city-info").innerText = JSON.stringify(cityInfo);
  }
});
