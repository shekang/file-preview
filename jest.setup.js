import fs from 'node:fs';

const path = require('path');

const isMatchHandle = ({
	width,
	height,
	images,
	mainColor,
	palette,
	name,
	ext,
	size,
	unit,
	total,
}) => {
	let isMatch = false;
	const truthy = [width, height, name, ext, size, unit, total];
	const array = [images, mainColor, palette];
	if (truthy.every(v => v) && array.every(v => Array.isArray(v) && v.length)) {
		isMatch = true;
	}

	return isMatch;
};

const asset_data = fs.readFileSync(path.resolve(__dirname, 'assets/data.json'), {
	encoding: 'utf-8',
});
global.assetsData = JSON.parse(asset_data);

global.metaDataIsMatch = data => {
	// Func();
	const isMatch = isMatchHandle(data);
	expect(isMatch).toBeTruthy();
};
