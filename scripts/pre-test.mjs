import ora from 'ora';
const basePath  = process.cwd()
process.env.ASSETS_DATA_PATH = `${basePath}/assets/data.json`
$.env.FORCE_COLOR=3 

const spinner = ora('pre test...').start();
const assets = await globby([`${basePath}/assets`, `!${basePath}/assets/**/output`, `!${basePath}/assets/data.json`])
const assetsData = {}
for(const asset of assets){
    const parentDir = path.resolve(asset, '../')
    const parentName = parentDir.match(/[a-z-_]*$/)[0]
    const outputDir = `${parentDir}/output`
    await fs.ensureDir(outputDir)
    const data = {
            input: asset,
            output: outputDir
    }
    if(!Reflect.has(assetsData, parentName)){
        assetsData[parentName] = []
    }
    assetsData[parentName].push(data)
} 
spinner.stop()
await fs.writeFile(`${basePath}/assets/data.json`, JSON.stringify(assetsData), 'utf8')


