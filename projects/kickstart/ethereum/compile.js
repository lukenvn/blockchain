const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname,"contracts","Campaign.sol");
console.log('campaign path: '+campaignPath);
const source = fs.readFileSync(campaignPath,"utf8");
const output = solc.compile(source,1).contracts;

fs.ensureDirSync(buildPath);// make sure folder exist
console.log('output : '+output);
for(let contract in output){

    const outputFilePath =contract.replace(':','')+'.json';
    fs.outputJsonSync(
        path.resolve(buildPath,outputFilePath),output[contract]
    );

}



