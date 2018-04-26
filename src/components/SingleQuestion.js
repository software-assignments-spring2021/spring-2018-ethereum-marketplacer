import React, {Component} from 'react'
import '../css/SingleQuestion.css';
import {savePostOnIpfs} from './Post.js';
import {epochToDate} from './QuestionList';


class SingleQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            isAsker: false,
            answerCount: 0,
            hasAcceptedAnswer: false,
            acceptedAnswerID: null,
        };

    }

    componentDidMount() {
        this.getAllReplies()

    }

    getAllReplies() {
        console.log("---------------");
        console.log("isAsker:" + this.props.isAsker);
        let answers = this.state.answers;


        this.props.contractInstance.getReplyCount.call(this.props.questionID).then((count) => {
            console.log("answer count: " + count);

            for (let i = 0; i < count; i++) {
                let answerHash;
                let timestamp;
                let isAccepted;
                let answerText;

                this.props.contractInstance.getAnswerByIndex.call(this.props.questionID, i).then((answerInfo) => {
                    answerHash = answerInfo[0];
                    timestamp = answerInfo[1];
                    isAccepted = answerInfo[2];
                    console.log("answerHash: " + answerHash);
                    console.log("timestamp: " + timestamp);
                    console.log("isAccepted: " + isAccepted);

                    if (isAccepted) {
                        this.setState({hasAcceptedAnswer: true});
                        this.setState({acceptedAnswerID: answerHash});
                    }
                }).then(() => {
                    this.props.ipfs.cat(answerHash, (err, file) => {
                        if (err) {
                            throw err;
                        }
                        answerText = file.toString('utf8');
                        let answers = this.state.answers.slice();
                        answers.push({
                            answerText: answerText,
                            timestamp: timestamp,
                            isAccepted: isAccepted,
                            id: answerHash
                        });
                        this.setState({answers: answers});
                        this.setState({answerCount: answers.length});

                    });
                });
            }
        });

    }

    handleSubmitAnswer = (event) => {
        event.preventDefault();
        const e = event.nativeEvent;
        const myAnswer = e.target[0].value;
        console.log("answer is: " + myAnswer);

        const ipfsLocal = this.props.ipfs;
        console.log("Question hash: " + this.props.questionID);

        savePostOnIpfs(myAnswer, ipfsLocal).then((hash) => {
            console.log('The answer is now on IPFS');
            console.log("Answer hash: " + hash);
            return hash;
        }).then((hash) => {
            return this.props.contractInstance.submitAnswer(this.props.questionID, hash, {
                from: this.props.userAccount
            });
        }).then((result) => {
            console.log("Return result is (this should be some metadata of the tx): ", result);
            alert("Success! Your answer has been submitted.");
        });
    };

    handleAcceptAnswer = (answerID) => {
        alert("You will release your funds to the answerers address if you accept");
        this.props.contractInstance.AcceptAnswer(this.props.questionID, answerID, {
            from: this.props.userAccount
        }).then(() => {
            // this.setState({hasAcceptedAnswer: true});
            // this.setState({acceptedAnswerID: answerID});
            this.setState({answers: []});
            this.setState({answerCount: 0});
            this.getAllReplies();
            this.renderAllReplies()
        });
    };

    renderAllReplies() {
        let answers = this.state.answers;
        // for each answer, do this markup
        answers = answers.map((answer) =>
            <div className="Individual-Answer-container" key={answer.id}>
                <hr/>
                <div className="Individual-Answer-Description">
                    {answer.answerText.toString()}

                    {this.state.hasAcceptedAnswer //
                        ? null // if there is already an accepted answer don't render accept answer button
                        : <div>{this.props.isAsker // if there isn't already an accepted answer, check if the user is the asker
                            ? // if user is the asker, render accept answer button
                            <button className="Accept-Answer-Button" onClick={() => this.handleAcceptAnswer(answer.id)}>
                                Accept Answer</button>
                            : null // if user is not asker, don't render anything
                        }
                        </div>}

                    <div className="Accepted-Answer-Banner">
                        {answer.isAccepted ? <div> ~~ This is the accepted answer ~~ </div>
                            : null}
                    </div>

                    <div className="Individual-Answer-Time">
                        Submitted On: {epochToDate(answer.timestamp.toNumber())}
                    </div>
                </div>
            </div>
        );

        return (
            <div className="AnswerList-Container">
                <div>{answers}</div>
            </div>
        )
    }

    render() {

        return (
            <div className="SingleQuestion">
                <h2 className="SingleQuestion-Title">{this.props.questionTitle}</h2>
                <hr/>
                {/*<p>{this.props.askerAddress}</p>*/}
                <div className="SingleQuestion-Desc">{this.props.questionDesc}</div>
                <div className="SingleQuestion-Details">
                    <div className="SingleQuestion-Timestamp">
                        Submitted on: {this.props.questionTimestamp}
                    </div>
                    <div className="SingleQuestion-Bounty">
                        {this.state.hasAcceptedAnswer
                            ? <p>Bounty already claimed. You may still submit an answer though.</p>
                            : <p>Bounty: {this.props.questionBounty}</p>}


                    </div>
                </div>
                <hr/>

                <form className="Submit-Answer-Form" onSubmit={this.handleSubmitAnswer}>
                    <label> Submit an answer</label>
                    <br/>
                    <textarea type="text"
                              title="content"
                              placeholder="Submit an answer for the asker to review."></textarea><br/>
                    <button>Submit Answer</button>

                </form>

                <div>{this.state.answerCount === 0
                    ? <p>Looks empty here. Leave an answer!</p>
                    : <p>{this.state.answerCount} Answers </p>}
                </div>

                <div className="Replies-Container">
                    {this.renderAllReplies()}
                </div>
            </div>



        );


    }


}


export default SingleQuestion
