import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class LoginGuard implements CanActivate{

    constructor(private loginService: LoginService, private router:Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        let access_token = JSON.parse(sessionStorage.getItem("access_token")).token;
        if (tokenNotExpired("access_token", access_token)) {
            return true;
        }else{
            let rpta = this.loginService.estaLogeado();
            if(+rpta !== 1){
                sessionStorage.clear();
                this.router.navigate(['login']);
                return false;
            }
        }        
        sessionStorage.clear();
        this.router.navigate(['login']);
        return false;
    }
}