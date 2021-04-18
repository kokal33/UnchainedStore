import { LoginModel, User } from "../models/backendModels";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
const options = {
  observe: 'response' as const,
};
@Injectable()
export class BackendService {
  constructor(private http: HttpClient) { }
  private readonly base: string = "https://localhost:44327/"


  async login(model: LoginModel):Promise<HttpResponse<any>> {
   return await this.http.post(this.base + "users/login", model, options).toPromise();
  }

  async updateUser(user: User):Promise<HttpResponse<any>> {
    return await this.http.post(this.base + "users/updateUser", user, options).toPromise();
  }


}




