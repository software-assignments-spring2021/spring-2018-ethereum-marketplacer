import React, {Component} from 'react'
import Post from './components/Post.js'
import QuestionList from './components/QuestionList.js'
import './css/App.css'

import getWeb3 from './utils/getWeb3'
import QuestionAnswerContract from '../build/contracts/QuestionAnswer.json'

const contract = require('truffle-contract');
const QuestionAnswer = contract(QuestionAnswerContract);


const IPFS = require('ipfs-api');
const ipfs = new IPFS({host: 'localhost', port: '5001', protocol: 'http'});


let contractInstance;


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showPostComponent: false,
            showQuestionList: false,
            getWeb3: null
        };
        this.togglePostComponent = this.togglePostComponent.bind(this);
        this.toggleQuestionListComponent = this.toggleQuestionListComponent.bind(this);
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
        this.setState({showPostComponent: true, showQuestionList: false});

    }

    toggleQuestionListComponent() {
        this.setState({showPostComponent: false, showQuestionList: true});


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
                    {this.state.showPostComponent
                        ? <Post web3={this.state.web3}
                                ipfs={this.state.ipfs}
                                contractInstance={contractInstance}
                                userAccount={this.state.account}
                        />
                        : <QuestionList web3={this.state.web3}
                                        ipfs={this.state.ipfs}
                                        contractInstance={this.state.contractInstance}
                                        userAccount={this.state.account}

                        />}

                </div>
            </div>
        )
    }
}

export default App;