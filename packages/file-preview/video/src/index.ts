import type {PreviewParameters, PreviewResult} from '@file-detail/shared';
import {getOutputFileName, emitter} from '@file-detail/shared';
import globby from 'fast-glob';
import {presetHls} from './presets';
import type {TranscodingParameters, StandData} from './types';

const ffmpegPath = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath.path);
export const transcoding = async ({
	input,
	output,
	hls_base_url,
	hls_time,
	start_number,
}: TranscodingParameters): Promise<StandData | Error> => {
	const eventEmitter = emitter.getInstance();
	return new Promise((resolve, reject) => {
		const standData: StandData = {
			m3u8: `${output}/hls.m3u8`,
			hls: [],
		};
		const generateStandData = async () => {
			const globbyPath = [`${output}/*.ts`, `!${output}/*.d.ts`];
			const path = await globby(globbyPath);
			for (const v of (path)) {
				// Const match = v.match(/[0-9]*.ts$/);
				standData.hls.push({
					path: v,
					// Name: match ? match[0] : '',
				});
			}

			return standData;
		};

		ffmpeg()
			.input(input)
			.preset(presetHls)
			.outputOptions([
				// '-codec: copy',
				'-hls_segment_type mpegts', // Convert to ts segment
				`-hls_time ${hls_time ?? 10}`, // Slice duration
				`-start_number ${start_number ?? 0}`, // Start playing from the first segment, for example: 4, then play from 4 * hls_time seconds
				'-hls_list_size 0', // The number of playable playbacks reserved in the Playlist, all are reserved by default
				// '-hls_playlist_type vod', // wait for the sharding to complete before generating m3u8, remove the live mode for real-time playback
				`-hls_base_url ${hls_base_url ?? output}/`,
				`-hls_segment_filename ${output}/d.ts`,
			])
			.on('error', (error: Error) => {
				eventEmitter.clearListeners(['transcoding-progress']);
				reject(error);
			})
			.on('progress', (progress: any) => {
				// eslint-disable-next-line @typescript-eslint/no-floating-promises
				eventEmitter.emit('transcoding-progress', {
					progress,
					m3u8: standData.m3u8,
				});
				// Console.log('progress', progress);
				// console.log('Processing: ' + progress.percent + '% done');
			})
			.on('end', () => {
				eventEmitter.clearListeners(['transcoding-progress']);
				generateStandData().then(resolve).catch(resolve);
			})
			.save(standData.m3u8);
	});
};

export const preview = async (parameters: PreviewParameters): Promise<PreviewResult> => new Promise((resolve, reject) => {
	const target = parameters.input.split('/');
	const outputPath = `${parameters.output}/${target[target.length - 1]}_${getOutputFileName()}`;
	// Config: https://trac.ffmpeg.org/wiki/Chinese_Font_%E4%BB%8E%E8%A7%86%E9%A2%91%E4%B8%AD%E6%AF%8FX%E7%A7%92%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E7%BC%A9%E7%95%A5%E5%9B%BE
	ffmpeg(parameters.input)
		.on('error', (error: Error) => {
			reject(error);
		})
		.on('end', () => {
			resolve({
				...parameters,
				images: [outputPath],
			});
		})
		.outputOptions(['-ss 00:00:1', '-vframes 1'])
		.output(outputPath)
		.run();
});
