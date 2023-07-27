import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ){}

  ngOnInit(): void {
    
  }

  revokeAccess(){
    this.authService.revokeAccess().subscribe((res : any) => {
      if(res.message==="Access token revoked."){
        this.authService.setAccessToken("");
        this.notifierService.show({type : "success", message : "Access token revoked"})
        this.goToHome();
      } else {
        this.notifierService.show({type : "error", message : "Error while revoking access token"})
      }
    })
  }

  goToHome(){
    this.router.navigateByUrl("/home");
  }
}
