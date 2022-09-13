import { generateMetaData } from '../dist';
import {  resolve } from 'path'
describe('@file-detail/meta-data', () => {
    const data = global.assetsData.video[0];
    const basePath = resolve(__dirname, '../../../assets/video')
    test(`[meta-data]: ${data.input}`, async () => {
        const meta = await generateMetaData({
            input: resolve(basePath, 'example.ogg'),
            output:'',
            images: [
                resolve(basePath, 'output/example.jpg')
            ]
        });
        console.log('meta', meta)
        global.metaDataIsMatch(meta);

    });

    
});
