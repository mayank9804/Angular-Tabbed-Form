import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { RegisterService } from "./registeration.service";

@Injectable({
    providedIn: 'root'
})
export class FormRouteGuard implements CanActivate {
    constructor(private _registerService: RegisterService, private _route: Router) {}
    canActivate() {
        if (!this._registerService.isValidFormTab['intro']) {
            this._route.navigate(['/register/introduction']);
            return false;
        }
        else
            return true;
    }
}