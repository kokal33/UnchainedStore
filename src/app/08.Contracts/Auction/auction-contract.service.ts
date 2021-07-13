import { Injectable } from '@angular/core';
import { BidModel, CreateAuctionModel, EndAuctionModel } from 'src/app/06.Models/solidityModels';
import Web3 from 'web3';
const AuctionContract = require('./UnchainedAuction.json');
import { Biconomy } from "@biconomy/mexa";
import * as RLP from 'rlp'
import { UnchainedTokenService } from '../UnchainedToken/unchained-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionContractService {

  constructor(private unchainedTokenService: UnchainedTokenService) { }
  web3: Web3 = new Web3(window.ethereum as any);

  async createAuction(model: CreateAuctionModel) {
    // Estimate gas
    const estimatedGas = await new this.web3.eth.Contract(AuctionContract.abi).deploy({
      data: AuctionContract.data.bytecode.object,
      arguments: [this.web3.utils.toWei(model.startPrice.toString(), "ether"), model.tokenId, model.duration, model.charityPercent]
    }).estimateGas({
      from: model.from
    });
    // Deploy auction contract
    const auction = await new this.web3.eth.Contract(AuctionContract.abi).deploy({
      data: AuctionContract.data.bytecode.object,
      arguments: [this.web3.utils.toWei(model.startPrice.toString(), "ether"), model.tokenId, model.duration, model.charityPercent]
    }).send({
      from: model.from,
      gas: estimatedGas,
    });
    console.log("Existing auction address: ", auction.options.address);
    return auction;
  }

  async bid(model: BidModel) {
    var myContract = new this.web3.eth.Contract(
      AuctionContract.abi,
      model.auctionContractAddress
    );
    const amountInWei = this.web3.utils.toWei(model.amount.toString(), "ether");
    const estimatedGas = await myContract.methods.bid()
    .estimateGas({
      value: amountInWei,
      from: model.from
    })
    const bid = await myContract.methods.bid()
    .send({
      value: amountInWei,
      from: model.from,
      gas: estimatedGas,
    });
    return bid;
  }

  async precalculateAddress(account: string) {
    const nonce = await this.web3.eth.getTransactionCount(account)+1;
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

  async approveAuction(from: string, tokenId: number) {
    const precalculatedAddress = await this.precalculateAddress(from);
    console.log("Precalculated address: ", precalculatedAddress)
    await this.unchainedTokenService.approve(from, precalculatedAddress, tokenId);
    return true;
  }

   async getHighestBid(auctionContractAddress:string) {
    var myContract = new this.web3.eth.Contract(
      AuctionContract.abi,
      auctionContractAddress
    );
    const highestBidinWei = await myContract.methods.highestBid()
    .call();
    const highestBid = this.web3.utils.fromWei(highestBidinWei.toString(), "ether");
    return highestBid;
  }

  async auctionEnd(model: EndAuctionModel) {
    var myContract = new this.web3.eth.Contract(
      AuctionContract.abi,
      model.auctionContractAddress
    );
    const estimatedGas = await myContract.methods.auctionEnd()
    .estimateGas({
      from: model.from
    })
    const auctionEnd = await myContract.methods.auctionEnd()
    .send({
      from: model.from,
      gas: estimatedGas,
    });
    return auctionEnd;
  }
}
