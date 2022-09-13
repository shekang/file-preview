import * as fs from 'node:fs';
import type {MetaData, PreviewResult} from '@file-detail/shared';
import {getOutputFileName, createRwStream} from '@file-detail/shared';

const fileSize = require('filesize');
const sizeOf = require('image-size');
const sharp = require('sharp');
// eslint-disable-next-line @typescript-eslint/naming-convention
const {getColorFromURL, getPaletteFromURL} = require('color-thief-node');

type ImageSize = {
	format: string;
	width: number;
	height: number;
	space: string;
	channels: number;
	depth: string;
	density: number;
	isProgressive: boolean;
	background: Record<string, string>;
	hasProfile: boolean;
	hasAlpha: boolean;
};
type FileInfo = Pick<MetaData, 'name' | 'ext' | 'size' | 'unit'>;
/**
 * Size
 * @param path
 * @returns
 */
const getFileSizeInBytes = (path: string) => {
	const stats = fs.statSync(path);
	const fileSizeInBytes = stats.size;
	return fileSizeInBytes;
};

/**
 * File Info
 * @param PreviewResult
 * @returns
 */
const getFileInfo = ({input}: PreviewResult): FileInfo => {
	const splits = input.split('/');
	const target = splits[splits.length - 1];
	const targetSplit = target.split('.');
	// Const isSupport = isSupport(targetSplit[1]);
	const byte = getFileSizeInBytes(input);
	const output = fileSize(byte, {output: 'array'});
	return {
		name: targetSplit[0],
		ext: targetSplit[1],
		size: output[0],
		unit: output[1],
	};
};

/**
 * Get color
 * @param output
 * @param outputPath
 * @returns
 */
const getColor = async (input: string) => {
	const color = {
		mainColor: [] as number[],
		palette: [] as number[][],
	};
	// Console.log('outputFile', outputFile)
	color.mainColor = await getColorFromURL(input);
	color.palette = await getPaletteFromURL(input);
	return color;
};

/**
 * Perf
 * @param PreviewResult
 * @param width
 * @returns
 */
const getImages = async (previewResult: PreviewResult, width: number): Promise<string[]> => {
	//
	const all = previewResult.images.map((img, i) => {
		let path = img;
		if (fs.statSync(img).size > 2_000_000) {
			const o = `${previewResult.output}/${getOutputFileName()}`;
			path = o;
			const transformer = sharp()
				.resize({width: width > 3096 ? 3096 : width})
				.png({quality: 80});
			return createRwStream(
				{
					input: img,
					output: o,
				},
				transformer,
			);
		}

		return path;
	});
	const imgs = await Promise.all(all);
	return imgs as string[];
};

/**
 * File meta data by images[0]
 * @param
 * @returns
 */
const generateBaseData = async (previewResult: PreviewResult): Promise<MetaData> => {
	const target = previewResult.images;
	const firstThumbnail = target[0];
	// 1. size
	const {width, height}: ImageSize = sizeOf(firstThumbnail);
	// 2. perf images
	const images = await getImages(previewResult, width);
	// 3. color
	const colors = await getColor(images[0]);
	const base: MetaData = {
		width,
		height,
		images,
		...colors,
		...getFileInfo(previewResult),
		total: target.length,
	};
	return base;
};

export const generateMetaData = async (previewResult: PreviewResult): Promise<MetaData> => generateBaseData(previewResult);
