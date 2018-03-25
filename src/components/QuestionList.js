import React, {Component} from 'react'
import '../css/QuestionList.css';

import SingleQuestion from '../components/SingleQuestion.js'



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

        this.toggleSingleQuestionComponent = this.toggleSingleQuestionComponent.bind(this);

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
        let questions = this.state.questions;
        questions = questions.map((question) =>
            <div className="Individual-Question-container" key={question.id}>
                <div onClick={this.toggleSingleQuestionComponent} className="Individual-Question-Title">
                    {question.questionTitle}
                </div>
                <div className="Individual-Question-Description">
                    Description: {question.questionDescription}
                </div>
                <div className="Individual-Question-Bounty">
                    Bounty: {question.bounty.toNumber()}
                </div>
                <div className="Individual-Question-Time">
                    Time Submitted: {question.timestamp.toNumber()}
                </div>

            </div>
        );

        return (
            <div className="QuestionList-container">
                <div>{questions}</div>
            </div>
        );

    }

    toggleSingleQuestionComponent() {
        alert("toggleSingleQuestionComponent triggered " +
            this.state.showSingleQuestion);
        if (this.state.showSingleQuestion) {
            this.setState({showSingleQuestion: false});

        }

        else {
            this.setState({showSingleQuestion: true});

        }
    }


    render() {

        return (
            <div className="QuestionList">
                {this.state.showSingleQuestion ? <SingleQuestion/> : this.renderQuestionList()}

            </div>

        );


    }


}

export default QuestionList;
