import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';

/**
 * 初始化样式，也可以不需要的，在这个项目的构建中，使用了 postcss reset 的方式
 * 这个地方留着，做一个记录
 */
// import 'normalize.css';
import '@/assets/global.scss';
import errorLog from '@/utils/errorLog';

import App from './app';
import store from '@/store/index';

errorLog();
ReactDOMClient.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
);
