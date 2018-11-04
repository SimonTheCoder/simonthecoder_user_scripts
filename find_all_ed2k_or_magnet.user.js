// ==UserScript==
// @name         find_all_ed2k_or_magnet
// @namespace    NULL
// @version      0.1
// @description  find all ed2k,magnet links
// @author       Simon Shi
// @match        *
// @grant        unsafeWindow
// @run-at       context-menu
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("find_all_ed2k_or_magnet loaded")
    var herf_list = document.getElementsByTagName("A")
    var i = 0
    var results = new Array()
    var results_text = ""
    var split_count = 0
    for(i in herf_list){
        var url_text = herf_list[i].href
        if(url_text == null){
            continue
        }
        if(url_text.startsWith("ed2k:") || url_text.startsWith("magnet")){
            split_count = split_count + 1
            results.push(url_text)
            if(split_count % 15 == 0){
                results_text = results_text + "\n\n\n\n" + decodeURI(url_text)
            }else{
                results_text = results_text + "\n" + decodeURI(url_text)
            }
        }
    }
    console.log(results)
    var newDiv = document.createElement("div");
    newDiv.style.backgroundColor= "#c0ffc0"
    newDiv.innerText=(results_text)
    document.body.appendChild(newDiv)
})();