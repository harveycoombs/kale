const { Web3 } = require("web3");

const web3 = new Web3("http://localhost:3005");

class Ethereum {
    static async getLatestBlock() {
        let blockNumber = await web3.eth.getBlockNumber();
        return web3.eth.getBlock(blockNumber);
    }

    static async getBlock(blockNo) {
        return web3.eth.getBlock(blockNo);
    }

    static async getTransaction(hash) {
        return web3.eth.getTransaction(hash);
    }
}

module.exports = { Ethereum };