pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum,msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }

}
contract Campaign {
    
    struct  Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    address public manager;
    mapping(address=>bool) public approvers;
    uint public minimumContribution;
    uint public approversCount;
    Request[]  public requests;
    
    function Campaign(uint minimum,address sender) public {
        minimumContribution = minimum;
        manager = sender;
    } 
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient) public onlyForManager{
        

        Request memory newRequest = Request({
            description: description,
            value:value,
            recipient:recipient,
            complete:false,
            approvalCount:0
            });

        requests.push(newRequest);

    }

    modifier onlyForManager(){
        require(msg.sender == manager);
        _;
    }
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;

    }

    function finalizeRequest(uint index) public {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount>(approversCount/2));
        request.complete = true;
        request.recipient.transfer(request.value);
    }

}
