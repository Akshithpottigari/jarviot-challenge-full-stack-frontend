import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss']
})
export class LoginSuccessComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotifierService
  ){}

  ngOnInit(): void {
    this.authService.setAccessToken(this.activatedRoute.snapshot.params["access_token"]);
    console.log("token", this.authService.access_token)
    this.notificationService.show({type : "success", message : "Login successful!"});
    this.router.navigateByUrl("/home");
  }
}
