const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compiledFactory = require('../ethereum/build/PollFactory.json');
const compiledPoll = require('../ethereum/build/Poll.json');


let accounts;
let pollAddress;
let factory;
let poll;
const firstPollName = "first poll";

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data:compiledFactory.bytecode})
    .send({from:accounts[0],gas:'1000000'});
    //create poll contract
    await factory.methods.createPoll(firstPollName).send({
        from:accounts[0],gas:'1000000'
    });

    [pollAddress] = await factory.methods.getDeployedPolls().call(); //first element [asdasd]
    poll = await new web3.eth.Contract(
        JSON.parse(compiledPoll.interface),
        pollAddress);
});

describe(' Poll contract',()=>{
    it('deploy contracs success', ()=>{
        assert.ok(factory.options.address);
        assert.ok(poll.options.address);
    })
    it('should create a poll success',async ()=>{
        const question = await poll.methods.question().call();
        assert.equal(question,firstPollName);
    })
    it('should allow user to create a option success ', async ()=>{
        const optionName = " option 0"
        await poll.methods.createNewOption(optionName).send({
            from:accounts[0]
        });

        const option = await poll.methods.options(0).call();
        assert.equal(option.name,optionName);

    }); 
    it('should allow user to vote success ', async ()=>{
        const optionName = " option 0"
        await poll.methods.createNewOption(optionName).send({
            from:accounts[0]
        });
        await poll.methods.vote([0]).send({
            from:accounts[0]
        });
        const option = await poll.methods.options(0).call();
        assert.equal(option.votedCount,1);
    });

    it('should prevent duplicated vote', async ()=>{
        const optionName = " option 0"
        await poll.methods.createNewOption(optionName).send({
            from:accounts[0]
        });
        await poll.methods.vote([0]).send({
            from:accounts[0]
        });
        try {
            await poll.methods.vote([0]).send({
                from:accounts[0]
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });



})












