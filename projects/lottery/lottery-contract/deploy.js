const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3')
const {
    interface,
    bytecode
} = require('./compile');
const provider = new HDWalletProvider(
    'exercise receive weather ladder drift dilemma acoustic daring waste absorb object now',
    'https://rinkeby.infura.io/uqqPoR7An6h24eo2GQ57'
);
const web3 = new Web3(provider);

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();
    console.log('attemp to deploy from account ', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: '0x' + bytecode
        })
        .send({
            gas: 5200000,
            gasPrice: 100000000000,
            from: accounts[0]

        }).catch(error => {
            console.log('tach mnr ', error)
        });
    console.log(interface);
    console.log('Contract deploy to ', result.options.address);
};
deploy();