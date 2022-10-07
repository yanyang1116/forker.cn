interface ArticleItem {
	id: string;
	title: string;
	abstract: string;
	createTime: number;
	author: string;
	original: boolean;
	tags: string[];
}

export default {
	list: [],
	detail: {
		content: '',
		// id: string;
		// title: string;
		// abstract: string;
		// createTime: number;
		// author: string;
		// original: boolean;
		// tags: string[];
	},
};
