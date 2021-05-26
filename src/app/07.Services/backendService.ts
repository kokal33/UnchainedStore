import { LoginModel, User } from "../06.Models/backendModels";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
const options = {
  observe: 'response' as const,
};
@Injectable()
export class BackendService {
  constructor(private http: HttpClient) { }
  private readonly base = environment.apiUrl;


  async login(model: LoginModel): Promise<HttpResponse<User>> {
    return await this.http.post<User>(this.base + "users/login", model, options).toPromise();
  }

  async mint(model: any): Promise<HttpResponse<any>> {
    return await this.http.post<User>(this.base + "minting/mint", model, options).toPromise();
  }


  async postTrack(model: any): Promise<HttpResponse<any>> {
    return await this.http.post(this.base + "tracks/postTrack", model, options).toPromise();
  }

  async updateUser(user: User): Promise<HttpResponse<any>> {
    return await this.http.post(this.base + "users/updateUser", user, options).toPromise();
  }

}




