import { Injectable } from '@angular/core';
import { KeycloakService ,  } from 'keycloak-angular';
import { KeycloakTokenParsed , KeycloakProfile} from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private _keycloakService: KeycloakService) { }

  public getLoggedUser(): KeycloakTokenParsed | undefined{
    try{
      const userDetails: KeycloakTokenParsed | undefined = this._keycloakService.getKeycloakInstance().idTokenParsed;
      return userDetails;
    } catch (e){
      console.log("Exception" , e);
      return undefined;
    }
  }

  public isLoggedIn() : Promise<boolean>{
    return this._keycloakService.isLoggedIn();
  }

  public loadUserProfile() : Promise<KeycloakProfile>{
    return this._keycloakService.loadUserProfile();
  }

  public login(): void{
    this._keycloakService.login();
  }

  public logout() : void{
    this._keycloakService.logout(window.location.origin)
    // .then(() => this._keycloakService.clearToken());
    // this._keycloakService.updateToken();
    // this.login();
  }

  public redirectToProfile(): void{
    this._keycloakService.getKeycloakInstance().accountManagement();
  }

  public getRoles(): string[] {
    return this._keycloakService.getUserRoles();
  }

  public getToken(){
    console.log(this._keycloakService.getToken);
  }

}
