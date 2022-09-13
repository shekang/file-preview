import inquirer from 'inquirer';
const baseUrl = path.resolve(__dirname, '../')
const filePreview = path.resolve(baseUrl, 'packages/file-preview')
const pkgs = await globby([`${filePreview}/*/package.json`])
const pkgData = []
$.env.FORCE_COLOR=3 
for(const pkg of pkgs) {
    const data =  await fs.readFile(pkg, {
        encoding: 'utf-8'
    })
    pkgData.push({
        name: JSON.parse(data).name
    })
   
}

// console.log('pkgData', pkgData)


const answers = await inquirer.prompt([
    {
      type: 'list',
      message: 'Select the package capability to develop',
      name: 'core',
      choices: pkgData,
    },
  ])
if(answers.core) {
    $`concurrently \"npm run dev:shared\" \"npm run dev:core\" \"npm run dev:meta\"  \"pnpm -F ${answers.core} dev\"`
}