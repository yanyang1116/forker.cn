import type { Dispatch } from 'redux';
import { EnumArticleStatus } from '@/typing/globalEnum.d';
import storeState from '../state/index';

const setList = (payload: IArticleItem) => {
	return {
		type: 'SET_LIST',
		payload,
	};
};

const setDetail = (payload: IArticleItem) => {
	return {
		type: 'SET_DETAIL',
		payload,
	} as const;
};

const setContent = (payload: string) => {
	return {
		type: 'SET_CONTENT',
		payload,
	} as const;
};

const asyncSetList = () => {
	// 在 action 中 return function，function 会注入形参 dispatch、getState
	return async (dispatch: Dispatch, getState: () => typeof storeState) => {
		// 此 function 中可以写异步方法，如果想修改 store ，通过 dispatch 操作
		const fn: () => Promise<number> = () =>
			new Promise((resolve) => {
				setTimeout(() => {
					resolve(1);
				}, 3000);
			});

		const res = await fn();
		dispatch(
			setList({
				id: '',
				title: 'string',
				abstract: '',
				createTime: res,
				modifyTime: 123,
				author: 'yy',
				original: true,
				tags: ['asdf'],
				status: EnumArticleStatus.Draft,
				views: 123,
				likes: 123,
			})
		);
	};
};

export default {
	setDetail,
	asyncSetList,
	setContent,
	setList,
};
