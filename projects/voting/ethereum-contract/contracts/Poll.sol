pragma solidity ^0.4.17;
contract PollFactory{
    
    address[] deployedPolls;

    function createPoll(string question) public {
        address deployedPoll = new Poll(question);
        deployedPolls.push(deployedPoll);
    }
    
    function getDeployedPolls() public view returns(address[]){
        return deployedPolls;
    }

}

contract Poll{

    struct  Option {
        string name;
        uint votedCount;
        mapping(address => bool) voters;
    }

    string public question;
    Option[] public options;
    uint public optionsCount;

    function Poll(string initQuestion) public {
        question = initQuestion;
    }

    function createNewOption(string optionName) public {
        Option memory newOption = Option({
            name:optionName,
            votedCount:0
        });
        options.push(newOption);
        optionsCount++;
    }

    function vote(uint[] optionsIndexes) public{
        for (uint i=0; i < optionsIndexes.length; i++) {
            uint index = optionsIndexes[i];
            Option storage option = options[index];
            require(!option.voters[msg.sender]);
            option.voters[msg.sender] = true;
            option.votedCount++;
        }
    }

}