/**
 * @file
 * 在业务代码中，只需要派发 action，action 会通知 reducer 从而修改 state
 * action 的派发：
 * 1. 可以不带任何参数，派发后做的逻辑可以在 reducer 中隐藏
 * 2. 可以把最后的 state ，告知 reducer ，让它来更新
 * 3. 可以是一些逻辑参数，让 reducer 判断，或者是发请求，来更新 state
 */
import article from './article';
import global from './global';

export default {
	article,
	global,
};
