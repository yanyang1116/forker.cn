/**
 * @flie
 * reducer 根据 action 的参数、类型，决定如何更新 state
 * 这里使用了 combineReducers:
 * 1. 每个诸如 acticle、global 的函数实际只返回一个对象
 * 2. 这个对象，就是对应在 state 的一维结构上的具体的 key -> value
 * 3. action -> reducer -> 根据逻辑，返回对象
 * 	  -> 替换当前 key 上的 state 的值 -> 触发渲染（如果被 map 到组件中）
 */
import { combineReducers } from 'redux';
import article from './article';
import global from './global';

export default combineReducers({
	article,
	global,
});
