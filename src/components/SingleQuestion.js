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
                <div className="SingleQuestion-Details">
                    <div className="SingleQuestion-Timestamp">
                        {this.props.questionTimestamp}
                    </div>
                    <div className="SingleQuestion-Bounty">
                        {this.props.questionBounty}

                    </div>
                </div>
                <br/>
                <div className="SingleQuestion-Desc">{this.props.questionDesc}</div>


                <form className="Submit-Answer-Form" onSubmit={this.handleSubmitAnswer}>
                    <label> Submit an answer</label>
                    <br/>
                    <textarea type="text"
                              title="content"
                              placeholder="Submit an answer for the asker to review. If chosen, you will receive the bounty"></textarea><br/>
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
