

require('@nomiclabs/hardhat-waffle');
module.exports = {
  solidity:'0.8.0',
  networks:{
    spolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/zHGcqDdaTqtxYcn6jVpZ71I_9qxQlTxg',
      accounts:['0fa8258fcc532c2cf4eacd2e4197410524e8fca1d0da0bdc5fe8e29400a60b71']
    }
  }
}