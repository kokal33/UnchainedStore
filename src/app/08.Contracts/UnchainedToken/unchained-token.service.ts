import { Injectable } from '@angular/core';
import { getWeb3 } from 'src/app/07.Services/web3Service';
import { environment } from 'src/environments/environment';
import Web3 from 'web3';
const UnchainedContract  = require("./UnchainedToken.json");

@Injectable({
  providedIn: 'root'
})
export class UnchainedTokenService {

  constructor() { }
  web3: Web3 = getWeb3();

  async creatorOf(tokenId:number){
    var myContract = new this.web3.eth.Contract(UnchainedContract.abi, environment.contractTestAddress);
   return await myContract.methods.creatorOf(tokenId).call();
  }

  async approve(from: string, to: string, tokenId:number){
    var myContract = new this.web3.eth.Contract(UnchainedContract.abi, environment.contractTestAddress);
    const estimatedGas = await myContract.methods.approve(to, tokenId)
    .estimateGas({ from: from });
  return await myContract.methods.approve(to, tokenId)
  .send({
    from: from,
     gas: estimatedGas,
  });
  }

  async TokenURI(tokenId:number) {
    var myContract = new this.web3.eth.Contract(UnchainedContract.abi, environment.contractTestAddress);
    return await myContract.methods.creatorOf(tokenId).call();
  }
}
