let msg={
  txt: "hello"
}

document.addEventListener("DOMSubtreeModified", function(event){
  chrome.runtime.sendMessage(msg)
});


chrome.tabs.onActivated.addListener(onUpdatedListener);

function onUpdatedListener(tabId, changeInfo, tab) {
    chrome.tabs.get(tabId.tabId, function(tab){
        console.log('New active tab: ' + tab.id)
        console.log(tab.url)
        if(message==true)
        {
          zoomTabId=tab.id
          console.log(zoomTabId)
        }
    });
}
