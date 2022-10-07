import { useState } from 'react';

export default (apiPromise: any) => {
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState();
	const [data, setData] = useState(null);
	setLoading(true);
	apiPromise
		.then((res: any) => {
			setLoading(false);
			setData(res);
		})
		.catch((err: any) => {
			setLoading(false);
			setErr(err);
		});
	return {
		loading,
		err,
		data,
	};
};
