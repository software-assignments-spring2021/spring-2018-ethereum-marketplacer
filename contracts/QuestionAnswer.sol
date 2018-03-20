pragma solidity ^0.4.4;

contract QuestionAnswer {

    function bytes32ToString(bytes32 x) constant returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }

    function stringToBytes32(string memory source) returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

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
        mapping(bytes32 => Answer) AnswerMapping; // questionKey => struct Answer
    }

    // list of question keys so we can enumerate them
    bytes32[] questionKeys;

    // key => value: IPFSHash => struct Question
    mapping(bytes32 => Question) public QuestionMapping;

    // this is the function to be called when a user submits a question
    function submitQuestion(string question) payable public returns (bool success) {

        // require the address balance be greater than the amount they are trying to send
        require(msg.sender.balance > msg.value);

        // setting value as: struct Question
        // must set each attribute individually since cannot pass null in for last two attributes...
        // QuestionMapping[key] = Question(msg.sender, block.timestamp, msg.value, question, null, null);
        bytes32 questionBytes = stringToBytes32(question);
        // add key to questionKeys[] array
        questionKeys.push(questionBytes);
        QuestionMapping[questionBytes].askerAddress = msg.sender;
        QuestionMapping[questionBytes].timestamp = block.timestamp;
        QuestionMapping[questionBytes].bountyAmount = msg.value;
        QuestionMapping[questionBytes].questionContent = question;


        // emits event in the log
        SubmitQuestion(msg.sender, block.timestamp, msg.value, question);

        return true;
    }

    function submitAnswer(string questionKey, string answer) public returns (bool success) {

        bytes32 key = stringToBytes32(questionKey);
        // add key to answerKeys[] array, which is stored in the specfic Question struct it is replying to
        QuestionMapping[key].answerKeys.push(questionKey);

        // setting value as: struct Answer
        QuestionMapping[key].AnswerMapping[key] = Answer(questionKey, msg.sender, block.timestamp, answer, false);

        // emits event in the log
        SubmitAnswer(questionKey, msg.sender, block.timestamp, answer);

        return true;
    }

    // question asker accepts answer; staked bounty is released to answerer
    function AcceptAnswer(string questionKey, string answerKey) public returns (bool success) {
        bytes32 qkey = stringToBytes32(questionKey);
        bytes32 akey = stringToBytes32(answerKey);
        // user calling this function is indeed the original asker
        if (msg.sender == QuestionMapping[qkey].askerAddress) {
            QuestionMapping[qkey].AnswerMapping[akey].isAcceptedAnswer = true;

            address answererAddress = QuestionMapping[qkey].AnswerMapping[akey].answererAddress;
            uint withdrawalAmount = QuestionMapping[qkey].bountyAmount;

            // release bounty to answerer
            answererAddress.transfer(withdrawalAmount);


            return true;
        }

        return false;
    }

    // passes in key to identify the bountyAmount to withdraw
    function withdraw(string questionKey) public returns (bool success) {
        bytes32 qkey = stringToBytes32(questionKey);

        // amount to withdraw is the bountyAmount associated with key
        uint withdrawalAmount = QuestionMapping[qkey].bountyAmount;

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
        bytes32 qkey = stringToBytes32(questionKey);
        return QuestionMapping[qkey].answerKeys.length;

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