import React, {Component} from 'react'
import Post from './post.js'
import Home from './home.js'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            route: null
        }
    }
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({route: window.location.hash.substr(1)})
    })
  }
  render(){
    let Child
    switch(this.state.route) {
        case '/post' : Child = Post;
        break;
        default : Child = Home;
    }
    return (
      <div>
        <h1>
          Question & Answer
        </h1>
        <ul>
          <li><a href='#/index'>Home</a></li>
          <li><a href='#/post'>Question</a></li>
        </ul>
        <Child />
      </div>
    )
  }
}
export default App