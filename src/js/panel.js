var $loading = document.getElementById('loading');
var $sourceList = document.getElementById('source-list');

$loading.addEventListener('click', function(e) {
    /* chrome.devtools.inspectedWindow.getResources(function(resources) {
     *     var flag = true;
     *     var len = resources.length;
     *     for (var i = 0; i < len; i++) {
     *         var url = resources[i].url;
     *         var suffix = url.substring(url.lastIndexOf('.') + 1);
     *         if (suffix == 'jpg' && flag) {
     *             resources[i].getContent(function(content, encoding) {
     *                 $sourceList.innerHTML = content;
     *             });
     *             flag = false;
     *         }
     *     }
     * }); */
    
    chrome.tabs.executeScript(null,
                               {file: 'src/js/content.scripts.js' });

    /* chrome.devtools.inspectedWindow.eval('window.performance.getEntries()', function(result, isException) {
     *     if (isException) { alert('exception occure'); }        else alert(JSON.stringify(result));
     * }) */
})


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var sources = request.sources;
    var len = sources.length;
    var url = '';
    for (var i = 0; i < len; i++) {
        url += sources[i].name + '<br/>';
    }
    $sourceList.innerHTML = url;
})
