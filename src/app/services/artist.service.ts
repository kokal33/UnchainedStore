import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Artist, User } from '../models/backendModels';
import { ArtistIdentifier } from '../models/artistIdentifier';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private readonly base = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async getArtist(identifier: ArtistIdentifier): Promise<any> {
    return await this.http.post<User>(this.base + "artists/GetArtist", identifier).toPromise();
  }

  async getArtists() {
    return await this.http.post(this.base + "artists/GetArtists", null).toPromise();
  }

  async createOrUpdateArtist(model: Artist): Promise<any> {
    return await this.http.post<User>(this.base + "artists/PostArtistAsync", model).toPromise();
  }

  async deleteArtist(identifier: ArtistIdentifier): Promise<any> {
    return await this.http.post(this.base + "artists/DeleteArtist", identifier).toPromise();
  }
}
