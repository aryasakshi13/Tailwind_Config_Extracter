// chrome.sidePanel
//    .setPanelBehavior({ openPanelOnActionClick: true})
//    .catch((error) => console.error("Error Starting side panel behaviour:", error));


// // Listen for clicks on the extension toolbar icon
// chrome.action.onClicked.addListener((tab) => {
//   if (!tab.id) return;
  
//   // Toggle our custom injected sidebar window layout directly inside the tab
//   chrome.tabs.sendMessage(tab.id, { action: "TOGGLE_EXTRACTOR_SIDEBAR" }).catch((err) => {
//     console.log("Initializing extension script onto active canvas window area...", err);
//   });
// });

// Listen for clicks on the extension toolbar icon
chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) return;
  
  // Send the message token straight to your scraper listener
  chrome.tabs.sendMessage(tab.id, { action: "TOGGLE_SIDEBAR" }).catch((err) => {
    console.log("Waiting for content script injection connection...", err);
  });
});