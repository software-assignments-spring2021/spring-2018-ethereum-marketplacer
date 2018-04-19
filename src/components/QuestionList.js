import React, {Component} from 'react'
import '../css/QuestionList.css';

// import {epochToDate} from 'QuestionList';

export function epochToDate(epochTimestamp) {
    let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(epochTimestamp);
    return d.toDateString() + " " + d.toLocaleTimeString();
}

class QuestionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: null,
            blockChainHash: null,
            address: null,
            strHash: null,
            isWriteSuccess: false,
            questions: [],
            showSingleQuestion: false,
            myQuestions: []

        };

    }

    componentDidMount() {
        this.props.contractInstance.getQuestionCount.call().then((count) => {

            for (let i = 0; i < count; i++) {

                // iterate through questionList and get the hash of each question
                this.props.contractInstance.getQuestionByIndex.call(i).then((hash) => {
                    return hash;
                }).then((hash) => {

                    //retrieve question content from ipfs
                    this.props.ipfs.cat(hash, (err, file) => {
                        if (err) {
                            throw err;
                        }
                        let myQuestionJson = file.toString('utf8');
                        let myQuestionObj = JSON.parse(myQuestionJson);

                        this.props.contractInstance.getQuestionByHash.call(hash).then((questionInfo) => {
                            let timestamp = questionInfo[0];
                            let bounty = questionInfo[1];
                            let ipfsHash = questionInfo[2]; // Same as hash
                            let questions = this.state.questions.slice();
                            let myQuestions = this.state.questions.slice();

                            questions.push({
                                id: ipfsHash,
                                timestamp: timestamp,
                                bounty: bounty,
                                questionTitle: myQuestionObj.questionTitle,
                                questionDescription: myQuestionObj.questionDescription,
                                askerAddress: myQuestionObj.askerAddress
                            });

                            console.log("myQuestionObj.askerAddress" + myQuestionObj.askerAddress);
                            console.log("this.props.userAccount" + this.props.userAccount);

                            if (myQuestionObj.askerAddress === this.props.userAccount) {
                                myQuestions.push({
                                    id: ipfsHash,
                                    timestamp: timestamp,
                                    bounty: bounty,
                                    questionTitle: myQuestionObj.questionTitle,
                                    questionDescription: myQuestionObj.questionDescription,
                                    askerAddress: myQuestionObj.askerAddress
                                });
                                console.log("added to myQuestions");
                            }

                            this.setState({myQuestions: myQuestions});
                            this.props.passBackMyQuestions(this.state.myQuestions);


                            this.setState({questions: questions});
                            this.setState({strHash: ipfsHash});
                        });
                    });
                });
            }
        })
    }


    gweiToEth(bountyInGwei) {
        return bountyInGwei / 1000000000000000000 + " ETH";
    }

    renderQuestionList() {
        // questions is an array of questions
        let questions = this.state.questions;
        // for each question, do this markup
        questions = questions.map((question) =>
            <div className="Individual-Question-container" key={question.id}>
                <div onClick={() => this.toggleSingleQuestionComponent(
                    question.id,
                    question.questionTitle,
                    question.questionDescription,
                    question.bounty.toNumber(),
                    question.timestamp.toNumber(),
                    question.askerAddress
                )} className="Individual-Question-Title"> {question.questionTitle}

                </div>
                {/*<div className="Individual-Question-Description">*/}
                {/*Description: {question.questionDescription}*/}
                {/*</div>*/}
                <div className="Individual-Question-Bounty">
                    Bounty: {this.gweiToEth(question.bounty.toNumber())}
                </div>
                <div className="Individual-Question-Time">
                    Time Submitted: {epochToDate(question.timestamp.toNumber())}
                </div>
                <hr/>
            </div>
        );

        return (
            <div className="QuestionList-container">
                <div>{questions}</div>
            </div>
        );

    }

    toggleSingleQuestionComponent = (questionID, questionTitle, questionDesc, questionBounty, questionTimestamp, askerAddress) => {

        if (this.props.userAccount === askerAddress) {
            this.props.toggleSingleQuestion(questionID, questionTitle, questionDesc, this.gweiToEth(questionBounty), epochToDate(questionTimestamp), askerAddress, true);
        }
        else {
            this.props.toggleSingleQuestion(questionID, questionTitle, questionDesc, this.gweiToEth(questionBounty), epochToDate(questionTimestamp), askerAddress, false);

        }

    };


    render() {

        return (
            <div className="QuestionList">
                {this.renderQuestionList()}

            </div>

        );


    }


}

export default QuestionList;