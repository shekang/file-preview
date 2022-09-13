# File Detail  <a href="https://www.npmjs.com/package/@file-detail/core" target="__bank"><img src="https://img.shields.io/npm/v/@file-detail/core"></a>

Get a preview of any file

## Usage

`$ npm install @file-detail/core`

```javascript
import { previewer }  from '@file-detail/core' 

type PreviewerParameters = {
 previewParameters: PreviewParameters;
 limitFunc?: (isSupport: IsSupport) => Promise<boolean>;
};

const result:PreviewerResult = await previewer(previewerParameters: PreviewerParameters)
console.log('result', result)
// result {
//       status: true,
//       errorMsg: '',
//       metaData: {
//         width: 480,
//         height: 270,
//         images: [
//           '/file-detail/assets/video/output/example.ogg_1662719787838.jpg'
//         ],
//         mainColor: [ 7, 8, 13 ],
//         palette: [ [Array], [Array], [Array], [Array], [Array] ],
//         name: 'example',
//         ext: 'ogg',
//         size: 1.73,
//         unit: 'MB',
//         total: 1
//       }
//     }
```

## Supports

* [X] video
* [ ] image
* [ ] office
* [ ] design
* [ ] text
* [ ] 3d
* [ ] af
