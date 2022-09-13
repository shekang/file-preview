/**
 * Unified type
 */
const unifiedType = 'png';

type IsSupport = {
	/** Category type */
	type: SupportedType;
	/** File ext */
	ext: string;
};
/**
 * SupportType
 */
type SupportedType = keyof typeof supportedExt;

/**
 * Support ext
 */
const supportedExt = {
	af: ['afdesign', 'afphoto', 'afpub'],
	img: [
		'bmp',
		'jpg',
		'jpeg',
		'png',
		'gif',
		'svg',
		'avif',
		'tiff',
		'webp',
		'base64',
		'heic',
		'ico',
		'tif',
		'eps',
	],
	video: [
		'ogg',
		'mp4',
		'mov',
		'm4v',
		'flv',
		'mpg',
		'avi',
		'webm',
		'3gp',
		'swf',
		'wmv',
		'ogv',
		'mkv',
		'ts',
		'dv',
		'3g2',
		'asf',
		'f4v',
		'ogv',
		'trp',
		'vob',
	],
	fonts: ['ttf', 'otf', 'woff'],
	audio: ['mp3', 'wav', 'aac', 'm4a', 'aac', 'flac', 'm4a'],
	office: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'key', 'iwa'],
	design: ['ai', 'psd', 'psb', 'sketch', 'xd'],
	text: ['txt', 'json', 'html', 'xml', 'md'],
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'3d': [
		'glb',
		'obj',
		'3ds',
		'stl',
		'ply',
		'gltf',
		'off',
		'3dm',
		'fbx',
		'dae',
		'wrl',
		'3mf',
		'ifc',
	],
};

export {supportedExt, type SupportedType, type IsSupport, unifiedType};
