var myArr = []
document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ action: 'getArray' }, (response) => {
        if (response && response.data) {
            myArr = response.data;
            console.log(myArr);  
            updateTable()
        }
    });
});

function updateTable() {
    let URL = ''
    let TEXT = ''
    for (let element of myArr) {
        console.log(element);
        chrome.storage.sync.get([element],(data)=>{
            URL = element
            TEXT = JSON.parse(data[element])
            console.log(TEXT + " with URL: " + URL);
            addText(URL,TEXT)
        })
    }
}

function addText(URL,TEXT){
    if (!URL || !TEXT) {
        return;
    }

    const container = document.body.querySelector('.container');

    //creating box div
    const newDiv = document.createElement('div');
    newDiv.className = 'box newdiv';

    //creating text and url div
    const text = document.createElement('div')
    text.textContent = TEXT;
    text.className = 'newdivmini'
    const url = document.createElement('div')
    url.textContent = URL;
    url.className = 'newdivmini'

    //appending
    newDiv.appendChild(url)
    newDiv.appendChild(text)
    container.appendChild(newDiv);

}
