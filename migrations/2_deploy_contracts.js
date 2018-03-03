var QuestionAnswer = artifacts.require("./QuestionAnswer.sol");
module.exports = function(deployer) {
  deployer.deploy(QuestionAnswer);
};
