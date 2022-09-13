import type {OriginalMetaData} from './file-meta-data';

export type PreviewParameters = {
	/** Input file path */
	input: string;
	/** Output file dir */
	output: string;
	pageSize?: number;
	pageNum?: number;
};

/** Preview result */
export type PreviewResult = {
	images: string[];
	originalMetaData?: OriginalMetaData;
} & PreviewParameters;
export * from './file-meta-data';
export * from './constant';
