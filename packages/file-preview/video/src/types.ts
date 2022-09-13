import type {PreviewParameters} from '@file-detail/shared';

export type StandData = {
	/** M3u8 file path */
	m3u8: string;
	/** Hls */
	hls: Array<{
		/** File path */
		path: string;
	}>;
};
export type TranscodingParameters = {
	hls_time?: number;
	hls_base_url?: string;
	start_number?: number;
} & PreviewParameters;
