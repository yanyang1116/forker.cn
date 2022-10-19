// declare module '*.svg';
// declare module '*.webp';
// type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: any };

// declare type XOR<T, U> = T | U extends object
// 	? (Without<T, U> & U) | (Without<U, T> & T)
// 	: T | U;

import { EnumArticleStatus } from './globalEnum.d';

type ToUnionOfFunction<T> = T extends any ? (x: T) => any : never;
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
declare global {
	interface Window {}
	namespace NodeJS {
		interface ProcessEnv {
			DEPLOY_ENV: 'dev' | 'prd';
			NODE_ENV: 'development' | 'production';
			PUBLIC_URL?: string;
		}
	}

	// 互斥类型
	type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

	// 联合类型转交叉类型
	type UnionToIntersection<T> = ToUnionOfFunction<T> extends (
		x: infer P
	) => any
		? P
		: never;

	// 数组转联合类型（重复会去掉）
	type ArrToUnion<T> = T extends [infer F, ...infer Rest]
		? F | ArrToUnion<Rest>
		: never;

	// 联合类型转 { 联合每一项的值的 string: any } 的数组（不满足 string 类型的联合项会去掉）
	type UnionToAnyStrRecord<T> = T extends string
		? Record<`${T}`, any>
		: never;

	/**
	 * 递归对象所有 key ，返回联合类型：a | a/b，分隔符先固定用 /（注意，这个是不会重复的）
	 * 有除对象之外的嵌套不可以
	 */
	type AllKeyPath<Obj extends Record<string, any>> = {
		[Key in keyof Obj]: Key extends string
			? Obj[Key] extends Record<string, any>
				? Key | `${Key}/${AllKeyPath<Obj[Key]>}`
				: Key
			: never;
	}[keyof Obj];

	/**
	 * 递归对象所有的 key，返回联合类型（重复的会去掉）
	 * 有除对象之外的嵌套不可以
	 */
	type ObjAllKeyUnion<Obj extends Record<string, any>> = {
		[Key in keyof Obj]: Key extends string
			? Obj[Key] extends Record<string, any>
				? Key | `${AllKeyPath<Obj[Key]>}`
				: Key
			: never;
	}[keyof Obj];

	namespace Article {
		interface IArticleItem {
			id: string;
			title: string;
			abstract: string;
			createTime: number;
			modifyTime: number;
			author: string;
			original: boolean;
			tags: string[];
			status: EnumArticleStatus;
			views: number;
			likes: number;
		}
	}
}

// 单纯使用 declare global 关键字申明全局对文件，需要有导出
export {};
