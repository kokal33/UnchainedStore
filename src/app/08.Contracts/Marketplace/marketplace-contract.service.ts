import { Injectable } from '@angular/core';
import { CreateProductModel, PurchaseModel } from '../../06.Models/solidityModels';
import Web3 from 'web3';
const MarketplaceContract = require('./Marketplace.json');
import {environment} from "../../../environments/environment";
import { UnchainedTokenService } from '../UnchainedToken/unchained-token.service';

@Injectable({
  providedIn: 'root',
})
export class MarketplaceContractService {

  constructor(private unchainedTokenService: UnchainedTokenService) {}
  web3: Web3 = new Web3(window.ethereum as any);

  async createProduct(model:CreateProductModel) {
    var myContract = new this.web3.eth.Contract(
      MarketplaceContract.abi,
      environment.marketplaceTestAddress);

      const estimatedGas = await myContract.methods
      .createProduct(
        model.name,
        this.web3.utils.toWei(model.price.toString(), "ether"),
        model.tokenId,
        model.charityPercent
      )
      .estimateGas({
        from: model.from
      });

      const product = await myContract.methods
      .createProduct(
        model.name,
        this.web3.utils.toWei(model.price.toString(), "ether"),
        model.tokenId,
        model.charityPercent
      )
      .send({
        from: model.from,
        gas: estimatedGas,
      });
    return product;
  }

  async purchaseProduct(model: PurchaseModel){
    var myContract = new this.web3.eth.Contract(
      MarketplaceContract.abi,
      environment.marketplaceTestAddress
    );
    const priceInWei = this.web3.utils.toWei(model.price.toString(), "ether");

    const estimatedGas = await myContract.methods.purchaseProduct(model.productId)
    .estimateGas({
      from: model.from,
      value: priceInWei
    });
    const product = await myContract.methods.purchaseProduct(model.productId)
      .send({
        from: model.from,
        value: priceInWei,
        gas: estimatedGas
      });
      console.log('PRODUCT PURCHASED: ', product);
      return product;
  }

  async approveMarketplace(from: string, tokenId: number) {
    await this.unchainedTokenService.approve(from, environment.marketplaceTestAddress, tokenId);
    return true;
  }
}
