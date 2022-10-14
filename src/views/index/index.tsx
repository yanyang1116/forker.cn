import React, { useEffect } from 'react';
import { EnumArticleStatus } from '@/typing/globalEnum.d';
import { connect } from '@/store/index';
import { useImmer } from 'use-immer';
import useState from '../../hooks/_useState';

export default connect<
	[
		'$article/setDetail',
		'@global/theme',
		'@article/content',
		'$article/asyncSetList'
	]
>([
	'$article/asyncSetList',
	'$article/setDetail',
	'@global/theme',
	'@article/content',
])((props) => {
	// const [test, setTest] = useImmer(false, (a) => {
	// 	console.log(123123, a)
	// })
	const [aa, setA] = useState(12313);

	setA(qqqq.dd);

	// const a = async () => {
	// 	setA(qqq.dd);
	// 	// await props['$article/asyncSetList']();
	// 	// await props['$article/setDetail']({
	// 	// 	id: '',
	// 	// 	title: 'fdgasdf',
	// 	// 	abstract: '',
	// 	// 	createTime: 43,
	// 	// 	modifyTime: 3453,
	// 	// 	author: 'afswqr',
	// 	// 	original: true,
	// 	// 	tags: ['asdf'],
	// 	// 	status: EnumArticleStatus.Draft,
	// 	// 	views: 3,
	// 	// 	likes: 3,
	// 	// });
	// 	// console.log(1231231231);
	// };
	// return <a onClick={a}>{JSON.stringify(props)}</a>;
	return <a onClick={a}>{aa}</a>;
});
