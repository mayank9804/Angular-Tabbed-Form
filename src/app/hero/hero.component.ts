import { Component, OnInit } from '@angular/core';
import { AppGeneralService } from '../app.general.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  users: any = [];
  constructor(private _appGeneralService: AppGeneralService, private _route: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.data.subscribe(res => setTimeout(() => {
      this.users = res['users'].users;
      this._appGeneralService.resolving = false;
    }, 0))
  }
  register() {
    this._route.navigate(['/register/introduction']);
  }
}