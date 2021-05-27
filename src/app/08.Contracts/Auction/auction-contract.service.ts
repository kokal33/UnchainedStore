import { Injectable } from '@angular/core';
import { CreateAuctionModel } from 'src/app/06.Models/solidityModels';
import Web3 from 'web3';
const AuctionContract = require('./UnchainedAuction.json');
import * as RLP from 'rlp'
import { UnchainedTokenService } from '../UnchainedToken/unchained-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionContractService {

  constructor(private unchainedTokenService: UnchainedTokenService) { }
  web3: Web3 = new Web3(window.ethereum as any);
  unchainedAddress = "0x648512523CF1153B63104dd79E65CCb8bD59B179";

  async createAuction(model:CreateAuctionModel) {
    const auction = await new this.web3.eth.Contract(AuctionContract.abi).deploy({
        data: AuctionContract.data.bytecode.object,
        arguments: [this.web3.utils.toWei(model.startPrice.toString(), "ether"), model.tokenId, model.duration]
    }).send({
      from: this.unchainedAddress,
      //gas: 1500000,
    });
    console.log("Existing address: ", auction.options.address)
      return auction;
  }

  async precalculateAddress(account: string){
    const nonce = await this.web3.eth.getTransactionCount(account);
    const encoded: any = RLP.encode(
      [
        account,
        nonce,
      ],
    );
const nonceHash: string = this.web3.utils.sha3(encoded) as string;
const expectedAddress = this.web3.utils.toChecksumAddress(`0x${nonceHash.substring(26)}`);
return expectedAddress;
  }

 async approveAuction(from: string, to: string, tokenId: number) {
  const precalculatedAddress = await this.precalculateAddress(from);
  console.log(precalculatedAddress);
  await this.unchainedTokenService.approve(from, to, tokenId);
 }
}
