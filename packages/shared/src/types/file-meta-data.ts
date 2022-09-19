/** Meta data base */
export type Base = {
	/** Name */
	name: string;
	/** Ext */
	ext: string;
	/** Unit */
	unit: string;
	/** Source size */
	size: number;
	/** Width */
	width: number;
	/** Height */
	height: number;
	/** Main color */
	mainColor: number[];
	/** Palette */
	palette: number[][];
	/** Preview  */
	images: string[];
	/** Total */
	total: number;
};
export type Img = {
	/**   TIFF, HEIF, PDF, GIF  WebP */
	pages?: number;
} & Base;

export type Psd = {
	test?: string;
} & Base;

/** OriginalMetaData */
export type OriginalMetaData = Base;

/** Meta data */
export type MetaData = Base;
