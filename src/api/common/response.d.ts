// export type IR_BreakPointUpload = XOR<
// 	{
// 		finished: boolean;
// 		section: string;
// 	},
// 	{
// 		finished: boolean;
// 		url: string;
// 	}
// >;

export interface IR_BreakPointUpload {
	finished: boolean;
	url?: string;
	section?: string;
}
