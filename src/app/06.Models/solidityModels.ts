export interface CreateProductModel {
  name: string;
  price: number;
  tokenId: number;
  isLimited: boolean;
  sellersCut: number;
  ownersRoyalty: number;
}

export interface CreateAuctionModel{
  startPrice: number,
  tokenId: number,
  duration: number
}
