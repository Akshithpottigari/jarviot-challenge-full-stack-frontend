import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  access_token!: string;
  constructor(
    private httpClient : HttpClient
  ) { }


  signInWithGoogle(){
    return this.httpClient.get(`${baseURL}/loginWithGoogle`)
  }

  revokeAccess(){
    return this.httpClient.get(`${baseURL}/revokeAccess`);
  }

  setAccessToken(token: string): void {
    this.access_token = token;
  }

  getAccessToken(): string {
    return this.access_token;
  }

  getRiskReport(){
    return this.httpClient.get(`${baseURL}/getRiskReport`);
  }
}
