import util from '../../../app/util/source.js';

var sources = util.getAllStaticSource();
chrome.runtime.sendMessage({ sources: sources }, function(response) {
    console.log(response);
});

