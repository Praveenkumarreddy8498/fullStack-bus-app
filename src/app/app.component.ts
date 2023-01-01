import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/service/auth.service';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 user!:string;
  title = 'angular-bus-app';
  constructor(private _authService:AuthService,private _utilService:UtilService) { }
  ngOnInit(): void {
    this.user=this._utilService.getUserRole();
    }
  
  onLogout(){
    this._authService.logout();
    
  }
}
