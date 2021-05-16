import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/backendModels';
import { ArtistIdentifier } from '../models/artistIdentifier';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly base = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async getUser(identifier: ArtistIdentifier): Promise<any> {
    return await this.http.post<User>(this.base + "users/GetUser", identifier).toPromise();
  }

  async getUsers() {
    return await this.http.post(this.base + "users/GetUsers", null).toPromise();
  }

  async updateUser(model: User): Promise<any> {
    return await this.http.post<User>(this.base + "users/UpdateUser", model).toPromise();
  }

  async deleteUser(identifier: ArtistIdentifier): Promise<any> {
    return await this.http.post(this.base + "users/DeleteUser", identifier).toPromise();
  }
}
