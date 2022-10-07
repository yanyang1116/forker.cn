import articleState from '../state/article';

export default (state = { article: articleState }, action: ReduxAction) => {
	const _state = state.article;
	switch (action.type) {
		case 'SET_LIST':
			return {
				..._state,
				list: action.payload,
			};

		case 'SET_DETAIL':
			return {
				..._state,
				detail: action.payload,
			};

		default:
			return _state;
	}
};
