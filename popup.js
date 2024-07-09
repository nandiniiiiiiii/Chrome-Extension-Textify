document.body.querySelector('.btn').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.sidePanel.open({ tabId: tabs[0].id });
    })
})
