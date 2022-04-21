import contractInfo from './ContractInfo'


export default async function publishToken(ipfsHash:any) {

const { ethereum } = window;
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/1b71a03449674cfe98b98c4915a7cbc7'));
const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
const receiveAccount = accounts[0]
console.log(receiveAccount)
var sender = web3.eth.accounts.privateKeyToAccount('0x' + "3f5480375cbab19af805d26913fb9e7ee93ae744434ec20fbffc3c06ba39d18e");
console.log('sender확인 : ',sender)
web3.eth.accounts.wallet.add(sender);


let contract = new web3.eth.Contract( contractInfo.abi, contractInfo.address)
const abc = await contract.methods.mintNFT(receiveAccount,ipfsHash).send({from: "0xbDE82EE0713a93dE7e91C0b194382B64C58a9Aad",gas:600000, })

}