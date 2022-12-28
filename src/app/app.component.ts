import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userRoles!:string[];
 user!:string;
  title = 'angular-bus-app';
  constructor(private _authService:AuthService) { }
  ngOnInit(): void {
    this.userRoles=this._authService.getRoles();
    this.user=this.userRoles[3];
    }
  
  onLogout(){
    this._authService.logout();
    
  }
}
