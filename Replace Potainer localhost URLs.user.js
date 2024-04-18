// ==UserScript==
// @name         Replace Potainer localhost URLs
// @namespace   tampermonkey-replace-localhost-urls
// @version     1.3
// @description Replaces localhost URLs on specific Potainer pages with the full server address, preserving the original port from the URL
// @author      SimonTheCoder
// @match       https://192.168.1.66:9443/*
// @match       https://192.168.1.67:9443/*
// ==/UserScript==

(function() {
  'use strict';

  // Get the current server address
  const serverAddress = window.location.hostname;

  // Replace localhost URLs with the full server address, preserving the original port from the URL
  const replaceURLs = () => {
    const elements = document.querySelectorAll('a[href*="0.0.0.0:"]');
    if(elements.length == 0) return;
    console.log("find elemnt:", elements);
    for (const element of elements) {
      const url = element.href;
      const replacedURL = url.replace('0.0.0.0:', `${serverAddress}:`);
      console.log("replacedURL:",url," -> ", replacedURL);
      element.href = replacedURL;
    }
  };
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === "childList" && document.readyState === "complete") {
        replaceURLs();
      }
    });
  });
  observer.observe(document, { childList: true, subtree: true });
})();
