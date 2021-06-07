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

      const product = await myContract.methods
      .createProduct(
        model.name,
        this.web3.utils.toWei(model.price.toString(), "ether"),
        model.tokenId,
        model.ownersRoyalty
      )
      .send({
        from: model.from,
        gas: 200000,
      });
    console.log('PRODUCT: ', product);
    return product;
  }

  async purchaseProduct(model: PurchaseModel){
    var myContract = new this.web3.eth.Contract(
      MarketplaceContract.abi,
      environment.marketplaceTestAddress
    );
    const priceInWei = this.web3.utils.toWei(model.price.toString(), "ether");
    console.log('Price in Wei: ', priceInWei);
    const product = await myContract.methods.purchaseProduct(model.productId)
      .send({
        from: model.from,
        value: priceInWei
      });
      console.log('PRODUCT PURCHASED: ', product);
      return product;
  }

  async approveMarketplace(from: string, tokenId: number) {
    await this.unchainedTokenService.approve(from, environment.marketplaceTestAddress, tokenId);
    return true;
  }
}
