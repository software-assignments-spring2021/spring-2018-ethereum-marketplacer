import React, {Component} from 'react'
import QuestionAnswerContract from '../../build/contracts/QuestionAnswer.json'
import getWeb3 from '../utils/getWeb3'
import '../css/Post.css';


const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});

const contract = require('truffle-contract');
const QuestionAnswer = contract(QuestionAnswerContract);
let account;

// Declaring this for later so we can chain functions on StringStorage.
let contractInstance;
let savePostOnIpfs = (blob) => {
    return new Promise(function (resolve, reject) {
        const descBuffer = Buffer.from(blob, 'utf-8');
        ipfs.add(descBuffer).then((response) => {
            // console.log("savePostOnIpfs() response: " + response[0].toString());
            resolve(response[0].hash);
        }).catch((err) => {
            console.error(err);
            reject(err);
        })
    })
};

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: null,
            blockChainHash: null,
            web3: null,
            address: null,
            strHash: null,
            isWriteSuccess: false
        }
    }

    // I think we can move this to App.js
    // check out how he sets it up: https://github.com/didil/stone-dapp/blob/master/src/App.js
    // if you can get other testnet support running that would be great (rinkeby, ropsten)
    componentWillMount() {

        ipfs.swarm.peers(function (err, res) {
            if (err) {
                console.error(err);
            } else {
                // var numPeers = res.Peers === null ? 0 : res.Peers.length;
                // console.log("IPFS - connected to " + numPeers + " peers");
            }
        });

        getWeb3.then(results => {
            this.setState({web3: results.web3});

            // Instantiate contract once web3 provided.
            this.instantiateContract()
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }


    // I think we can move this to App.js
    instantiateContract = () => {
        QuestionAnswer.setProvider(this.state.web3.currentProvider);
        this.state.web3.eth.getAccounts((error, accounts) => {
            if (error != null) {
                console.log(error);
            }
            account = accounts[0];
            console.log(account);

            QuestionAnswer.deployed().then((contract) => {
                console.log("contract.address: " + contract.address);
                contractInstance = contract;
                this.setState({address: contractInstance.address});
                // Get the number of posts
                contractInstance.getQuestionCount({from: account}).then((data) => {
                    console.log(data.toNumber());
                    this.setState({count: data.toNumber()});
                });
            });
        })

    };


    handleSubmit = (event) => {
        event.preventDefault();
        const e = event.nativeEvent;
        const questionContent = e.target[0].value;
        const additionalDetails = e.target[1].value;
        const bountyAmount = e.target[2].value;
        console.log("questionContent: " + questionContent);
        console.log("additionalDetails: " + additionalDetails);
        console.log("bountyAmount: " + bountyAmount);

        // check bounty amount valid
        // check that bountyAmount <= amount in MetaMask wallet

        savePostOnIpfs(questionContent).then((hash) => {
            console.log('The question is now on IPFS');
            console.log(hash);
            this.setState({strHash: hash});
            console.log("strHash: " + this.state.strHash);
            contractInstance.submitQuestion(this.state.strHash, {from: account}).then(() => {
                console.log("The question is now on the blockchain");
                // Get the number of posts
                contractInstance.getQuestionCount({from: account}).then((data) => {
                    console.log("count updated to: " + data.toNumber());
                    this.setState({count: data.toNumber()});
                });
            });
        });


    };

    renderPostQuestionForm() {
        return (
            <div className="Post-form-container">
                <h2> Post a new question</h2>

                <form className="Post-form" onSubmit={this.handleSubmit}>
                    <label> Title </label>
                    <input type="text" title="title"
                           placeholder="What's your question? Be specific. "/><br/>

                    <label> Text (Optional) </label>
                    <textarea type="text"
                              title="content"
                              placeholder="Provide all the necessary details for someone to answer."></textarea><br/>

                    <label> Bounty (optional) </label>
                    <input type="text" title="bountyAmount"
                           placeholder="Attach a bounty to incentivize your question to be answered."/><br/>

                    <button>Submit Question</button>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div className="App">
                {this.renderPostQuestionForm()}
            </div>
        );
    }
}

export default Post