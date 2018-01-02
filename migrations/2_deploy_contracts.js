const GiftChallenge = artifacts.require("./GiftChallenge.sol");

module.exports = function(deployer) {
	deployer.deploy(GiftChallenge);
};
