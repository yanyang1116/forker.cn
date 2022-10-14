import globalState from '../state/global';
import type { ReduxAction } from '../index.d';

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
