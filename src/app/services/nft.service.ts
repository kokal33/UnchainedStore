import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Artist, User } from '../models/backendModels';
import { ArtistIdentifier } from '../models/artistIdentifier';

@Injectable({
  providedIn: 'root'
})
export class NftService {
  private readonly base = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async getNftById(identifier: ArtistIdentifier): Promise<any> {
    return await this.http.post<User>(this.base + "nft/GetNftById", identifier).toPromise();
  }

  async getNfts() {
    return await this.http.post(this.base + "nft/GetAllNfts", null).toPromise();
  }

  async createOrUpdateNft(model: Artist): Promise<any> {
    return await this.http.post<User>(this.base + "nft/CreateOrUpdateNft", model).toPromise();
  }

  async deleteNft(identifier: ArtistIdentifier): Promise<any> {
    return await this.http.post(this.base + "nft/DeleteUnlistedNft", identifier).toPromise();
  }

  async makeNftMarketable(identifier: ArtistIdentifier): Promise<any> {
    return await this.http.post(this.base + "nft/MakeNftMarketable", identifier).toPromise();
  }
}
