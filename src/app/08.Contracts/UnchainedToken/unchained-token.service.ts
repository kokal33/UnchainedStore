import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Web3 from 'web3';
const UnchainedContract  = require("./UnchainedToken.json");

@Injectable({
  providedIn: 'root'
})
export class UnchainedTokenService {

  constructor() { }
  web3: Web3 = new Web3(window.ethereum as any);

  async creatorOf(tokenId:number){
    var myContract = new this.web3.eth.Contract(UnchainedContract.abi, environment.contractTestAddress);
   return await myContract.methods.creatorOf(tokenId).call();
  }

  async approve(from: string, to: string, tokenId:number){
    var myContract = new this.web3.eth.Contract(UnchainedContract.abi, environment.contractTestAddress);
  return await myContract.methods.approve(to, tokenId)
  .send({
    from: from,
    // gas: 200000,
  });
  }

  async TokenURI(tokenId:number) {
    var myContract = new this.web3.eth.Contract(UnchainedContract.abi, environment.contractTestAddress);
    return await myContract.methods.creatorOf(tokenId).call();
  }
}
