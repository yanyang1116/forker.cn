import articleState from '../state/article';

export default (state = { ...articleState }, action: ReduxAction) => {
	switch (action.type) {
		case 'SET_LIST':
			return {
				...state,
				list: action.payload,
			};

		case 'SET_DETAIL':
			return {
				...state,
				detail: action.payload,
			};

		case 'SET_CONTENT':
			return {
				...state,
				content: action.payload,
			};

		default:
			return state;
	}
};
