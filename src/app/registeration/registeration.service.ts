import { Injectable, OnInit } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment.prod"
@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private BASE_URL = environment.BASE_URL;
    isValidFormTab: { [key: string]: boolean } = {};
    isVisited: { [key: string]: boolean } = {};
    formData: any = {};
    tabs: number = 0;
    progressWidth: number = 0;
    private subject = new Subject<any>();
    loading:Boolean=false;
    constructor(private _http: HttpClient) { }

    submitData(data, key) {
        this.isValidFormTab[key] = true;
        this.formData[key] = data;
        if (!this.isVisited[key]) {
            if (this.tabs != 2)
                this.tabs += 1;
            this.progressWidth = this.tabs / 2 * 100;
        }
        this.isVisited[key] = true;
    }
    sendData(className: string) {
        let obj = { className: className, progressWidth: this.progressWidth }
        this.subject.next(obj);
    }
    getData(): Observable<any> {
        return this.subject.asObservable();
    }
    postData() {
        let user = {};
        Object.keys(this.formData).forEach(e => {
            user = Object.assign(this.formData[e], user);
            delete user['url'];
        })

        return this._http.post(`${this.BASE_URL}/register/`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).pipe(
            catchError(err => {
                throw err;
            })
        )
    }
    reset() {
        this.isValidFormTab={};
        this.isVisited= {};
        this.formData = {};
        this.tabs = 0;
        this.progressWidth = 0;
    }
}