import { createStore } from 'redux';
import { connect as redexConnect } from 'react-redux';

import rootReducer from './reducer/index';
import storeState from './state/index';
import React from 'react';

type KeyOfStoreState = keyof typeof storeState;
type GetAllKey<K extends KeyOfStoreState> = K extends K
	? keyof typeof storeState[K] extends keyof typeof storeState[K]
		? `@${K}/${keyof typeof storeState[K] & string}`
		: never
	: never;
type StoreKeys = GetAllKey<KeyOfStoreState>;

type SpliceStoreKey<T> = T extends `@${infer F}/${infer Rest}`
	? [F, Rest]
	: never;
type GetStoreScopeType<T> = {
	[K in keyof T]: SpliceStoreKey<K>[0] extends KeyOfStoreState
		? SpliceStoreKey<K>[1] extends keyof typeof storeState[SpliceStoreKey<K>[0]]
			? typeof storeState[SpliceStoreKey<K>[0]][SpliceStoreKey<K>[1]]
			: never
		: never;
};

type GGGGGG<T> = T extends [infer F, ...infer Rest] ? F | GGGGGG<Rest> : never;
type PPP<T> = T extends string ? Record<`${T}`, string> : never;

export const connect = <K extends StoreKeys[]>(keyArr: StoreKeys[]) => {
	const temp = keyArr.map((key) => {
		const source = key.split('/');
		const scope = source[0].slice(1);
		const _key = source[1];
		return [scope, _key, key];
	});
	return (
		Cp: React.FC<{
			[IK in keyof UnionToIntersection<
				PPP<GGGGGG<K>>
			>]: SpliceStoreKey<IK>[0] extends KeyOfStoreState
				? SpliceStoreKey<IK>[1] extends keyof typeof storeState[SpliceStoreKey<IK>[0]]
					? typeof storeState[SpliceStoreKey<IK>[0]][SpliceStoreKey<IK>[1]]
					: never
				: never;
		}>
	) => {
		return redexConnect((state: typeof storeState) => {
			let _state: Record<string, any> = {};
			temp.forEach((item) => {
				// @ts-ignore
				_state[`${item[2]}`] = state[item[0]][item[1]];
			});
			return _state;
			// @ts-ignore TODO 不知道这个类型错误是什么意思，但是可以达成我的目的
		})(Cp);
	};
};

export default createStore(rootReducer);
