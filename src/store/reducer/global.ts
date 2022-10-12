import globalState from '../state/global';

export default (state = { ...globalState }, action: ReduxAction) => {
	switch (action.type) {
		case 'SET_THEME':
			return {
				...state,
				theme: state.theme === 'dark' ? 'normal' : 'dark',
			};

		default:
			return state;
	}
};
