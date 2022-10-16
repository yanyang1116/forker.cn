import React, { useEffect } from 'react';
import { EnumArticleStatus } from '@/typing/globalEnum.d';
import { connect } from '@/store/index';
import { useImmer } from '@/hooks/useImmer';

export default connect<
	[
		'$article/setDetail',
		'@global/theme',
		'@article/content',
		'$article/asyncSetList',
		'$global/setTheme'
	]
>([
	'$article/asyncSetList',
	'$article/setDetail',
	'@global/theme',
	'@article/content',
	'$global/setTheme',
])((props) => {
	const a = async () => {
		props['$global/setTheme']();
		// await props['$article/asyncSetList']();
		// await props['$article/setDetail']({
		// 	id: '',
		// 	title: 'fdgasdf',
		// 	abstract: '',
		// 	createTime: 43,
		// 	modifyTime: 3453,
		// 	author: 'afswqr',
		// 	original: true,
		// 	tags: ['asdf'],
		// 	status: EnumArticleStatus.Draft,
		// 	views: 3,
		// 	likes: 3,
		// });
		// console.log(1231231231);
	};
	// return <a onClick={a}>{JSON.stringify(props)}</a>;
	return <a onClick={a}>{props['@global/theme']}</a>;
});
