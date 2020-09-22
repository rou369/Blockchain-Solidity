const Router = artifacts.require("UniswapV2Router02.sol");
const WETH = artifacts.require("weth.sol");

module.exports = async function(deployer, network) {
    let weth;
    const FACTORY_ADDRESS = '0xf081B66A649F1651829D5B19977643B5161edEBa';
    if(network=== 'mainnet') {
        weth = await WETH.at('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');
    } else {
        await deployer.deploy(WETH);
        weth = await WETH.deployed();
    }
    await deployer.deploy(Router, FACTORY_ADDRESS, weth.address);

};
