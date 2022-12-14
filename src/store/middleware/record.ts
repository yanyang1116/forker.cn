import type { Store } from 'redux';
import { update } from 'idb-keyval';
import moment from 'moment';
import config from '@/config/indexDB';

import type { IndexDBStateRecordItem } from '@/utils/behaviorRecord/typing.d';
import type { ReduxAction } from '../index.d';

// TODO 可能存在跨 0点 的情况，暂时不需要关心
const today = `${moment(new Date()).format('YYYY-MM-DD')}`;
const todayKey = `${config.stateRecordKey}_${today}`;

export default (store: Store) => (next: any) => (action: ReduxAction) => {
	console.group(action.type);
	const oldValue = store.getState();
	console.info('before state', oldValue);
	/**
	 * 1. 如果外面是改值，暴露出去的是副本，外面的变化是不会影响里面的
	 * 2. 如果外面是引用，暴露出去的，只是第一层是副本，外面的修改会影响里面
	 * 3. 所以，这里需要用不可变数据。组织直接改引用的操作
	 */
	// update 是异步的，这里主要不想影响下文逻辑，不用等待更新结果
	update(todayKey, (iv: IndexDBStateRecordItem[]) => [
		...iv,
		{
			time: +new Date(),
			path: location.href,
			payload: action.payload,
			oldValue,
			UA: navigator.userAgent,
			type: 'store',
		},
	]);
	const result = next(action);
	console.log('next state', store.getState());
	console.groupEnd();
	return result;
};
