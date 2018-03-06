pragma solidity ^0.4.4;

contract QuestionAnswer {

    // **** use events to pass along return values from contract to frontend ****
    // stores all the data contained when user creates a posting
    event SubmitQuestion(address indexed askerAddress, uint timestamp, uint bountyAmount, string questionContent);

    // stores all data contained when user submits an answer
    event SubmitAnswer(uint indexed questionKey, address answererAddress, uint timestamp, string answerContent);

    // stores key to question, address of withdrawer and time stamp
    event Withdrawal(uint questionKey, address withdrawererAddress, uint timestamp);

    struct Answer {
        uint questionKey; // key to the question answerer is replying to
        address answererAddress;
        uint timestamp;
        string answerContent;
        bool isAcceptedAnswer;
    }

    struct Question {
        address askerAddress;
        uint timestamp;
        uint bountyAmount;
        string questionContent;
        uint[] answerKeys; // list of answer keys
        mapping (uint => Answer) AnswerMapping; // questionKey => struct Answer
    }

    // list of question keys so we can enumerate them
    uint[] questionKeys;

    // key => value: IPFSHash => struct Question
    mapping (uint => Question) public QuestionMapping;

    // this is the function to be called when a user submits a question
    function submitQuestion(string question) payable public returns (bool success) {

        // require the address balance be greater than the amount they are trying to send
        require (msg.sender.balance > msg.value);

        // for now, just using timestamp as QuestionMapping key
        uint key = block.timestamp;

        // add key to questionKeys[] array
        questionKeys.push(key);

        // setting value as: struct Question
        // must set each attribute individually since cannot pass null in for last two attributes...
        // QuestionMapping[key] = Question(msg.sender, block.timestamp, msg.value, question, null, null);
        QuestionMapping[key].askerAddress = msg.sender;
        QuestionMapping[key].timestamp = block.timestamp;
        QuestionMapping[key].bountyAmount = msg.value;
        QuestionMapping[key].questionContent = question;


        // emits event in the log
        SubmitQuestion(msg.sender, block.timestamp, msg.value, question);

        return true;
    }

    function submitAnswer(uint questionKey, string answer) public returns (bool success) {
        // answerPost key (will eventually be IPFSHash as key)
        uint key = block.timestamp;

        // add key to answerKeys[] array, which is stored in the specfic Question struct it is replying to
        QuestionMapping[questionKey].answerKeys.push(key);

        // setting value as: struct Answer
        QuestionMapping[questionKey].AnswerMapping[key] = Answer(questionKey, msg.sender, block.timestamp, answer, false);

        // emits event in the log
        SubmitAnswer(questionKey, msg.sender, block.timestamp, answer);

        return true;
    }

    // question asker accepts answer; staked bounty is released to answerer
    function AcceptAnswer(uint questionKey, uint answerKey) public returns (bool success) {

        // user calling this function is indeed the original asker
        if (msg.sender ==  QuestionMapping[questionKey].askerAddress) {
            QuestionMapping[questionKey].AnswerMapping[answerKey].isAcceptedAnswer = true;

            address answererAddress = QuestionMapping[questionKey].AnswerMapping[answerKey].answererAddress;
            uint withdrawalAmount = QuestionMapping[questionKey].bountyAmount;

            // release bounty to answerer
            answererAddress.transfer(withdrawalAmount);


            return true;
        }

        return false;
    }

    // passes in key to identify the bountyAmount to withdraw
    function withdraw(uint questionKey) public returns (bool success) {

        // amount to withdraw is the bountyAmount associated with key
        uint withdrawalAmount = QuestionMapping[questionKey].bountyAmount;

        // transfer withdrawalAmount to the msg.sender AKA the person who is calling withdraw()
        msg.sender.transfer(withdrawalAmount);

        // emits event in the log
        Withdrawal(questionKey, msg.sender, block.timestamp);

        return true;
    }

    // returns total number of question posted
    function getQuestionCount() public view returns (uint) {
        return questionKeys.length;
    }

    // returns total number of submitted answers for a specific question
    function getReplyCount(uint questionKey) public view returns (uint) {
        return QuestionMapping[questionKey].answerKeys.length;

    }

    // *************** PUBLIC GETTERS ***************
    // these all take in the key as a parameter
    // actually I don't think we need these getters

    // function getAskedQuestion(uint i) public view returns (string) {
    //     return QuestionMapping[i].questionContent;
    // }

    // function getBountyAmount(uint i) public view returns (uint) {
    //     return QuestionMapping[i].bountyAmount;
    // }

    // function getAskerAddress(uint i) public view returns (address) {
    //     return QuestionMapping[i].askerAddress;
    // }


}