/**
 * @file
 * 使用不可变数据修改 state
 * 每次修改成功，都往 indexDB 中写入数值变化的信息：
 * 时间、路径、新值、旧值、设备信息
 *
 * TODO  ↑↑↑
 * 频繁的写入可能有性能问题
 * 1. 可以有策略，比如内存里，积攒 10 条写一次
 * 2. 上面这个策略问题似乎不大，只是用户刷新浏览器，就会把记录中断，有可能最多丢失9条记录，每次写丢失的是1条记录
 * 3. 是否还需要增加一些行为分析，比如：通过 value 的变化，模拟出用户重刷浏览器，路由的完整指向
 * 4. 写入可以考虑 web-worker
 *
 * error 机制
 * 1. window.onerror 捕捉未被捕获的错误，然后把最近一小时的记录发布到服务端
 * 2. 发布用断点续传
 * 3. 传递完后，删除
 * 4. network error 在 api 拦截器单独做（前端可以做，最好是服务端做）
 *
 * 定期清理
 * 每次初始化应用，检查未在断点续传的数据、离当前时间超过一小时的数据，进行清理
 */

import { update } from 'idb-keyval';
import { useImmer as _useImmer } from 'use-immer';

import moment from 'moment';
import config from '@/config/indexDB';

// TODO 可能存在跨 0点 的情况，暂时不需要关心
const today = `${moment(new Date()).format('YYYY-MM-DD')}`;
const todayKey = `${config.stateRecordKey}_${today}`;

export const useImmer = (initValue: any) => {
	const [state, setState] = _useImmer(initValue);
	const wrapperSetState = (value: any) => {
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
				nextValue: value,
				oldValue: state,
				UA: navigator.userAgent,
				type: 'state',
			},
		]);
		setState(value);
	};
	return [state, wrapperSetState];
};
