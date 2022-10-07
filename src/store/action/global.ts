export const setTheme = (payload: any) => {
	return {
		type: 'SET_THEME',
		payload,
	};
};

export default {
	setTheme,
};
