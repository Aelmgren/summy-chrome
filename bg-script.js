
function onClickHandler(info, tab) {

  if (info.menuItemId == "summarize") {
    var linkUrl = info.linkUrl;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://192.168.99.100/summaries');
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


    xhr.onreadystatechange = function () {


      if (xhr.readyState === 4) {
        if (xhr.status === 200)
          console.log(xhr.responseText); // 'This is the returned text.'
          window.data = xhr.responseText;
        } else {
          console.log('Error: ' + xhr.status); // An error occurred during the request.
        }
      }
      xhr.send(JSON.stringify({url:encodeURIComponent(linkUrl),lang:"english",sentences:"3"}));
    };

  }





  function jqueryClickHandler(info, tab) {
    var linkUrl = info.linkUrl;
    $.post('http://192.168.99.100/summaries',
    {lang: "english", sentences: 5,
    url: info.linkUrl })
    .done(function( data ) {
      chrome.tabs.executeScript(tab.ib, {
  		code: 'var div = document.createElement("div"); console.log("'+data.summary.replace(/"|'|”/g,"&apos").replace(/\r?\n|\r/g, " ")+'");var summaryData ="' + data.summary.replace(/"|'|”/g,"&apos").replace(/\r?\n|\r/g, " ") + '"; div.textContent = summaryData; div.style.position = "fixed"; div.style.minHeight = "100vh";div.style.width= "30%";  div.style.margin = "20px"; div.style.zIndex="1000000000"; div.style.padding= "10px"; div.style.top="0";div.style.right = "0";div.style.background = "rgba(255,255,255,0.8)"; div.style.borderRadius="5px"; var exitDiv = document.createElement("div"); div.appendChild(exitDiv); exitDiv.innerHTML = "X"; exitDiv.style.padding="10px";exitDiv.style.position = "fixed"; exitDiv.addEventListener("click",function() {this.parentNode.style.display = "none"}); exitDiv.style.zIndex="1000000000000000"; document.body.appendChild(div);'
  	});
       console.log(data);
      });
  }

chrome.contextMenus.onClicked.addListener(jqueryClickHandler);

chrome.runtime.onInstalled.addListener(function() {

  chrome.contextMenus.create({
   "title": "Summarize this article",
   "id": "summarize",
   "contexts": ["link"]
   });

});
