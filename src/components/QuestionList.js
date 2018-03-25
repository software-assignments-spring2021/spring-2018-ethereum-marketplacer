import React, {Component} from 'react'

class QuestionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: null,
            blockChainHash: null,
            address: null,
            strHash: null,
            isWriteSuccess: false,
            questions: []
        }
    }

    componentDidMount() {
        this.props.contractInstance.getQuestionCount.call().then((count) => {

            for (let i = 0; i<count; i++) {

                // iterate through questionList and get the hash of each question
                this.props.contractInstance.getQuestionByIndex.call(i).then((hash) => {
                    return hash;
                }).then((hash) => {

                    //retrieve question content from ipfs
                    this.props.ipfs.cat(hash, (err, file) => {
                        if (err) {
                            throw err;
                        }
                        let questionJson = file.toString('utf8');
                        let questionObject = JSON.parse(questionJson);
                        

                        this.props.contractInstance.getQuestionByHash.call(hash).then((questionInfo) => {
                            let timestamp = questionInfo[0];
                            let bounty = questionInfo[1];
                            let ipfsHash = questionInfo[2]; // Same as hash
                            let questions = this.state.questions.slice();
                            questions.push({id: ipfsHash, timestamp: timestamp, bounty: bounty,
                                questionTitle: questionObject.questionTitle, questionDescription: questionObject.questionDescription});
                            this.setState({ questions: questions });
                        });
                    });
                });
            }
        })
    }

    render() {
        let questions = this.state.questions;
        questions = questions.map((question) =>
            <li key={question.id}>Time: {question.timestamp.toNumber()} - Bounty: {question.bounty.toNumber()}
            - Title: {question.questionTitle} - Description: {question.questionDescription}</li>
        );
        return (
            <div className="RecentSubmissions">
                <h1>The list of questions will be rendered here</h1>
                <ul>{questions}</ul>
            </div>
        );


    }


}

export default QuestionList;
