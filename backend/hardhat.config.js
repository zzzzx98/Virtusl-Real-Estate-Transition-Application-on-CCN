require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require('@openzeppelin/hardhat-upgrades')
require("dotenv").config()
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  defaultNetwork: "huygens",
  networks: {
    hardhat: {
    },
    huygens: {
      url: "http://18.182.45.18:8765",
      accounts: [
        "9B6726F2743CEDD022416B94F03917F920ABB79401384F1DDFF31EB0F98B10EF",
        "07A05C55753FC858386953CA374ECD25B80017854920473C5437BA7A280650B1"
      ]
    }
  },
  solidity: {
    version: "0.5.16",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}
