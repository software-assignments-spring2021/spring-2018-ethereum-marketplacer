import React, {Component} from 'react'
import '../css/MyQuestions.css';


class MyQuestions extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    epochToDate(epochTimestamp) {
        let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(epochTimestamp);
        return d.toDateString() + " " + d.toLocaleTimeString();
    }

    gweiToEth(bountyInGwei) {
        return bountyInGwei / 1000000000000000000 + " ETH";
    }

    renderMyQuestionList() {
        // questions is an array of questions
        // for each question, do this markup

        let questions = this.props.myQuestions;

        questions = questions.map((question) =>
            <div className="Individual-Question-container" key={question.id}>
                <div onClick={() => this.toggleSingleQuestionComponent(
                    question.id,
                    question.questionTitle,
                    question.questionDescription,
                    question.bounty.toNumber(),
                    question.timestamp.toNumber()
                )} className="Individual-Question-Title"> {question.questionTitle}
                </div>
                {/*<div className="Individual-Question-Description">*/}
                {/*Description: {question.questionDescription}*/}
                {/*</div>*/}
                <div className="Individual-Question-Bounty">
                    Bounty: {this.gweiToEth(question.bounty.toNumber())}
                </div>
                <div className="Individual-Question-Time">
                    Time Submitted: {this.epochToDate(question.timestamp.toNumber())}
                </div>
                <hr/>
            </div>
        );

        return (
            <div className="QuestionList-container">
                <div>{questions}</div>
            </div>
        )
    }


    toggleSingleQuestionComponent = (questionID, questionTitle, questionDesc, questionBounty, questionTimestamp) => {
        this.props.toggleSingleQuestion(questionID, questionTitle, questionDesc, this.gweiToEth(questionBounty), this.epochToDate(questionTimestamp), this.props.userAccount, true);
    };


    render() {

        return (
            <div className="MyQuestions">

                {this.props.myQuestions.size === 0 ?
                    <h3>Looks empty here. Go ask a question! </h3>
                    :
                    <div>{this.renderMyQuestionList()}</div>
                }

            </div>



        );


    }


}


export default MyQuestions
