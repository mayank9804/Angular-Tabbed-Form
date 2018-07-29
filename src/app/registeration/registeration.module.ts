import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterationComponent } from './registeration.component';
import { RouterModule } from "@angular/router";
import { IntroComponent } from './intro/intro.component';
import { PersonalinformationComponent } from './personalinformation/personalinformation.component';
import { ReactiveFormsModule} from "@angular/forms";
import { RegisterService } from './registeration.service';
import { FormRouteGuard } from './form.guard.service';
const routes=[
  {
    path:'register',
    component:RegisterationComponent,
    children:[
      {
        path:'introduction',
        component:IntroComponent
      },
      {
        path:'personal-info',
        component:PersonalinformationComponent,
        canActivate:[FormRouteGuard]
      }
    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegisterationComponent,
    IntroComponent,
    PersonalinformationComponent
  ],
  providers:[RegisterService,FormRouteGuard]
})
export class RegisterationModule { }
