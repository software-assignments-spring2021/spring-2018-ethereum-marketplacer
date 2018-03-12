import React, {Component} from 'react'
import Post from './components/Post.js'
import QuestionList from './components/QuestionList.js'
import './css/App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // route: null,
            showPostComponent: false,
            showQuestionList: false
        };
        this.togglePostComponent = this.togglePostComponent.bind(this);
        this.toggleQuestionListComponent = this.toggleQuestionListComponent.bind(this);
    }

    componentDidMount() {
        // window.addEventListener('hashchange', () => {
        //   this.setState({route: window.location.hash.substr(1)})
        // });
    }

    togglePostComponent() {
        {
            this.setState({showPostComponent: true, showQuestionList: false});
        }
    }

    toggleQuestionListComponent() {
        {
            this.setState({showPostComponent: false, showQuestionList: true})

        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">QuestionAnswer.</h1>
                    <button onClick={this.togglePostComponent} className="Post-button">Post Question</button>
                    <button onClick={this.toggleQuestionListComponent} className="Browse-button">Browse Questions
                    </button>
                </header>

                <div className="Main-panel">
                    {this.state.showPostComponent ? <Post/> : <QuestionList/>}

                </div>
            </div>
        )
    }
}

export default App;