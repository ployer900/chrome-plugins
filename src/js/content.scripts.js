function getAllStaticSource() {
    var source = [];
    if (window.performance.getEntries) {
        source = window.performance.getEntries();
    }
    return source;
}

// console.table(getAllStaticSource());
var sources = getAllStaticSource();
chrome.runtime.sendMessage({ sources: sources }, function(response) {
    console.log(response);
});

