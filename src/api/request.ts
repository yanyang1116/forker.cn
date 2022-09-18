/**
 * @file useFetch
 */
import axios, { AxiosRequestConfig, ResponseType } from 'axios';

export type extraHeaders = Record<string, any> & {
	responseType: ResponseType;
	withCredentials: boolean;
};

const sendWrap = (method: 'post' | 'get') => {
	return (path: string, data: any, extraHeaders?: extraHeaders) => {
		const config: AxiosRequestConfig = {
			baseURL: extraHeaders?.baseURL ?? 'https://demo.com',
			method,
			url: path,
			withCredentials: !!extraHeaders?.withCredentials,
			responseType: extraHeaders?.responseType,
			headers: extraHeaders,
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
