import { Injectable } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
@Injectable({
    providedIn: 'root'
  })
export  class Utils {
  
   
  constructor(private _authService: AuthService) {}
   
  
}
