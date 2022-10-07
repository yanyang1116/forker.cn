import React, { useEffect } from 'react';
import { connect } from '@/store/index';

export default connect<['@article/detail', '@global/theme']>([
	'@article/detail',
	'@global/theme',
])((props) => {
	return <a>{props['@global/theme']}</a>;
});
