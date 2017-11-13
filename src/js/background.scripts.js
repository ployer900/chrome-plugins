chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null,
                           {file: 'src/js/content.scripts.js' });
});

/* chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
 *     sendResponse({farewell: 'goodbye'});
 * }) */

