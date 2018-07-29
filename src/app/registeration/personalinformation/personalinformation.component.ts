import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RegisterService } from '../registeration.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './personalinformation.component.html',
  styleUrls: ['./personalinformation.component.css']
})
export class PersonalinformationComponent implements OnInit {

  personalInfoForm: FormGroup;
  stateMessage:string;
  heightMessage:string;
  ageMessage:string;
  weightMessage:string;
  requiredMessage:String;
  private validationMessages = {
    required:"This field is required."
  }
  constructor(private fb: FormBuilder,public _registerService:RegisterService,private _route:Router) { }

  ngOnInit() {
    this._registerService.sendData('personal-info');
    this.personalInfoForm = this.fb.group({
      state: ['', [Validators.required]],
      age: ['', [Validators.required]],
      ethnicity: ['', [Validators.required]],
      race: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      height: ['', [Validators.required]],
      weight: ['', [Validators.required]]
    })

    if(this._registerService.isValidFormTab['personal_info']){
      this.personalInfoForm.setValue({
        state:this._registerService.formData['personal_info'].state,
        age:this._registerService.formData['personal_info'].age,
        ethnicity:this._registerService.formData['personal_info'].ethnicity,
        race:this._registerService.formData['personal_info'].race,
        sex:this._registerService.formData['personal_info'].sex,
        height:this._registerService.formData['personal_info'].height,
        weight:this._registerService.formData['personal_info'].weight
      })
    }

    this.personalInfoForm.get('state').valueChanges.subscribe(value => {
      this.stateNotify(this.personalInfoForm.get('state'));
    })
    this.personalInfoForm.get('age').valueChanges.subscribe(value => {
      this.ageNotify(this.personalInfoForm.get('age'));
    })
    this.personalInfoForm.get('height').valueChanges.subscribe(value => {
      this.heightNotify(this.personalInfoForm.get('height'));
    })
    this.personalInfoForm.get('weight').valueChanges.subscribe(value => {
      this.weightNotify(this.personalInfoForm.get('weight'));
    })
  }

  stateNotify(c:AbstractControl):void{
    this.stateMessage = '';
    this.requiredMessage ='';
    if ((c.touched || c.dirty) && c.errors) {
      this.stateMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join('');
    }
  }
  ageNotify(c:AbstractControl):void{
    this.ageMessage = '';
    this.requiredMessage ='';
    if ((c.touched || c.dirty) && c.errors) {
      this.ageMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join('');
    }
  }
  heightNotify(c:AbstractControl):void{
    this.heightMessage = '';
    this.requiredMessage ='';
    if ((c.touched || c.dirty) && c.errors) {
      this.heightMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join('');
    }
  }
  weightNotify(c:AbstractControl):void{
    this.weightMessage = '';
    this.requiredMessage ='';
    if ((c.touched || c.dirty) && c.errors) {
      this.weightMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join('');
    }
  }

  proceed(data){
    if(this.personalInfoForm.valid && this._registerService.isValidFormTab['intro']){
      this._registerService.submitData(data,'personal_info');
      this._registerService.sendData('personal-info');
      this._registerService.loading = true;

      this._registerService.postData().subscribe(res=>{
        this._registerService.loading = false;
        this._registerService.reset();
        this._route.navigate(['/']);
      },err=>{
        this._registerService.loading = false;
      });
  
    }
    else{
      for(let c in this.personalInfoForm.controls){        
        if(this.personalInfoForm.controls[c].invalid){
          this.requiredMessage = Object.keys(this.personalInfoForm.controls[c].errors).map(key =>
            this.validationMessages[key]).join('');
        }
      }
    }
  }

}
