import * as fs from 'node:fs';
import {supportedExt} from '../types';
import type {IsSupport, PreviewParameters, SupportedType} from '../types';

const pump = require('pump');

const getOutputFileName = (ext?: string) => `${Date.now()}.${ext ?? 'jpg'}`;

async function createRwStream(parameters: PreviewParameters, transformer: any) {
	return new Promise(resolve => {
		const readableStream = fs.createReadStream(parameters.input);
		const writableStream = fs.createWriteStream(parameters.output);
		pump(readableStream, transformer, writableStream, () => {
			resolve(parameters.output);
		});
	});
}

const validateExt = (parameters: PreviewParameters): IsSupport | undefined => {
	const ext = parameters.input.split('.').pop() ?? '';
	const lowerType = ext.toLocaleLowerCase();
	let isSupport;
	for (const k in supportedExt) {
		if (supportedExt[k as SupportedType].includes(lowerType)) {
			isSupport = {
				type: k as SupportedType,
				ext: lowerType,
			};
		}
	}

	return isSupport;
};

export {getOutputFileName, validateExt, createRwStream};
