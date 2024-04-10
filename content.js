// Function to be called when the list is filled
let obj = {};
function handleListFilled() {
  const cityCards = document.querySelectorAll(".address-linktext");

  // Extract information from selected elements
  const cityNames = Array.from(cityCards).map((card) => {
    const addressElement = card.querySelector('span[id^="streetAddress"]');
    const cityElement = card.querySelector('span[id^="city"]');

    return [
      addressElement.id,
      [addressElement.innerText, cityElement.innerText],
    ];
  });

  obj = {
    ...obj,
    ...Object.fromEntries(cityNames),
  };

  // console.log("City names:", obj);
  // Send the extracted information to the background script
  // chrome.runtime.sendMessage({ cities: cityNames });
  // Add your logic here to handle the filled list

  // Iterate over each entry in the object
  Object.entries(obj).forEach(([id, els]) => {
    // Find the element with the specified ID
    const element = document.getElementById(id);

    // Check if the element exists
    if (element) {
      // Create a new <span> element
      const span = document.createElement("span");
      span.textContent = "bimere";

      // Insert the <span> element next to the found element
      // element.insertAdjacentElement("afterend", span);
    } else {
      console.warn(`Element with ID '${id}' not found`);
    }
  });
}

// Select the list-view-body container
const listViewBody = document.querySelector(".list-view-body");

// Create a new MutationObserver instance
const observer = new MutationObserver((mutationsList, observer) => {
  // Check if any child nodes are added to the list-view-body container
  mutationsList.forEach((mutation) => {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      console.error(mutation.addedNodes.length);
      // Call the function to handle the filled list
      handleListFilled();
    } else {
      console.error("done");
    }
  });
});

// Start observing mutations on the list-view-body container
if (listViewBody) {
  observer.observe(listViewBody, { childList: true, subtree: true });
} else {
  console.error("list-view-body container not found");
}
