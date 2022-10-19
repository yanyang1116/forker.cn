import reqInstance from '../request';
import type { Extra } from '../request';
import type { IR_BreakPointUpload } from './response';
import type { IP_BreakPointUpload } from './params';

export const breakPointUpload = (
	data?: IP_BreakPointUpload,
	headers?: Extra
): Promise<{ value: IR_BreakPointUpload; success: boolean }> => {
	return reqInstance.post('/common/breakPointUpload', data, headers);
};
