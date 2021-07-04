export interface CreateProductModel {
  from: string,
  name: string;
  price: number;
  tokenId: number;
  // In percent
  charityPercent: number
}

export interface CreateAuctionModel {
  from: string,
  startPrice: number,
  tokenId: number,
  duration: number,
  // In percent
  charityPercent: number
}

export interface PurchaseModel {
  from: string,
  productId:number,
  price:number
}

export interface BidModel {
  from: string,
  amount: number,
  auctionContractAddress: string
}

export interface EndAuctionModel {
  from: string,
  auctionContractAddress: string
}
