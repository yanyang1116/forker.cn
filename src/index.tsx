import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { get, set, keys } from 'idb-keyval';
import moment from 'moment';
import CryptoJS from 'crypto-js';
import config from '@/config/indexDB';

/**
 * 初始化样式，也可以不需要的，在这个项目的构建中，使用了 postcss reset 的方式
 * 这个地方留着，做一个记录
 */
// import 'normalize.css';
import '@/assets/global.scss';
import errorLog from '@/utils/errorLog';

import App from './app';
import store from '@/store/index';

// TODO 可能存在跨 0点 的情况，暂时不需要关心
const today = `${moment(new Date()).format('YYYY-MM-DD')}`;
const todayKey = `${config.stateRecordKey}_${today}`;
keys().then((keys) => {
	// if (keys.includes(todayKey)) return;
	set(todayKey, []);

	// 获取最近一天的日期 key
	let lastdayKey: string[] | string = keys.filter((key) =>
		(key as string).startsWith(`${config.stateRecordKey}_`)
	) as string[];
	lastdayKey.map((key: string) => {
		return (key as string).replace(`${config.stateRecordKey}_`, '');
	});
	lastdayKey = lastdayKey.sort((a, b) => {
		return moment(a as string).isBefore(moment(b as string)) ? 1 : -1;
	});
	lastdayKey = lastdayKey[lastdayKey.length - 1];
	// 把最近一天的日期数据分包
	get(lastdayKey).then((iv) => {
		if (!iv) return;
		const _iv = JSON.stringify(iv);
		const totalKey = CryptoJS.MD5(_iv).toString();
		const content = new Blob([_iv]);
		// const minSize = 1024 * 500 // 500k 一个数据包
		const minSize = 10;
		let spliceCount = 0;
		let { size } = content;
		const totalCount = Math.ceil(size / minSize);
		const splice = new Map();
		while (spliceCount < size) {
			const item = content.slice(spliceCount, spliceCount + minSize);
			item.text().then((res) => {
				const key = CryptoJS.MD5(res).toString();
				splice.set(key, item);
				/**
				 * N 个数据包，给每一个根据内容 md5 签名
				 * 把签名的 N 个结果发给服务端（服务端返回，目前的签名情况）
				 * 根据签名情况，把本地没传到的切片，开始传输（同时根据签名情况，可以清理本地的传输过的数据）
				 *
				 * totalKey 去服务端拿目前已经有的
				 * 拿到后，删掉 map 里已经有的
				 * 开始上传没有的
				 */
				if (splice.size === totalCount)
					console.log(totalKey, splice.keys(), splice.values());
			});
			spliceCount += minSize;
		}
	});
});

errorLog();
ReactDOMClient.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
);
