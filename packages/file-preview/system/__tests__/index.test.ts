import {preview} from '../dist';

describe('@file-detail/preview-system', () => {
	for (const data of global.assetsData.video) {
		test(`[preview]: ${data.input}`, async () => {
			const result = await preview(data);
            expect(result.images.length).toBeTruthy()
		});
	}
});
