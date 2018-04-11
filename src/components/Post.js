import React, {Component} from 'react'
import '../css/Post.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

export const savePostOnIpfs = (blob, ipfs) => {
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

const options=['one','two','three']

class Post extends Component {


    constructor(props) {
        super(props);

        this.state = {
            count: null,
            blockChainHash: null,
            web3: null,
            address: null,
            strHash: null,
            isWriteSuccess: false,
            bountyInput: "",
            invalidBountyInput: false,
            invalidBountyAmount:false,
            titleInput:"",
            invalidTitleInput:false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const e = event.nativeEvent;
        const questionTitle = e.target[0].value;
        const questionDescription = e.target[1].value;
        const bountyAmount = e.target[2].value;
        console.log("questionTitle: " + questionTitle);
        console.log("questionDescription: " + questionDescription);
        console.log("bountyAmount: " + bountyAmount);

        let myQuestionObj = {"questionTitle": questionTitle, "questionDescription": questionDescription};
        let myQuestionJson = JSON.stringify(myQuestionObj);

        console.log("props.ipfs: " + this.props.ipfs);
        console.log(this.props.web3);
        console.log(this.props.userAccount);

        const ipfsLocal = this.props.ipfs;

        // check bounty amount valid
        // check that bountyAmount <= amount in MetaMask wallet
        savePostOnIpfs(myQuestionJson, ipfsLocal).then((hash) => {
            console.log('The question is now on IPFS');
            console.log(hash);
            this.setState({strHash: hash});
            console.log("strHash: " + this.state.strHash);
            return hash;

        }).then((hash) => {
            this.props.contractInstance.submitQuestion(hash, {
                from: this.props.userAccount,
                value: this.props.web3.toWei(bountyAmount, "ether")
            });
        }).then((result) => {
            console.log("Return result is (this should be some metadata of the tx): ", result);
            // Get the number of posts
            return this.props.contractInstance.getQuestionCount.call();
        }).then((data) => {
            console.log("count updated to: " + data.toNumber());
            this.setState({count: data.toNumber()});
            alert("Success! Your question has been posted.");
            console.log("bounty is: " + this.state.bountyInput);
            this.props.toggleQuestionList();
        }).catch((err) => {
            console.log("ERROR: " + err);
        });
    };




    checkValidBounty(value) {
        var reg = /^[0-9]*\.?[0-9]*$/;
        if (value.match(reg) || value === "") {
            this.setState({invalidBountyInput: false});
            if (value>this.props.balance){
                        this.setState({invalidBountyAmount: true});
           }
           else{this.setState({invalidBountyAmount: false});}

        }
        else {
            this.setState({invalidBountyInput: true});
            this.setState({invalidBountyAmount: false});
        }
    }

    checkValidTitle(value){
        if (value==="") {
            this.setState({invalidTitleInput: true});

        }
        else{
            this.setState({invalidTitleInput:false});
           }
    }

    handleUserInput = (e) => {
        let value = e.target.value;

        if (e.target.title==="bountyAmount"){
            value = value || 0;
            console.log("value is: " + value);
            this.setState({bountyInput: value},

            () => {
                this.checkValidBounty(value)
            });
        }

        else {

        this.setState({titleInput: value},
            () => {
                this.checkValidTitle(value)});
        }
    };


    renderPostQuestionForm() {
        return (
            <div className="Post-form-container">
                <h2> Post a new question</h2>

                <form className="Post-form" onSubmit={this.handleSubmit}>
                    <label> Title </label>
                    <input val={this.state.titleInput}
                           onChange={this.handleUserInput} type="text" title="Title"
                           placeholder="What's your question? Be specific. "/>
                    {this.state.invalidTitleInput ?
                        <p className="invalidInputMessage">Title is required</p> :
                            null}
                    <label> Text (Optional) </label>
                    <textarea type="text"
                              title="content"
                              placeholder="Provide all the necessary details for someone to answer."></textarea><br/>

                    <label> Bounty (optional) </label>

                    <p className="bountyInput">

                    <input value={this.state.bountyInput}
                           onChange={this.handleUserInput} type="text" title="bountyAmount"
                           placeholder="Attach a bounty to incentivize your question to be answered."/>
                    {this.state.invalidBountyInput ?
                        <p className="invalidInputMessage">Bounty input must be a number</p> :
                        null}
                    {this.state.invalidBountyAmount ?
                        <p className="invalidInputMessage">Not enough in Metamask account</p> : null}
                    <br/>
                    </p>

                    {this.state.invalidBountyInput ||this.state.invalidBountyAmount || this.state.invalidTitleInput || this.state.titleInput===""
                        ? <button disabled={true}>Submit Question</button>
                        : <button>Submit Question</button>}

                    {/*<button>Submit Question</button>*/}
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