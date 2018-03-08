import React, {Component} from 'react'
import Post from './components/Post.js'
import Home from './home.js'
import './css/App.css';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: null,
            showPostComponent: false
        };
        this.togglePostComponent = this.togglePostComponent.bind(this);

    }

  componentDidMount() {
    // window.addEventListener('hashchange', () => {
    //   this.setState({route: window.location.hash.substr(1)})
    // });
  }

    togglePostComponent() {
        {this.state.showPostComponent ?
            this.setState({showPostComponent: false})
        :
            this.setState({showPostComponent: true})
        }
    }


  render() {
    // let Child;
    // switch(this.state.route) {
    //     case '/post' : Child = Post;
    //     break;
    //     default : Child = Home;
    // }

    return (
      <div className="App">
          <header className="App-header">
              <h1 className="App-title">QuestionAnswer</h1>
              <button onClick={this.togglePostComponent} className="Post-button" >Post Question</button>
          </header>

          {/*This is where the main panel is displayed*/}
          <div className="Main-panel">
              {this.state.showPostComponent ? <Post/> : null}

              {/*Need to display QuestionList component here */}




          </div>
      </div>
    )
  }
}
export default App;