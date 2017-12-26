/** 
 * 定义action
 */
import { createAction } from 'redux-actions';

export const CHANGE_CURRENT_TAB_NAME = 'CHANGE_CURRENT_TAB_NAME';
export const FETCH_STATIC_RESOURCE = 'FETCH_STATIC_RESOURCE';
export const actionFetchStaticResource = createAction(FETCH_STATIC_RESOURCE);
export const actionChangeCurrentTabName = createAction(CHANGE_CURRENT_TAB_NAME);