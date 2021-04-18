export interface LoginModel {
  publicAddress: string,
  signature: string
}

export interface User {
  publicAddress: string,
  name: string,
  signature: string,
  bio: string,
  profilePic: string,
  verified: boolean
}
