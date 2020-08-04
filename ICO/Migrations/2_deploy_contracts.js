const ICO = artifacts.require("Contracts/ICO.sol");

module.exports = function(deployer) {
  deployer.deploy(ICO, 'My Token', 'TKN', 18, web3.utils.toWei('1000'));
};
