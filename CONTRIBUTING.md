# CONTRIBUTING.md

## General
1. Be professional. We are in a student setting but practicing real life work.
2. Be respectful. Disagreements are bound to happen; try to find proactive solutions that are the ultimate best
for the product being built.
3. Be open to the ideas of others. (even if they are not a group member)
4. Be pragmatic.
5. Be ethical. For more info, search for the ACM/IEEE Code of Ethics.

## Coding Style
1. Comment as much as possible (and as much detail as possible)
2. We should be able to understand your code just from your comments

## Commits and Pull Requests
Keep the commit log as healthy as the code. It is one of the first places new contributors will look at the project. <br/>

1. No more than one change per commit. There should be no changes in a commit which are unrelated to its message. <br/>
2. Keep the diffs as clean as possible. Avoid unnecessary line changes. <br/>

When filing a Pull Request, make sure it is rebased on top of most recent master. <br/>
Also see [Github: Using Pull Requests](https://help.github.com/articles/about-pull-requests/)


## Setup instructions

clone the code from git to your local machine
```
git clone https://github.com/nyu-software-engineering/ethereum-marketplacer.git
```

navigate to the repository directory 
```
cd ethereum-marketplacer
```

setup npm
```
npm install
```

install ganache (using downloaded installer app)

install truffle
```
npm install -g truffle
```

unbox the skeleton of a react app in truffle
```
truffle unbox react
```

compile
```
truffle compile
```

now open up the Ganache app on your local computer

run migration scripts that help deploy code to the Ethereum blockchain
```
truffle migrate
```

look at ganache app and see balances - one should be a bit lower than 100 if everything is working

run unit tests... these don't work right now
```
truffle test 
```


To start up web app, do the following...

start up ipfs
```
ipfs init
```

change IPFS ports
```
ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/9001
ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001
```

configure IPFS to allow cross-origin scripting
```
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST", "OPTIONS"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
```

set up metamask

copy the RPC server from Ganache and paste into Metamask network Custom RPC field

compile code and migrate deploy scripts to the blockchain
```
truffle compile
truffle migrate --reset
```

install latest stable node.js... will ask for admin password
```
sudo n stable 
```

update npm (this may require sudo)
```
npm update
```

set up IPFS daemon
```
ipfs daemon
```

switch to a different Terminal window

navigate to the project folder in the new window

// start npm...
```
npm start
```

// this should pop open browser to http://localhost:3000/

// Enjoy!
