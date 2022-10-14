export default () => {
	/**
	 * https://github.com/facebook/create-react-app/issues/3994
	 * 异步任务里用了 babel 似乎不会冒泡到 window ? 待观察
	 *
	 * TODO，这里抛出的运行时是打包后的行数，需要服务端
	 */
	window.addEventListener('error', ({}) => {
		console.log(e, ee, eee, eeee, eeeee);
		return true;
	});
};
