import type { Store } from 'redux';
import { get, set, update } from 'idb-keyval';
import moment from 'moment';
import config from '@/config/indexDB';

import type { ReduxAction } from '../index.d';

// TODO 可能存在跨 0点 的情况，暂时不需要关心
const today = `${moment(new Date()).format('YYYY-MM-DD')}`;
get(`${config.stateRecordKey}_${today}`).then((v) => {
	if (v) return;
	set(`${config.stateRecordKey}_${today}`, []);
});
export default (store: Store) => (next: any) => (action: ReduxAction) => {
	console.group(action.type);
	const oldValue = store.getState();
	console.info('before state', oldValue);
	update(
		`${config.stateRecordKey}_${today}`,
		(iv: IndexDBStateRecordItem[]) => [
			...iv,
			{
				time: +new Date(),
				path: location.href,
				payload: action.payload,
				oldValue,
				UA: navigator.userAgent,
				type: 'store',
			},
		]
	);
	const result = next(action);
	console.log('next state', store.getState());
	console.groupEnd();
	return result;
};
