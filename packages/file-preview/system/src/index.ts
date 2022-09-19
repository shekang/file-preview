import type {PreviewParameters, PreviewResult} from '@file-detail/shared';
import {isMac, isWindows} from '@file-detail/shared';

const shell = require('shelljs');

export const preview = async (
	previewParameters: PreviewParameters,
): Promise<PreviewResult> => {
	let command = null;
	if (isMac) {
		command = `qlmanage -t -o ${previewParameters.output} -s 1080 ${previewParameters.input}`;
	}

	const data = shell.exec(command);
	return {
		...previewParameters,
		images: data.code === 0 ? [`${previewParameters.output}.png`] : [],
	};
};
