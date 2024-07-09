function setupContextMenu() {
    chrome.contextMenus.create({
        id: 'define-word',
        title: 'save-with-link',
        contexts: ['selection']
    });
}

chrome.runtime.onInstalled.addListener(() => {
    setupContextMenu();
});

var cururl = ''
var curtext = []
let arr = []
chrome.contextMenus.onClicked.addListener((data, tab) => {
    console.log("Data saved")
    curtext.push(data.selectionText)
    if (cururl == '') {    //to check if its an empty array
        cururl = tab.url
    }
    if (cururl != tab.url) {       // to check if cururl already exist
        cururl = tab.url
        curtext = []
    }
    //to add a total new
    chrome.storage.sync.set({ [cururl]: JSON.stringify(curtext) }, function () {
        console.log(curtext + " data synced with URL: " + cururl);
        arr.push(cururl)
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getArray') {
        sendResponse({ data:  arr});
    }
    return true;  // Keeps the messaging channel open for async response
});

