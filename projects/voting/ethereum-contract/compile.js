const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const pollPath = path.resolve(__dirname,"contracts","Poll.sol");
console.log('poll contract path: '+pollPath);
const source = fs.readFileSync(pollPath,"utf8");
const output = solc.compile(source,1).contracts;
fs.ensureDirSync(buildPath);// make sure folder exist
for(let contract in output){
    const outputFilePath =contract.replace(':','')+'.json';
    fs.outputJsonSync(
        path.resolve(buildPath,outputFilePath),output[contract]
    );

}

