import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import {catchError} from "rxjs/operators"
import { environment } from "../environments/environment.prod";


@Injectable({
    providedIn:'root'
})
export class AppGeneralService{
    private BASE_URL = environment.BASE_URL;
    constructor(private _http:HttpClient){}
    public resolving:Boolean=false;

    fetchProfiles(){
        return this._http.get(`${this.BASE_URL}/general/fetchprofiles`).pipe(
            catchError(err=>{
                throw err;
            })
        )
    }
}