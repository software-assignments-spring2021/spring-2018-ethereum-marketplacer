import React, {Component} from 'react'
import '../css/SingleQuestion.css';
import {savePostOnIpfs} from './Post.js';


class SingleQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answers: []
        };

    }

    componentDidMount() {
        console.log("---------------");
        let answers = this.state.answers;

        this.props.contractInstance.getReplyCount.call(this.props.questionID).then((count) => {
            // console.log("answer count: " + count);

            for (let i = 0; i < count; i++) {
                let answerHash;
                let timestamp;
                let isAccepted;
                let answerText;

                this.props.contractInstance.getAnswerByIndex.call(this.props.questionID, i).then((answerInfo) => {
                    answerHash = answerInfo[0];
                    timestamp = answerInfo[1];
                    isAccepted = answerInfo[2];
                    // console.log("answerHash: " + answerHash);
                    // console.log("timestamp: " + timestamp);
                    // console.log("isAccepted: " + isAccepted);
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
                    });
                });
            }
        });
    }

    renderAllReplies() {

        let answers = this.state.answers;

        // for each answer, do this markup
        answers = answers.map((answer) =>
            <div className="Individual-Answer-container" key={answer.id}>
                <ul>
                    {answer.answerText.toString()}
                    {answer.timestamp.toNumber()}
                    {answer.isAccepted.toString()}
                </ul>
            </div>
        );

        return (
            <div>{answers}</div>
        )
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

    render() {

        return (
            <div className="SingleQuestion">
                <h2 className="SingleQuestion-Title">{this.props.questionTitle}</h2>
                <hr/>
                <div className="SingleQuestion-Desc">{this.props.questionDesc}</div>
                <div className="SingleQuestion-Details">
                    <div className="SingleQuestion-Timestamp">
                        Submitted on: {this.props.questionTimestamp}
                    </div>
                    <div className="SingleQuestion-Bounty">
                        Bounty: {this.props.questionBounty}

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

                <div className="Replies-Container">
                    {this.renderAllReplies()}
                </div>

            </div>



        );


    }


}


export default SingleQuestion
