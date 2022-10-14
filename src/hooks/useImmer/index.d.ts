/**
 * 三方包，一般 package.json 里有 main、typing 字段来重定向入口文件
 * 这样做到点击查看定义，实际加载执行文件的目的
 */
import type { ImmerHook } from 'use-immer';

export declare function useImmer<S = any>(
	initialValue: S | (() => S)
): ImmerHook<S>;
