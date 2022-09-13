import type {PreviewResult, MetaData} from '@file-detail/shared';
import {generateMetaData} from '@file-detail/meta-data';
import type {DetectParameters} from './detect';
import {detect} from './detect';

type PreviewerResult = {
	/** Status */
	status: boolean;
	/** Meta data */
	metaData?: MetaData;
	/** Error msg */
	errorMsg?: string;
};

export const previewer = async (previewerParameters: DetectParameters): Promise<PreviewerResult> => {
	const {status, data} = await detect(previewerParameters);
	const result: PreviewerResult = {
		status: false,
		errorMsg: '',
	};
	if (status) {
		// 1. thumbnail
		const key = 'preview';
		const parseVideo = await import(`@file-detail/preview-${data?.type}`);
		const previewFunc = parseVideo[key];
		if (previewFunc) {
			const previewResult: PreviewResult = await previewFunc(
				previewerParameters.previewParameters,
			);
			// 2. meta data
			result.status = true;
			result.metaData = await generateMetaData(previewResult);
		} else {
			result.status = false;
			result.errorMsg = 'The preview function was not found, please see the convention in `README.md`';
		}
	} else {
		result.status = false;
		result.errorMsg = 'not support';
	}

	return result;
};
