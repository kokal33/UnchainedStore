export interface CreateProductModel {
  name: string;
  price: number;
  tokenId: number;
  isLimited: boolean;
  sellersCut: number;
  ownersRoyalty: number;
}
