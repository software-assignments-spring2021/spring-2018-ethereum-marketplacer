pragma solidity ^0.4.4;

contract QuestionAnswer {

    // **** use events to pass along return values from contract to frontend ****
    // stores all the data contained when user creates a posting
    event SubmitQuestion(address indexed askerAddress, uint timestamp, uint bountyAmount, string questionContent);

    // stores all data contained when user submits an answer
    event SubmitAnswer(string questionKey, address answererAddress, uint timestamp, string answerContent);

    // stores key to question, address of withdrawer and time stamp
    event Withdrawal(string questionKey, address withdrawererAddress, uint timestamp);

    struct Answer {
        string questionKey; // key to the question answerer is replying to
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
        string[] answerKeys; // list of answer keys
        mapping(string => Answer) AnswerMapping; // answerKey => struct Answer
    }

    // list of question keys so we can enumerate them
    string[] public questionKeys;

    // key => value: IPFSHash => struct Question
    mapping(string => Question) private QuestionMapping;

    // this is the function to be called when a user submits a question
    function submitQuestion(string question) payable public returns (bool success) {

        // require the address balance be greater than the amount they are trying to send
        require(msg.sender.balance > msg.value);

        // setting value as: struct Question
        // must set each attribute individually since cannot pass null in for last two attributes...
        // QuestionMapping[key] = Question(msg.sender, block.timestamp, msg.value, question, null, null);
        // add key to questionKeys[] array
        questionKeys.push(question);
        QuestionMapping[question].askerAddress = msg.sender;
        QuestionMapping[question].timestamp = block.timestamp;
        QuestionMapping[question].bountyAmount = msg.value;
        QuestionMapping[question].questionContent = question;

        // emits event in the log
        SubmitQuestion(msg.sender, block.timestamp, msg.value, question);

        return true;
    }

    function submitAnswer(string questionKey, string answer) public returns (bool success) {

        // add key to answerKeys[] array, which is stored in the specfic Question struct it is replying to
        QuestionMapping[questionKey].answerKeys.push(answer);

        // setting value as: struct Answer
        QuestionMapping[questionKey].AnswerMapping[answer] = Answer(questionKey, msg.sender, block.timestamp, answer, false);

        // emits event in the log
        SubmitAnswer(questionKey, msg.sender, block.timestamp, answer);

        return true;
    }

    // question asker accepts answer; staked bounty is released to answerer
    function AcceptAnswer(string questionKey, string answerKey) public returns (bool success) {

        // user calling this function is indeed the original asker
        if (msg.sender == QuestionMapping[questionKey].askerAddress) {
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
    function withdraw(string questionKey) public returns (bool success) {

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
    function getReplyCount(string questionKey) public view returns (uint) {
        return QuestionMapping[questionKey].answerKeys.length;
    }

    // returns information about a question
    // returns timestamp, bounty amount, question hash in order
    function getQuestionByHash(string questionHash) public view returns (uint, uint, string) {
        Question storage question = QuestionMapping[questionHash];
        return (question.timestamp, question.bountyAmount, questionHash);
    }

    // returns the ipfs hash, timestamp, isAcceptedAnswer
    function getAnswerByIndex(string questionHash, uint index) public view returns (string, uint, bool) {
        Question storage question = QuestionMapping[questionHash];
        string storage answerHash = question.answerKeys[index];
        Answer storage answer = question.AnswerMapping[answerHash];
        return (answerHash, answer.timestamp, answer.isAcceptedAnswer);
    }

    function getQuestionByIndex(uint index) public view returns (string) {
        return questionKeys[index];
    }

//    function getAllQuestions() public view returns (string[]) {
//        return questionKeys;
//    }
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