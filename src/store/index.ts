import React from 'react';
import { connect as reduxConnect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { bindActionCreators } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import type { Dispatch } from 'redux';

import rootReducer from './reducer/index';
import logger from './middleware/logger';
import storeAction from './action/index';
import storeState from './state/index';

type KeyOfStoreState = keyof typeof storeState;
type KeyOfStoreAction = keyof typeof storeAction;
type GetAllKey<
	K extends KeyOfStoreState | KeyOfStoreAction,
	T extends 'state' | 'action'
> = K extends K
	? T extends 'state'
		? keyof typeof storeState[K] extends keyof typeof storeState[K]
			? `@${K}/${keyof typeof storeState[K] & string}`
			: never
		: keyof typeof storeAction[K] extends keyof typeof storeAction[K]
		? `$${K}/${keyof typeof storeAction[K] & string}`
		: never
	: never;

type StoreKeys = GetAllKey<KeyOfStoreState, 'state'>;
type ActionKeys = GetAllKey<KeyOfStoreAction, 'action'>;

// 按照规则打成元祖类型
type SpliceStoreKey<
	T,
	S extends '@' | '$' = '@'
> = T extends `${S}${infer F}/${infer Rest}` ? [F, Rest] : never;

export const connect = <K extends (StoreKeys | ActionKeys)[]>(
	keyArr: (StoreKeys | ActionKeys)[]
) => {
	const temp = keyArr.map((key) => {
		const source = key.split('/');
		const scope = source[0].slice(1);
		const _key = source[1];
		return [scope, _key, key]; // ['作用域', '一级 key', '传入的 @global/theme 的 key']
	});
	const mapDispatchToProps = (dispatch: Dispatch) => {
		// 这个地方可以写 any，因为实际类型定义是在 React.FC 里，这里只是运行时赋具体值
		const result: Record<string, any> = {};
		/**
		 * Object.keys 的 ts 问题
		 * https://stackoverflow.com/questions/55012174/why-doesnt-object-keys-return-a-keyof-type-in-typescript
		 * https://stackoverflow.com/questions/70420283/typescript-how-to-correctly-type-key-and-value-parameters-in-object-entries-f
		 */
		const _storeAction = Object.assign(storeAction, null);
		Object.keys(_storeAction).forEach((key: KeyOfStoreAction) => {
			Object.keys(_storeAction[key]).forEach((_key) => {
				result[`$${key}/${_key}`] = _storeAction[key][_key];
			});
		});
		return bindActionCreators(result, dispatch);
	};
	return (
		Cp: React.FC<
			UnionToIntersection<{
				[IK in keyof UnionToIntersection<
					UnionToAnyStrRecord<Extract<ArrToUnion<K>, StoreKeys>>
				>]: SpliceStoreKey<IK>[0] extends KeyOfStoreState
					? SpliceStoreKey<IK>[1] extends keyof typeof storeState[SpliceStoreKey<IK>[0]]
						? typeof storeState[SpliceStoreKey<IK>[0]][SpliceStoreKey<IK>[1]]
						: never
					: never;
			}> & {
				[IK in keyof UnionToIntersection<
					UnionToAnyStrRecord<Extract<ArrToUnion<K>, ActionKeys>>
				>]: SpliceStoreKey<IK, '$'>[0] extends KeyOfStoreAction
					? SpliceStoreKey<
							IK,
							'$'
					  >[1] extends keyof typeof storeAction[SpliceStoreKey<
							IK,
							'$'
					  >[0]]
						? typeof storeAction[SpliceStoreKey<
								IK,
								'$'
						  >[0]][SpliceStoreKey<IK, '$'>[1]]
						: never
					: never;
			}
		>
	) => {
		return reduxConnect((state: typeof storeState) => {
			// 这个地方可以写 any，因为实际类型定义是在 React.FC 里，这里只是运行时赋具体值
			const _state: Record<string, any> = {};
			temp.forEach((item) => {
				_state[`${item[2]}`] = (
					state[item[0] as KeyOfStoreState] as any
				)[item[1]];
			});
			return _state;
			// @ts-ignore TODO 不知道这个类型错误是什么意思，但是具体代码可以正常工作
		}, mapDispatchToProps)(Cp);
	};
};

export default createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware, logger)
);
