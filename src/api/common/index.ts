import { useFetch, extraHeaders } from '../request';

const { get, post } = useFetch();

export const breakPointUpload = (data?: any, headers?: extraHeaders) => {
	post('/common/breakPointUpload', data, headers);
};
