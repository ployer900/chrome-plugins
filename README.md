## background.html和popup.html

* background.html为运行插件扩展的主要功能, 定义了browser action和javascript代码
* popup.html为点击插件后的弹窗

popup.html中的js函数能调用background.html中的js函数


## content scripts（该脚本运行在web页面中，通过注入的方式）

* 该js文件用于与web页面交互，该js代码能获取web页面中的内容信息并且可以对页面做出修改，但是该js不能修改background.html中的dom树
* 该js文件能和background.html中的js功能交互


content scripts注入页面的时机可以通过manifest.json文件控制

* 一直需要注入，使用content_scripts配置项
* 依据情况注入，使用permissions配置项
