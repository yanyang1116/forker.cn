import articleState from '../state/article';
import type { ReduxAction } from '../index.d';

export default (
	state: typeof articleState = articleState,
	action: ReduxAction
) => {
	switch (action.type) {
		case 'SET_LIST':
			state.list = action.payload;
			return state;

		case 'SET_DETAIL':
			state.detail = action.payload;
			return state;

		case 'SET_CONTENT':
			state.content = action.payload;
			return state;

		default:
			return state;
	}
};
