var $loading = document.getElementById('loading');

/**
 * 执行content.script脚本获取资源信息
 */
$loading.addEventListener('click', function(e) {
    chrome.tabs.executeScript(null, {
        file: 'js/inject.bundle.js'
    });
})

/**
 * 监听资源信息
 * @param  {[type]} request       [description]
 * @param  {[type]} sender        [description]
 * @param  {[type]} sendResponse) {               var sources [description]
 * @return {[type]}               [description]
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var sources = request.sources;
    var scripts = [];
    var csses = [];
    var images = [];
    var scriptLoadingDuration = [];
    var cssLoadingDuration = [];
    var imagesLoadingDuration = [];

    sources.forEach(function(source, i) {
        var initiatorType = source.initiatorType;
        switch(initiatorType) {
            case 'script': 
                scripts.push(source);
                scriptLoadingDuration.push(source.duration);
                break;
            case 'link':
                csses.push(source);
                cssLoadingDuration.push(source.duration);
                break;
            case 'img':
                images.push(source);
                imagesLoadingDuration.push(source.duration);
                break;
            default:
                break;
        }
    });

    sendResponse({
        scripts: scripts,
        csses: csses,
        images: images
    });
});
