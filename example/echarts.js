var echarts = require('echarts');
var source = require('../src/app/util/source.js');

/**
 * 测试代码区
 */
;(function() {
    var scriptFilenameReg = /\/([\w\.]+)\.js/g;
    var sources = source.getAllStaticSource();
    var scripts = [];
    var scriptLoadingDuration = [];
    var scriptFilename = [];
    sources.forEach(function(source, i) {
        if (source.initiatorType == 'script') {
            scripts.push(source);
            scriptLoadingDuration.push(source.duration);
            var match = source.name.match(scriptFilenameReg);
            scriptFilename.push(match);
        }
    });

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
        title: {
            text: 'Timing'
        },
        tooltip: {},
        xAxis: {
            data: scriptFilename
        },
        yAxis: {},
        series: [{
            name: 'Timing',
            type: 'bar',
            data: scriptLoadingDuration
        }]
    });
})();
