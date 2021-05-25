import { Injectable } from '@angular/core';
import Web3 from 'web3';
const UnchainedContract  = require("./UnchainedToken.json");

@Injectable({
  providedIn: 'root'
})
export class UnchainedTokenService {

  constructor() { }

  async creatorOf(tokenId:number){
    let web3 = new Web3(window.ethereum as any);
    var myContract = new web3.eth.Contract(UnchainedContract.abi, '0x938D2bc1c8569b1fDa6193Ea3e884B94f9ACe67D');
  const creatorOf = await myContract.methods.creatorOf(tokenId).call();
  console.log("CREATOR: ", creatorOf)
  }
}
