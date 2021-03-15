document.addEventListener('DOMContentLoaded', function (tab) {
  chrome.windows.getCurrent(function(currentWindow) {
    console.log(currentWindowId = currentWindow.id)
    });
})
