export interface CreateProductModel {
  from: string,
  name: string;
  price: number;
  tokenId: number;
  ownersRoyalty: number;
}

export interface CreateAuctionModel{
  from: string,
  startPrice: number,
  tokenId: number,
  duration: number,
  // In percent
  creatorsRoyalties: number,
}

export interface PurchaseModel {
  from: string,
  productId:number,
  price:number
}
