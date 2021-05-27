import { Injectable } from '@angular/core';
import Web3 from 'web3';
const UnchainedContract  = require("./UnchainedToken.json");

@Injectable({
  providedIn: 'root'
})
export class UnchainedTokenService {

  constructor() { }
  web3: Web3 = new Web3(window.ethereum as any);

  async creatorOf(tokenId:number){
    var myContract = new this.web3.eth.Contract(UnchainedContract.abi, '0x938D2bc1c8569b1fDa6193Ea3e884B94f9ACe67D');
  const creatorOf = await myContract.methods.creatorOf(tokenId).call();
  console.log("CREATOR: ", creatorOf)
  }

  async approve(to: string, tokenId:number){
    var myContract = new this.web3.eth.Contract(UnchainedContract.abi, '0x938D2bc1c8569b1fDa6193Ea3e884B94f9ACe67D');
  const creatorOf = await myContract.methods.approve(to, tokenId)
  .send({
    from: '0x648512523CF1153B63104dd79E65CCb8bD59B179',
    // gas: 200000,
  });
  console.log("CREATOR: ", creatorOf)
  }
}
