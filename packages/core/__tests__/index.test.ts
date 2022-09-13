import { previewer} from '../dist';

describe('@file-detail/core', () => {
    test(`[Previewer]`, async ()=>{
        const data = global.assetsData.video[0]
        console.log('data', data)
        const result = await previewer({
            previewParameters: data
        });
        console.log('result', result)
        expect(result.metaData?.images.length).toBeTruthy()
    })
    
	// for (const data of global.assetsData.video) {
	// 	test(`[previewer]: ${data.input}`, async () => {
	// 		const result = await previewer(data);
    //         console.log('result', result)
    //         expect(result.metaData?.images.length).toBeTruthy()
	// 	});
	// }
});
