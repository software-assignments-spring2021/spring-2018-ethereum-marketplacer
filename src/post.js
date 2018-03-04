import React, {Component} from 'react'
import QuestionAnswerContract from '../build/contracts/QuestionAnswer.json'
import getWeb3 from './utils/getWeb3'

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});

const contract = require('truffle-contract')
const QuestionAnswer = contract(QuestionAnswerContract)
let account;

// Declaring this for later so we can chain functions on StringStorage.
let contractInstance;
let savePostOnIpfs = (blob) => {
    return new Promise(function(resolve, reject) {
        const descBuffer = Buffer.from(blob, 'utf-8');
        ipfs.add(descBuffer).then((response) => {
            console.log(response)
            resolve(response[0].hash);
        }).catch((err) => {
            console.error(err)
            reject(err);
        })
    })
}

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: null,
            blockChainHash: null,
            web3: null,
            address: null,
            strHash: null,
            isWriteSuccess: false
        }
    }

    componentWillMount() {

        ipfs.swarm.peers(function(err, res) {
            if (err) {
                console.error(err);
            } else {
                // var numPeers = res.Peers === null ? 0 : res.Peers.length;
                // console.log("IPFS - connected to " + numPeers + " peers");
            }
        });

        getWeb3.then(results => {
            this.setState({web3: results.web3})

            // Instantiate contract once web3 provided.
            this.instantiateContract()
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }

    instantiateContract = () => {
        QuestionAnswer.setProvider(this.state.web3.currentProvider);
        this.state.web3.eth.getAccounts((error, accounts) => {
            if(error != null) {
                console.log(error);
            }
            account = accounts[0];
            console.log(account);
            QuestionAnswer.deployed().then((contract) => {
                console.log(contract.address);
                contractInstance = contract;
                this.setState({address: contractInstance.address});
                // Get the number of posts
                contractInstance.getPostCount({from: account}).then((data) => {
                    console.log(data.toNumber());
                    this.setState({count: data.toNumber()});
                })
                return;
            });
        })

    }
    render() {
        return (<div className="App">
            {/*{*/}
                {/*// We have to make sure that the contractInstance*/}
                {/*// has already been loaded*/}
                {/*// When loaded, the address will be a non-null value*/}
                {/*this.state.address*/}
                    {/*? <h1>The address of the QuestionAnswer contract：{contractInstance.address}</h1>*/}
                    {/*: <div/>*/}
            {/*}*/}
            {
                this.state.count !== null
                    ? <div>
                        <h2>Total {this.state.count} questions</h2>
                        <h3>Post a new question</h3>
                        <div>
                            <label id="file">Enter your question</label>
                            <input ref="ipfsContent" />
                        </div>
                        <div>
                            <button onClick={() => {
                                let ipfsContent = this.refs.ipfsContent.value;
                                console.log(ipfsContent);
                                savePostOnIpfs(ipfsContent).then((hash) => {
                                    console.log('The question is now on IPFS')
                                    console.log(hash);
                                    this.setState({strHash: hash});
                                    contractInstance.createPosting(this.state.strHash, {from: account}).then(() => {
                                        console.log('The question is now on the blockchain');
                                        // Get the number of posts
                                        contractInstance.getPostCount({from: account}).then((data) => {
                                            console.log('Update the count');
                                            console.log(data.toNumber());
                                            this.setState({count: data.toNumber()});
                                        })
                                    })
                                });
                            }}>Submit Question</button>
                        </div>
                    </div>
                    : <div/>
            }
        </div>);
    }
}

export default Post