/**
 * 获取资源
 */

let imgExts = ['.jpg', '.jpeg', '.png', '.gif'];
let typeToInitiatorType = {
    'css': 'link',
    'js': 'script',
    'img': 'img'
};
let returnExtWithInitiatorType = (type) => {
    let ext = [];
    if (type === 'script') ext.push('.js');
    else if (type === 'link') ext.push('.css');
    else if (type === 'img') ext = imgExts;
    return ext;
};

let getAllStaticSource = function() {
    var source = [];
    if (window.performance.getEntries) {
        source = window.performance.getEntries();
    }
    return source;
};
let mapInitiatorTypeToFileType: {
    'script': 'js',
    'img': 'img',
    'link': 'css'
};
let source = {
    mapInitiatorTypeToFileType: mapInitiatorTypeToFileType,
    getAllStaticSource: getAllStaticSource,
    getSource(type, sources) {
        var sources = sources || getAllStaticSource();
        var loadingDureations = [];
        var names = [];
        var type = type.toLowerCase();
        sources.forEach(function(source, i) {
            if (source.initiatorType == typeToInitiatorType[type]) {
                let name = source.name;
                let stash = name.lastIndexOf('/');
                let i;
                let exts = returnExtWithInitiatorType(typeToInitiatorType[type]);
                exts.forEach((e, i) => {
                    let idx = name.lastIndexOf(e);
                    if (idx !== -1) i = idx;
                })
                names.push(name.substring(stash, i));
                loadingDureations.push(source.duration);
            }
        });
        return {
            names: names,
            loadingDureations: loadingDureations
        }
    }
};


module.exports = source;
