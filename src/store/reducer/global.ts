import globalState from '../state/global';

export default (state = { global: globalState }, action: ReduxAction) => {
	const _state = state.global;
	switch (action.type) {
		case 'SET_THEME':
			return {
				..._state,
				theme: _state.theme === 'dark' ? 'normal' : 'dark',
			};

		default:
			return _state;
	}
};
