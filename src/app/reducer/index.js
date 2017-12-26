import {
	FETCH_STATIC_RESOURCE,
	CHANGE_CURRENT_TAB_NAME
} from '../actions/index.js';
import { combineReducers } from 'redux';


const initialState = {
	currentTabname: '',
	names: [],
	loadingDureations: []
};


export const source = (state = initialState, { type, payload }) => {
	switch(type) {
		case CHANGE_CURRENT_TAB_NAME:
			return Object.assign({}, state, {
				currentTabname: payload
			});
			break;
		case FETCH_STATIC_RESOURCE:
			return Object.assign({}, state, {
				names: payload.names,
				loadingDureations: payload.loadingDureations
			});
			break;
		default:
			return initialState;
			break;
	}
}

export default combineReducers({
	source
})