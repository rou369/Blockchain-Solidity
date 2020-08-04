var MyToken = artifacts.require("./../contracts/MyToken.sol");
var MyTokenSales = artifacts.require("./../contracts/MyTokenSale.sol");
var KycContract = artifacts.require("./../contracts/KycContract");
require("dotenv").config({path: "../.env"});

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(KycContract);
    await deployer.deploy(MyTokenSales, 1, addr[0], MyToken.address, KycContract.address);
    let tokenInstance = await MyToken.deployed();
    await tokenInstance.transfer(MyTokenSales.address, process.env.INITIAL_TOKENS);

}