// declare module '*.svg';
// declare module '*.webp';

// type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: any };

// declare type XOR<T, U> = T | U extends object
// 	? (Without<T, U> & U) | (Without<U, T> & T)
// 	: T | U;

declare enum EnumArticleType {
	Draft,
	Publish,
	Trash,
}

type ToUnionOfFunction<T> = T extends any ? (x: T) => any : never;
declare type UnionToIntersection<T> = ToUnionOfFunction<T> extends (
	x: infer P
) => any
	? P
	: never;

declare type ArrStringToUnion<K extends string[]> = K extends [
	infer F,
	...infer Rest extends string[]
]
	? F | ArrStringToUnion<Rest>
	: never;

declare type UnionStringToAnyObjUnion<I> = I extends I
	? { placeholder: I } extends { placeholder: I }
		? {
				[K in keyof { placeholder: I } as `${{ placeholder: I }[K] &
					string}`]: any;
		  }
		: never
	: never;
