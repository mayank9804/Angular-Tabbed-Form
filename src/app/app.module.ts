import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RegisterationModule } from './registeration/registeration.module';
import { AppGeneralService } from './app.general.service';
import { HttpClientModule } from '@angular/common/http';
import { HeroComponent } from './hero/hero.component';
import { ResolveUsers } from './hero.resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path:'',
        component:HeroComponent,
        resolve:{users:ResolveUsers}
      }
    ]),
    RegisterationModule,
    HttpClientModule
  ],
  providers: [AppGeneralService,ResolveUsers],
  bootstrap: [AppComponent]
})
export class AppModule { }
