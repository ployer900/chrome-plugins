import React, { Component } from 'react'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from '../src/app/container/App.jsx';
import util from '../src/app/util/source.js';
import store from '../src/app/store/index.js';
// import './echarts.js';

render(
	<Provider store={store}>
		<App getSource={util.getSource}/>
	</Provider>,
	document.getElementById('main')
);
