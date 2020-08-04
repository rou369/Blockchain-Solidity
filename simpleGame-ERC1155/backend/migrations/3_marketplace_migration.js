var Token = artifacts.require("./token.sol");
var Marketplace = artifacts.require("./marketplace.sol");

module.exports = (deployer) => deployer 
    .then( () => deployMarketplace(deployer));

    function deployMarketplace(deployer){
        return deployer.deploy(Marketplace, Token.address);
    }