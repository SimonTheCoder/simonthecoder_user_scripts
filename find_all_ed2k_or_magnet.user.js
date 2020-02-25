// ==UserScript==
// @name         find_all_ed2k_or_magnet
// @namespace    NULL
// @version      0.1
// @description  find all ed2k,magnet links
// @author       Simon Shi
// @include      *
// @match        *
// @grant        unsafeWindow
// @run-at       document-end
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
    var last_text = ""
    var last_type = ""
    var type_ed2k = false
    var type_magnet = false
    var current_type = ""
    for(i in herf_list){
        var url_text = herf_list[i].href
        if(url_text == null){
            continue
        }
        if(url_text == last_text){
            continue
        }
        last_text = url_text
        type_ed2k = url_text.startsWith("ed2k:")
        type_magnet = url_text.startsWith("magnet")
        if(type_ed2k){
            current_type = "type_ed2k"
        }else if(type_magnet){
            current_type = "type_magnet"
        }else{
            current_type = last_type
        }

        if(url_text.startsWith("ed2k:") || url_text.startsWith("magnet")){
            split_count = split_count + 1
            results.push(url_text)
            try{
                if(split_count == 1){
                    results_text = decodeURI(url_text)
                }else if(current_type != last_type){
                    results_text = results_text + "\n\n\n\n" + decodeURI(url_text)
                }else{
                    results_text = results_text + "\n" + decodeURI(url_text)
                }
            }catch(err){
                console.log(err)
                console.log(url_text)
                results_text = results_text + "\n" + url_text
            }
        }
        last_type = current_type
    }
    if(split_count<=0){
        console.log("No ed2k or magnet found. return.")
        return;
    }
    console.log(results)
    var newDiv = document.createElement("div");
    newDiv.style.backgroundColor= "#c0ffc0"
    newDiv.innerText=(results_text)
    document.body.appendChild(newDiv)
})();
