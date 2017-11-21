var Shape = require('../lib/canvas.shape.js');

//获取静态资源
function getAllStaticSource() {
    var source = [];
    if (window.performance.getEntries) {
        source = window.performance.getEntries();
    }
    return source;
}

/**
 * 测试代码区
 */
;(function() {
    var canvas = document.getElementById('shape');
    var ctx = canvas.getContext('2d');
    canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = document.documentElement.clientHeight || document.body.clientHeight;

    var sources = getAllStaticSource();
    var scripts = [];
    var scriptLoadingDuration = [];
    sources.forEach(function(source, i) {
        if (source.initiatorType == 'script') {
            scripts.push(source);
            scriptLoadingDuration.push(source.duration);
        }
    });

    var shape = new Shape('shape');
    shape.drawDendrogram({
        legendTitle: '',
        originX: 400,
        originY: 400,
        width: 200,
        height: 200,
        lineWidth: 2,
        offsetX: 20,
        values: scriptLoadingDuration
    });
})();
