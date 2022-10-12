import React, { useEffect } from 'react';
import { connect } from '@/store/index';

// const e = [
// 	'$article/setDetail',
// 	'@article/list',
// 	'@article/detail',
// 	'@global/theme',
// ] as const;

export default connect<
	['$article/setDetail', '@global/theme', '@article/content']
>(['$article/setDetail', '@global/theme', '@article/content'])((props) => {
	const a = async () => {
		// await props['$article/setDetail'];
		// props['@global/theme'];
		// props['$article/setDetail']()
		console.log(1231231231);
	};
	return <a onClick={a}>{JSON.stringify(props)}</a>;
});
