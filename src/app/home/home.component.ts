import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  legend : boolean = false;
  files : any[] = [];
  privateFiles : any[] = [];
  filesSharedWithMe : any[] = [];
  mySharedFiles : any[] = [];
  sharedFiles : any[] = [];
  peopleWithFiles : any[] = [];
  riskCount : number = 0;
  gaugeChart: any[] = [
    {
      name : "Risk",
      value :0
    }
  ];
  cardColor: string = '#232837';
  numberCards : any[] = [
    {
      name : "Total Files",
      value : 0
    },
    {
      name : "Private Files",
      value : 0
    },
    {
      name : "Files shared with me",
      value : 0
    },
    {
      name : "Files I shared",
      value : 0
    },
    {
      name : "Total shared files",
      value : 0
    },
  ];
  loading: boolean = false;
  customColors = ()=> {
    return this.riskCount > 0 && this.riskCount < 40 ? '#31C48D' : this.riskCount >= 40 && this.riskCount < 60 ? '#FACA15' : this.riskCount >= 60 ? '#E02424' : '';
  }
  
  constructor(public authService: AuthService, private notifierService : NotifierService) {}

  ngOnInit(): void {
    if(this.authService.getAccessToken()){
      console.log("home ngonint");
      this.getRiskReport();
    }
  }

  getRiskReport() {
    this.loading = true;
    this.authService.getRiskReport().subscribe((res: any) => {
      if(res.error){
        this.notifierService.show({type : "error", message : "Error while getting reports."})
      } else {
        this.riskCount = res.riskCount;
        this.files = res.data.files;
        this.privateFiles = res.data.privateFiles;
        this.filesSharedWithMe = res.data.filesSharedWithMe;
        this.mySharedFiles = res.data.mySharedFiles;
        this.sharedFiles = res.data.sharedFiles;
        this.peopleWithFiles = res.data.peopleWithFiles;
      }

      // Updating the chart properties;
      Object.assign(this, {
        gaugeChart : [
          {
            name : "Risk",
            value : this.riskCount
          }
        ]
      });
      Object.assign(this, {
        numberCards : [
          {
            name : "Total Files",
            value : this.files.length
          },
          {
            name : "Private Files",
            value : this.privateFiles.length
          },
          {
            name : "Files shared with me",
            value : this.filesSharedWithMe.length
          },
          {
            name : "Files I shared",
            value : this.mySharedFiles.length
          },
          {
            name : "Total shared files",
            value : this.sharedFiles.length
          },
        ]
      });
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }
}
