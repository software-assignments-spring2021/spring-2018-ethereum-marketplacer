import React, {Component} from 'react'
import Post from './components/Post.js'
import QuestionList from './components/QuestionList.js'
import './css/App.css'

import getWeb3 from './utils/getWeb3'
import QuestionAnswerContract from '../build/contracts/QuestionAnswer.json'
import SingleQuestion from "./components/SingleQuestion";
import MyQuestions from "./components/MyQuestions";

const contract = require('truffle-contract');
const QuestionAnswer = contract(QuestionAnswerContract);


const IPFS = require('ipfs-api');
const ipfs = new IPFS({host: 'localhost', port: '5001', protocol: 'http'});


let contractInstance;


class App extends Component {
    // alert(questionID + " " + questionTitle + " " + questionDesc + " " + questionBounty + " " + questionTimestamp);

    constructor(props){
        super(props);

        this.state = {
            showPostComponent: false,
            showQuestionList: false,
            showSingleQuestion: false,
            showMyQuestions: false,
            getWeb3: null,
            questionID: null,
            questionTitle: null,
            questionDesc: null,
            questionBounty: null,
            questionTimestamp: null,
            balance:null,

        };
        this.togglePostComponent = this.togglePostComponent.bind(this);
        this.toggleQuestionListComponent = this.toggleQuestionListComponent.bind(this);
        this.toggleMyQuestionsComponent = this.toggleMyQuestionsComponent.bind(this);
    }


    componentWillMount() {

        getWeb3.then(results => {
            this.setState({web3: results.web3});
            // Instantiate contract once web3 provided.
            this.instantiateContract()
        }).catch(() => {
            console.log('Error finding web3.')
        });
        this.setupIpfs();

    }


    instantiateContract = () => {
        QuestionAnswer.setProvider(this.state.web3.currentProvider);
        this.state.web3.eth.getAccounts((error, accounts) => {
            if (error != null) {
                console.log("ERR: " + error);
            }
            console.log("Account 0: " + accounts[0]);
            this.setState({account: accounts[0]});
            var balanc=this.state.web3.eth.getBalance(accounts[0]);
            this.setState({balance: this.state.web3.toDecimal(balanc)});
            QuestionAnswer.deployed().then((contract) => {
                console.log("contract.address: " + contract.address);
                contractInstance = contract;
                this.setState({address: contractInstance.address});
                // // Get the number of posts
                // contractInstance.getQuestionCount({from: account}).then((data) => {
                //     console.log(data.toNumber());
                //     this.setState({count: data.toNumber()});
                // });
                return contractInstance.getQuestionCount.call();
            }).then((data) => {
                console.log("count init to: " + data.toNumber());
            }).catch((err) => {
                console.log("ERR: " + err);
            })
        })

    };

    setupIpfs() {
        this.setState({ipfs: ipfs});
        console.log("setupIpfs: " + this.state.ipfs);
    }

    togglePostComponent() {
        this.setState({
            showPostComponent: true,
            showQuestionList: false,
            showSingleQuestion: false,
            showMyQuestions: false
        });

    }

    toggleQuestionListComponent() {
        this.setState({
            showPostComponent: false,
            showQuestionList: true,
            showSingleQuestion: false,
            showMyQuestions: false
        });
    }

    toggleMyQuestionsComponent() {
        this.setState({
            showPostComponent: false,
            showQuestionList: false,
            showSingleQuestion: false,
            showMyQuestions: true
        });
    }


    toggleSingleQuestionComponent = (questionID, questionTitle, questionDesc, questionBounty, questionTimestamp) => {
        this.setState({showPostComponent: false, showQuestionList: false, showSingleQuestion: true});
        this.setState({
            questionID: questionID,
            questionTitle: questionTitle,
            questionDesc: questionDesc,
            questionBounty: questionBounty,
            questionTimestamp: questionTimestamp
        })
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">QuestionAnswer.</h1>
                    <button onClick={this.togglePostComponent} className="Post-button">Post Question</button>
                    <button onClick={this.toggleQuestionListComponent} className="Browse-button">Browse Questions
                    </button>
                    <button onClick={this.toggleMyQuestionsComponent} className="My-Questions-button">My Submitted
                        Questions
                    </button>
                </header>

                <div className="Main-panel">

                    {this.state.showQuestionList
                        ? <QuestionList web3={this.state.web3}
                                        ipfs={this.state.ipfs}
                                        contractInstance={contractInstance}
                                        userAccount={this.state.account}
                                        toggleSingleQuestion={this.toggleSingleQuestionComponent}
                        />
                        : this.state.showSingleQuestion
                            ? <SingleQuestion
                                questionID={this.state.questionID}
                                questionTitle={this.state.questionTitle}
                                questionDesc={this.state.questionDesc}
                                questionBounty={this.state.questionBounty}
                                questionTimestamp={this.state.questionTimestamp}
                            />
                            :
                            this.state.showMyQuestions
                                ? <MyQuestions />

                                : <Post web3={this.state.web3}
                                        ipfs={this.state.ipfs}
                                        contractInstance={contractInstance}
                                        userAccount={this.state.account}
                                        toggleQuestionList={this.toggleQuestionListComponent}

                                />}

                </div>
            </div>
        )
    }
}

export default App;