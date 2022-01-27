var contextMenuItem ={
    "id": "tutorial02",
    "title": "Fact check link", /* what appears in the menu */
    "contexts": ['link']  /* to make this appear only when user selects something on page */
}

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener( (clickData) => {
    chrome.tabs.query({active: true, currentWindow:true},
        function(tabs) {
           var activeTab = tabs[0];
           chrome.tabs.sendMessage(activeTab.id, 
               {"link": clickData.linkUrl}
           );
     });
})