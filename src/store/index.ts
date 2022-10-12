import React from 'react';
import { connect as reduxConnect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import type { Dispatch } from 'redux';

import rootReducer from './reducer/index';
import storeAction from './action/index';
import storeState from './state/index';

type KeyOfStoreState = keyof typeof storeState;
type KeyOfStoreAction = keyof typeof storeAction;
type GetAllKey<K extends KeyOfStoreState> = K extends K
	? keyof typeof storeState[K] extends keyof typeof storeState[K]
		? `@${K}/${keyof typeof storeState[K] & string}`
		: never
	: never;
type StoreKeys = GetAllKey<KeyOfStoreState>;
type AllAction = Exclude<
	AllKeyPath<typeof storeAction>,
	keyof typeof storeAction
> extends any
	? `$${Exclude<AllKeyPath<typeof storeAction>, keyof typeof storeAction>}`
	: never;

type SpliceStoreKey<
	T,
	S extends '@' | '$' = '@'
> = T extends `${S}${infer F}/${infer Rest}` ? [F, Rest] : never;

export const connect = <K extends (StoreKeys | AllAction)[]>(
	keyArr: (StoreKeys | AllAction)[]
) => {
	const temp = keyArr.map((key) => {
		const source = key.split('/');
		const scope = source[0].slice(1);
		const _key = source[1];
		return [scope, _key, key];
	});
	const mapDispatchToProps = (dispatch: Dispatch) => {
		const result: any = {};

		Object.keys(storeAction).forEach((key: KeyOfStoreAction) => {
			Object.keys(storeAction[key]).forEach((_key) => {
				result[`$${key}/${_key}` as keyof typeof result] = (
					storeAction[key] as any
				)[_key];
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
					UnionToAnyStrRecord<Extract<ArrToUnion<K>, AllAction>>
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
			let _state: Record<string, any> = {};
			temp.forEach((item) => {
				_state[`${item[2]}`] = (
					state[item[0] as KeyOfStoreState] as any
				)[item[1]];
			});
			return _state;
			// @ts-ignore TODO 不知道这个类型错误是什么意思，但是可以达成我的目的
		}, mapDispatchToProps)(Cp);
	};
};

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));
