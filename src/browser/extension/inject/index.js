import React, { Component } from 'react';
import ReactDom from 'react-dom';
import App from '../../../app/container/App.jsx';

function getAllStaticSource() {
    var source = [];
    if (window.performance.getEntries) {
        source = window.performance.getEntries();
    }
    return source;
}
var sources = getAllStaticSource();
chrome.runtime.sendMessage({ sources: sources }, function(response) {
    console.log(response);
});

ReactDom.render(<App />, document.body);

