import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const access_token = this.authService.getAccessToken();
    if(access_token){
      console.log("token got it ", access_token);
      const modifiedRequest = request.clone(
        {
          headers : request.headers.set('access_token', access_token)
        }
      );
      return next.handle(modifiedRequest)
    }

    console.log("request: ", request.headers.get("Authorization"));
    return next.handle(request);
  }
}
