import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { get, set, keys, update, del } from 'idb-keyval';
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
import * as api from '@/api/common/index';

// TODO 可能存在跨 0点 的情况，暂时不需要关心
const today = `${moment(new Date()).format('YYYY-MM-DD')}`;
const todayKey = `${config.stateRecordKey}_${today}`;

keys().then((keys) => {
	if (!keys.includes('breakPointUpload')) {
		set('breakPointUpload', []);
	}
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
		return moment(a as string).isBefore(moment(b as string)) ? -1 : 1;
	});
	lastdayKey = lastdayKey[lastdayKey.length - 2];

	if (!lastdayKey) return;

	// 把最近一天的日期数据分包
	get(lastdayKey)
		.then((iv) => {
			if (!iv) return;
			const _iv = JSON.stringify(iv);
			const totalKey = CryptoJS.MD5(_iv).toString();
			const content = new Blob([_iv]);
			const minSize = 1024 * 1024; // 1mb 一个数据包
			let spliceCount = 0;
			let { size } = content;
			const totalCount = Math.ceil(size / minSize);
			const splice = new Map();
			while (spliceCount < size) {
				const item = content.slice(spliceCount, spliceCount + minSize);
				item.text().then(async (res) => {
					const key = CryptoJS.MD5(res).toString();
					splice.set(key, item);
					if (splice.size === totalCount) {
						// 单独存一个正在续传的数据 -> 保存好之后删除处理过的 -> 然后针对当前这条开始上传
						await update('breakPointUpload', (v: any[]) => {
							return [
								...v,
								{
									totalKey,
									splice,
								},
							];
						});
						// await del('lastdayKey')
						const convertData = (blob: Blob) => {
							const fileReader = new FileReader();
							fileReader.readAsDataURL(blob);
							return new Promise((resolve, reject) => {
								fileReader.onload = (e) => {
									console.log(e?.target?.result);
									resolve(e?.target?.result);
								};
								fileReader.onerror = () => {
									reject('转化失败');
								};
							});
						};
						const iterator = splice[Symbol.iterator]();
						for (const item of iterator) {
							const iterator = splice.keys();
							let iteratorRecord: IteratorResult<string> = {
								done: false,
								value: '',
							};
							const sections: string[] = [];
							while (!iteratorRecord.done) {
								iteratorRecord = iterator.next();
								!iteratorRecord.done &&
									sections.push(iteratorRecord.value);
							}

							const content = await convertData(item[1]);
							const res = await api.breakPointUpload({
								id: totalKey,
								content,
								section: item[0],
								sections: sections,
								suffix: '.json',
							});
							// TODO 拦截器没做好
							// if (res?.data.value)
							console.log(res, 123123);
							debugger;
							// if (res) break
						}
						// splice.forEach(item => {
						// 	api.breakpointResumeUpload({
						// 		id: totalKey,
						// 		content: ,
						// 		section: ,
						// 		sections: splice.keys(),
						// 		suffix: '.json',
						// 	})
						// })
						// console.log(.keys(), splice.values());
					}
				});
				spliceCount += minSize;
			}
		})
		.catch((err) => {
			console.error(err);
		});
});

errorLog();
ReactDOMClient.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
);
