import React, {Component} from 'react'


class QuestionList extends Component {

    constructor(props) {
        super(props);
    }


    // this is not called yet
    // not sure if we want to getQuestionCount by user; need to getTotalQuestions instead
    getQuestionCount() {
            this.props.contractInstance.getQuestionCount({from: this.props.userAccount}).then((data) => {
                console.log(data.toNumber());
                this.setState({count: data.toNumber()});
            });
    }

    render() {
        // {this.getQuestionCount()}

        return (
        <div className="RecentSubmissions">
            <h1>The list of questions will be rendered here</h1>
                {/*Total question count: {this.state.count}*/}

            </div>
        );
    }


}

export default QuestionList;
