// TODO type 可以推导一下
import storeAction from './action/index';
type StoreActionKeys = keyof typeof storeAction;

type GetAllFlatFn<K extends StoreActionKeys> = K extends K
	? keyof typeof storeAction[K] extends keyof typeof storeAction[K]
		? typeof storeAction[K][keyof typeof storeAction[K]]
		: never
	: never;
type FlatFn = GetAllFlatFn<keyof typeof storeAction>;

type GetFlatFnReturnType<T extends FlatFn> = T extends T
	? ReturnType<T>
	: never;
type FlatFnReturnType = GetFlatFnReturnType<FlatFn>;

type GetActionTypeKeyUnion<T> = T extends T
	? T extends { type: any }
		? T['type']
		: never
	: never;

type ActionTypeKeyUnion = GetActionTypeKeyUnion<FlatFnReturnType>;

export interface ReduxAction {
	type: ActionTypeKeyUnion;
	payload?: any;
}
