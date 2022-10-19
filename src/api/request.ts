/**
 * @file useFetch
 */
import axios, { AxiosRequestConfig } from 'axios';

export type extraHeaders = Record<string, any>;

const sendWrap = (method: 'post' | 'get') => {
	return (path: string, data: any, extraHeaders?: Record<string, any>) => {
		const config: AxiosRequestConfig = {
			baseURL: extraHeaders?.baseURL ?? 'http://localhost:8899/api',
			method,
			url: path,
			withCredentials: !!extraHeaders?.withCredentials, // 跨域是否允许携带 cookie 凭证
			...extraHeaders,
		};
		config.method === 'get' && (config.params = data);
		config.method === 'post' && (config.data = data);
		axios(config);
	};
};

export const useFetch = () => {
	const get = sendWrap('get');
	const post = sendWrap('post');

	return { get, post };
};
