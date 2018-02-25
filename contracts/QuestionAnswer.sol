pragma solidity ^0.4.4;

contract QuestionAnswer {

    struct Question {
        address askerAddress;
        uint timestamp;
        uint bountyAmount;
        string questionContent;
    }

    // an array to store the keys
    uint[] keys;

    // want to eventually use IPFSHash as key
    mapping (uint => Question) public QuestionMapping;

    // this is the function to be called when a user submits a question
    function createPosting(string question) payable public returns (uint) {

        // require the address balance be greater than the amount they are trying to send
        require (msg.sender.balance > msg.value);

        // for now, just using timestamp as QuestionMapping key
        uint key = block.timestamp;

        // add key to key[] array
        keys.push(key);

        // setting value as: struct Question
        QuestionMapping[key] = Question(msg.sender, block.timestamp, msg.value, question);

        // returning the key for testing purposes right now since we dont have IPFSHash yet
        // when running in remix, click 'details' in console to find output
        return key;

    }

    // passes in key to identify the bountyAmount to withdraw
    function withdraw(uint i) public {

        // amount to withdraw is the bountyAmount associated with key
        uint withdrawalAmount = getBountyAmount(i);

        // transfer withdrawalAmount to the msg.sender AKA the person who is calling withdraw()
        msg.sender.transfer(withdrawalAmount);
    }

    // *************** PUBLIC GETTERS ***************
    // these all take in the key as a parameter

    function getPostCount() public view returns (uint) {
        return keys.length;
    }

    function getAskedQuestion(uint i) public view returns (string) {
        return QuestionMapping[i].questionContent;
    }

    function getBountyAmount(uint i) public view returns (uint) {
        return QuestionMapping[i].bountyAmount;
    }

    function getAskerAddress(uint i) public view returns (address) {
        return QuestionMapping[i].askerAddress;
    }


}