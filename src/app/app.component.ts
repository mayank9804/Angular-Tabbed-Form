import { Component, OnInit } from '@angular/core';
import { AppGeneralService } from './app.general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public _appGeneralService:AppGeneralService){}
}
