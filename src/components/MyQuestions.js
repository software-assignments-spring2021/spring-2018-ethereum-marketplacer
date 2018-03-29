import React, {Component} from 'react'
import '../css/MyQuestions.css';


class MyQuestions extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }


    render() {

        return (
            <div className="MyQuestions">
                <h5>This is where all questions posted by this address will be rendered</h5>

                <h3>Looks empty here. Go ask a question! </h3>
            </div>



        );


    }


}


export default MyQuestions
