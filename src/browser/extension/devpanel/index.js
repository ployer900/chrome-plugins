import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../../app/store/index.js';
import App from '../../../app/container/App.jsx';
import util from '../../../app/util/source.js';
import {
    actionFetchStaticResource,
    actionChangeCurrentTabName
} from '../../../app/actions/index.js';

/**
 * 执行content.script脚本获取资源信息
 */
function executeScript(name) {
    store.dispatch(actionChangeCurrentTabName(name));
    chrome.tabs.executeScript(null, {
        file: 'js/inject.bundle.js'
    });
}

/**
 * 监听资源信息
 * @param  {[type]} request       [description]
 * @param  {[type]} sender        [description]
 * @param  {[type]} sendResponse) [description]
 * @return {[type]}               [description]
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var sources = request.sources;
    var names = [];
    var loadingDureations = [];
    var type = store.getState().source.currentTabname;
    store.dispatch(actionFetchStaticResource(util.getSource(type, sources)));
});


/**
 * 渲染页面组件
 */
render(
    <Provider store={store}>
        <App getSource={executeScript} />
    </Provider>,
    document.getElementById('main')
);
