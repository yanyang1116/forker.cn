export const setList = (payload: any) => {
	return {
		type: 'SET_LIST',
		payload,
	};
};

export const setDetail = (payload: any) => {
	return {
		type: 'SET_DETAIL',
		payload,
	};
};

export default {
	setList,
	setDetail,
};
