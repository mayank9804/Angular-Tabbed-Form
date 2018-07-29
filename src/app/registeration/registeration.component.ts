import { Component, OnInit } from "@angular/core";
import { RegisterService } from "./registeration.service";
import * as jquery from "jquery";
import { Subscription } from "rxjs";


@Component({
    templateUrl: './registeration.component.html',
    styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {
    className: string = 'intro';
    subscription: Subscription;
    progressBarWidth:number;
    constructor(public _registerService: RegisterService) {}

    ngOnInit() {
        this.subscription = this._registerService.getData().subscribe(obj => {
            this.className = obj.className;
            this.progressBarWidth = obj.progressWidth;
            jquery(`.${this.className}`).siblings().removeClass('active');
            jquery(`.${this.className}`).addClass('active');
        })
        
    }
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}