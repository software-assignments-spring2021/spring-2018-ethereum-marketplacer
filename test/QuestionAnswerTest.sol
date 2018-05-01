pragma solidity ^0.4.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/QuestionAnswer.sol";

contract QuestionAnswerTest {

<<<<<<< HEAD
    QuestionAnswer questionanwer = QuestionAnswer(DeployedAddresses.QuestionAnswer());
    uint public initialBalance = 10 ether;


    function testSubmitQuestion(){
        questionanswer.

    }




    //test whether the function works
    function testQuestionSubmit(){
        bool success = qanda.submitQuestion("luls");
        bool expected = true;
        Assert.equal(success, expected, "Should return true");
=======
    QuestionAnswer qanda=QuestionAnswer(DeployedAddresses.QuestionAnswer());

    //test whether the function works
    function testQuestionSubmit(){
        bool success=qanda.submitQuestion("luls");
        bool expected=true;
        Assert.equal(success,expected,"Should return true");
>>>>>>> 0a8f9534a7e8ddc3c9f1313405e037abecd10ab7
    }

    //test whether all correct values were deposited for timestamp
    function testQuestionSubmitInfo(){
<<<<<<< HEAD
        uint key = 123;
        //test whether question is correctly mapped
        bytes32 question = ("luls");
        Assert.equal(question, qanda.getAskedQuestion(key), "Questions should both be the same");
        //test whether correct address is mapped to question
        address owneraddress = this;
        Assert.equal(owneraddress, qanda.getAskerAddress(key), "Addresses should be the same");
=======
        uint key=qanda.key();
        //test whether question is correctly mapped
        bytes32 question=("luls");
        Assert.equal(question, qanda.getAskedQuestion(key),"Questions should both be the same");
        //test whether correct address is mapped to question
        address owneraddress=this;
        Assert.equal(owneraddress,qanda.getAskerAddress(key),"Addresses should be the same");
>>>>>>> 0a8f9534a7e8ddc3c9f1313405e037abecd10ab7
    }

    //test whether submit function works
    function testAnswerSubmit(){
<<<<<<< HEAD
        bool success = qanda.submitAnswer(qanda.key(), "My answer");
        bool expected = true;
        Assert.equal(expected, success, "Submit question should return true");
=======
        bool success=qanda.submitAnswer(qanda.key(),"My answer");
        bool expected=true;
        Assert.equal(expected,success,"Submit question should return true");
>>>>>>> 0a8f9534a7e8ddc3c9f1313405e037abecd10ab7
    }


    //test whether submitting answer function works
    function testAnswerSubmitInfo(){
<<<<<<< HEAD
        uint key = qanda.key();
        bytes32 answer = ("My answer");
        bytes32 returned = qanda.getSubmittedAnswer(key);
        Assert.equal(answer, returned, "Answer should end up being My Answer");
=======
        uint key=qanda.key();
        bytes32 answer=("My answer");
        bytes32 returned=qanda.getSubmittedAnswer(key);
        Assert.equal(answer,returned,"Answer should end up being My Answer");
>>>>>>> 0a8f9534a7e8ddc3c9f1313405e037abecd10ab7
    }

    //test whether selecting answer functin works and if answer selected gets set to "True" under isAccepted

    function testAnswerSelect(){
<<<<<<< HEAD
        uint key = qanda.key();
        bool success = qanda.AcceptAnswer(key, key);
        bool expected = true;
        Assert.equal(success, expected, "Should return true as answer was selected");
        uint randomkey = 120;
        bool failure = qanda.AcceptAnswer(randomkey, key);
        bool needfail = false;
        Assert.equal(failure, needfail, "Should return false as answer was not selected w/ correct key");
        bool setAccept = qanda.getAccepted(key);
        bool shouldBe = true;
        Assert.equal(setAccept, shouldBe, "Should return true as answer was accepted.");
=======
        uint key=qanda.key();
        bool success=qanda.AcceptAnswer(key,key);
        bool expected=true;
        Assert.equal(success,expected,"Should return true as answer was selected");
        uint randomkey=120;
        bool failure=qanda.AcceptAnswer(randomkey,key);
        bool needfail=false;
        Assert.equal(failure,needfail,"Should return false as answer was not selected w/ correct key");
        bool setAccept=qanda.getAccepted(key);
        bool shouldBe=true;
        Assert.equal(setAccept,shouldBe,"Should return true as answer was accepted.");
>>>>>>> 0a8f9534a7e8ddc3c9f1313405e037abecd10ab7
    }

    //gets question count

    function getQuestionCount(){
<<<<<<< HEAD
        uint expected = 1;
        uint returned = qanda.getQuestionCount();
        Assert.equal(expected, returned, "Should have returned 1 question");
=======
        uint expected=1;
        uint returned=qanda.getQuestionCount();
        Assert.equal(expected,returned,"Should have returned 1 question");
>>>>>>> 0a8f9534a7e8ddc3c9f1313405e037abecd10ab7
    }
}