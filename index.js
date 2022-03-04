const { spawnSync } = require('child_process')

console.log('Running command...')

const shell = spawnSync('npm start', { encoding: 'utf-8', shell: true, stdio: 'inherit'})