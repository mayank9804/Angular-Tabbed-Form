import { Injectable } from "@angular/core";
import { Resolve} from "@angular/router";
import { Observable } from "rxjs";
import { AppGeneralService } from "./app.general.service";

@Injectable()
export class ResolveUsers implements Resolve<any>{
    constructor(private _appGeneralService:AppGeneralService){}
    resolve():Observable<any>{
        this._appGeneralService.resolving = true;
        return this._appGeneralService.fetchProfiles();
    }
}

