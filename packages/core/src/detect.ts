import type {PreviewParameters, IsSupport} from '@file-detail/shared';
import {validateExt} from '@file-detail/shared';

type DetectCallBack = {
	/** Is support ext */
	status: boolean;
	data?: IsSupport;
};

export type DetectParameters = {
	previewParameters: PreviewParameters;
	limitFunc?: (isSupport: IsSupport) => Promise<boolean>;
};

export const detect = async ({previewParameters, limitFunc}: DetectParameters): Promise<DetectCallBack> => {
	// 1. Is support ext
	const extLimit = validateExt(previewParameters);
	if (extLimit) {
		// 2. other limit
		const otherLimit = limitFunc ? await limitFunc(extLimit) : true;
		if (otherLimit) {
			return {
				status: true,
				data: extLimit,
			};
		}
	}

	return {
		status: false,
	};
};
