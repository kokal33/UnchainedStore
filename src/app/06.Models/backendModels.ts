export interface LoginModel {
  publicAddress: string,
  signature: string
}
export interface MintModel {
  trackId: string
}


export interface User {
  publicAddress: string,
  name: string,
  signature: string,
  bio: string,
  profilePic: string,
  verified: boolean
  twitter: string,
  facebook: string,
  instagram: string,
  linkedIn: string,
  soundCloud: string,
  bandCamp: string,
  beatport: string
}

export interface TrackModel {
  id: number,
  title: string,
  description: string,
  ownerOfPublicAddress: string,
  isMinted: boolean,
  isAuctioned: boolean,
  isListed: boolean,
  isSold: boolean,
  timestamp: Date
}

export interface AuctionModel {
  started: Date,
  ending: Date,
  trackId: number
  price: number
}

export interface ListingModel {
  id: number,
  trackId: number,
  price: number
}
