import React, {Component} from 'react'
import '../css/SingleQuestion.css';


class SingleQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }


    renderAllReplies() {
        return (
            <h4>All replies to this question will go here</h4>
        )
    }

    handleSubmitAnswer = (event) => {

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

                {/*<hr/>*/}

                <div className="Replies-Container">
                    {this.renderAllReplies()}
                </div>

            </div>



        );


    }


}


export default SingleQuestion
