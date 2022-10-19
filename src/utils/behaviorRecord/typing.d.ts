export interface IndexDBStateRecordItem {
	time: number;
	path: string;
	oldValue: any;
	UA: string;
	type: 'state' | 'store';
	nextValue?: any;
	payload?: any;
}
