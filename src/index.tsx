import * as ReactDOMClient from 'react-dom/client';
import App from './app';

/**
 * 初始化样式，也可以不需要的，在这个项目的构建中，使用了 postcss reset 的方式
 * 这个地方留着，做一个记录
 */
// import 'normalize.css';
import './assets/global.scss';
import { Provider } from 'react-redux';

ReactDOMClient.createRoot(
	document.getElementById('root') as HTMLElement
).render(<App />);

{
	/* <Provider store={store}> */
}
// <App />
// </Provider>
