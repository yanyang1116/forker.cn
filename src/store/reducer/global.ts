import globalState from '../state/global';
import type { ReduxAction } from '../index.d';

export default (
	state: typeof globalState = globalState,
	action: ReduxAction
) => {
	switch (action.type) {
		case 'SET_THEME':
			state.theme = state.theme === 'dark' ? 'normal' : 'dark';
			return state;

		default:
			return state;
	}
};
