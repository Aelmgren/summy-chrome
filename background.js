// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.
function onClickHandler(info, tab) {

  if (info.menuItemId == "summarize") {
    var linkUrl = info.linkUrl;
    var params = { url: linkUrl, lang: "english", sentences: 3};
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://192.168.99.100/summaries', true);

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {


      if (xhr.readyState === 4) {
        if (xhr.status === 200)
          console.log(xhr.responseText); // 'This is the returned text.'
        } else {
          console.log('Error: ' + xhr.status); // An error occurred during the request.
        }
      }

    xhr.send(JSON.stringify(params));

    };

  }

function jqueryClickHandler(info, tab) {
  var linkUrl = info.linkUrl;
  $.post('http://192.168.99.100/summaries',
  {lang: "english", sentences: 5,
  url: info.linkUrl })
  .done(function( data ) {  console.log(data);  });
}




  //
  // if (info.menuItemId == "radio1" || info.menuItemId == "radio2") {
  //   console.log("radio item " + info.menuItemId +
  //               " was clicked (previous checked state was "  +
  //               info.wasChecked + ")");
  // } else
  //
  //  if (info.menuItemId == "checkbox1" || info.menuItemId == "checkbox2") {
  //   console.log(JSON.stringify(info));
  //   console.log("checkbox item " + info.menuItemId +
  //               " was clicked, state is now: " + info.checked +
  //               " (previous state was " + info.wasChecked + ")");
  //
  // } else {
  //   console.log("item " + info.menuItemId + " was clicked");
  //   console.log("info: " + JSON.stringify(info));
  //   console.log("tab: " + JSON.stringify(tab));
  // }


chrome.contextMenus.onClicked.addListener(jqueryClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  // var contexts = ["page","selection","link","editable","image","video","audio"];
  // var contexts = ["link"];
  //
  // for (var i = 0; i < contexts.length; i++) {
  //   var context = contexts[i];
  //   var title = "Summarize linked article"
  //   var id = chrome.contextMenus.create({"title": title, "contexts":[context],
  //                                        "id": "context" + context});
  //   console.log("'" + context + "' item:" + id);
  // }

  // Create a parent item and two children.
  chrome.contextMenus.create({
   "title": "Summarize this article",
   "id": "summarize",
   "contexts": ["link"]
   });



  // chrome.contextMenus.create(
  //     {"title": "Child 1", "parentId": "parent", "id": "child1"});
  // chrome.contextMenus.create(
  //     {"title": "Child 2", "parentId": "parent", "id": "child2"});
  // console.log("parent child1 child2");
  chrome.contextMenus.create(
    {"title": "Select Algorithm",
    "contexts": ["page","selection"],
    "id": "typeParent"});

  chrome.contextMenus.create({"title": "Edmunson", "type": "radio",
                              "id": "edmunson", "parentId": "typeParent"});
  chrome.contextMenus.create({"title": "Latent Semantic Analysis", "type": "radio",
                              "id": "lsa", "parentId": "typeParent"});
  chrome.contextMenus.create({"title": "Latent Semantic Analysis", "type": "radio",
                              "id": "lsa", "parentId": "typeParent"});

  // Create some checkbox items.
  // chrome.contextMenus.create(
  //     {"title": "Checkbox1", "type": "checkbox", "id": "checkbox1"});
  // chrome.contextMenus.create(
  //     {"title": "Checkbox2", "type": "checkbox", "id": "checkbox2"});
  // console.log("checkbox1 checkbox2");

  // Intentionally create an invalid item, to show off error checking in the
  // create callback.
  // console.log("About to try creating an invalid item - an error about " +
  //     "duplicate item child1 should show up");
  // chrome.contextMenus.create({"title": "Oops", "id": "child1"}, function() {
  //   if (chrome.extension.lastError) {
  //     console.log("Got expected error: " + chrome.extension.lastError.message);
  //   }
  // });
});
