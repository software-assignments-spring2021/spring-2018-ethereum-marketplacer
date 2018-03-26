import React, {Component} from 'react'
import '../css/QuestionList.css';

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
            showSingleQuestion: false
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
                            questions.push({
                                id: ipfsHash,
                                timestamp: timestamp,
                                bounty: bounty,
                                questionTitle: myQuestionObj.questionTitle,
                                questionDescription: myQuestionObj.questionDescription
                            });
                            this.setState({questions: questions});
                        });
                    });
                });
            }
        })
    }

    renderQuestionList() {
        // questions is an array of questions
        let questions = this.state.questions;
        // for each question, do this markup
        questions = questions.map((question) =>
            <div className="Individual-Question-container" key={question.id}>
                <div onClick={() => this.toggleSingleQuestionComponent(question.id, question.questionTitle,
                    question.questionDescription,
                    question.bounty.toNumber(),
                    question.timestamp.toNumber()
                )} className="Individual-Question-Title"> {question.questionTitle}
                </div>
                {/*<div className="Individual-Question-Description">*/}
                    {/*Description: {question.questionDescription}*/}
                {/*</div>*/}
                <div className="Individual-Question-Bounty">
                    Bounty: {question.bounty.toNumber()}
                </div>
                <div className="Individual-Question-Time">
                    Time Submitted: {question.timestamp.toNumber()}
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

    toggleSingleQuestionComponent = (questionID, questionTitle, questionDesc, questionBounty, questionTimestamp) => {
        this.props.toggleSingleQuestion(questionID, questionTitle, questionDesc, questionBounty, questionTimestamp);

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