/**
 * @file
 * 请求拦截器
 */
import axios, { AxiosRequestConfig } from 'axios';

class Req {
	reqList = new Map();

	static sendWrap(method: 'post' | 'get') {
		return (
			path: string,
			data: any,
			extra?: Omit<AxiosRequestConfig, 'method' | 'url'>
		) => {
			const config: AxiosRequestConfig = {
				baseURL: extra?.baseURL ?? 'http://localhost:8899/api',
				method,
				url: path,
				...extra,
			};
			config.method === 'get' && (config.params = data);
			config.method === 'post' && (config.data = data);
			return axios(config);
		};
	}

	// get、post 分别展示 Promise 两种不同的写法
	async get(...args: Parameters<ReturnType<typeof Req.sendWrap>>) {
		try {
			const res = await Req.sendWrap('get').apply(this, args);
			return res.data;
		} catch (err) {
			console.log(
				`%c【${args['0']}】`,
				'background: red; color: #fff',
				' 请求失败：' + err
			);
			/**
			 * aysnc 函数中 reject
			 * https://stackoverflow.com/questions/42453683/how-to-reject-in-async-await-syntax
			 * 因为，用到的地方是用 .catch 接的，只有 .catch 能接到
			 */
			return Promise.reject(err);
		}
	}

	post(...args: Parameters<ReturnType<typeof Req.sendWrap>>) {
		return Req.sendWrap('post')
			.apply(this, args)
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				console.log(
					`%c【${args['0']}】`,
					'background: red; color: #fff',
					' 请求失败：' + err
				);
				throw err;
			});
	}
}

const reqInstance = new Req();

export type Extra = Parameters<ReturnType<typeof Req.sendWrap>>['2'];
export default reqInstance;
