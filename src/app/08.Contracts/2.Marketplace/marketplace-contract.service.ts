import { Injectable } from '@angular/core';
import { CreateProductModel } from 'src/app/06.Models/solidityModels';
import Web3 from 'web3';
const MarketplaceContract = require('./Marketplace.json');



@Injectable({
  providedIn: 'root',
})
export class MarketplaceContractService {
  constructor() {}

  async createProduct(model:CreateProductModel) {
    let web3 = new Web3(window.ethereum as any);
    var myContract = new web3.eth.Contract(
      MarketplaceContract.abi,
      '0x6E7069de74b8BA9EF9Fc663D91813FC7386686EC'
    );
    const product = await myContract.methods
      .createProduct(
        model.name,
        web3.utils.toWei(model.price.toString(), "ether"),
        model.tokenId,
        model.isLimited,
        model.sellersCut,
        model.ownersRoyalty
      )
      .send({
        from: '0x648512523CF1153B63104dd79E65CCb8bD59B179',
        // gas: 200000,
      });
    console.log('PRODUCT: ', product);
  }


  async purchaseProduct(productId:number, price:number){
    let web3 = new Web3(window.ethereum as any);
    var myContract = new web3.eth.Contract(
      MarketplaceContract.abi,
      '0x6E7069de74b8BA9EF9Fc663D91813FC7386686EC'
    );
    const priceInWei = web3.utils.toWei(price.toString(), "ether");
    console.log('Price in Wei: ', priceInWei);
    const product = await myContract.methods.purchaseProduct(productId)
      .send({
        from: '0x9D39F69971e919c09e306a152c48A8282d6b780B',
        value: priceInWei
      });
      console.log('PRODUCT PURCHASED: ', product);
  }
}
