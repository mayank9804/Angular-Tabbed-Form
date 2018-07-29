import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RegisterService } from '../registeration.service';
import { Router } from '@angular/router';



@Component({
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  introForm: FormGroup;
  descriptionMessage: String;
  nameMessage: String;
  requiredMessage:String;
  url: string;


  private validationMessagesName = {
    required: "Name is required",
    minlength: "Too short!"
  }
  private validationMessagesDescription = {
    minlength: "Description too short. Please write at least 100 words."
  }
  private validationMessages = {
    required:'This field is required'
  }
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private _registerService: RegisterService, private _route: Router) { }

  ngOnInit() {
    this._registerService.sendData('intro');
    this.introForm = this.fb.group({
      dp: [null],
      name: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.minLength(100)]]
    })

    if (this._registerService.isValidFormTab['intro']) {
      this.url = this._registerService.formData['intro'].url;
      this.introForm.setValue({
        dp: this._registerService.formData['intro'].dp,
        name: this._registerService.formData['intro'].name,
        description: this._registerService.formData['intro'].description
      })
    }

    this.introForm.get('name').valueChanges.subscribe(value => {
      this.userNotify(this.introForm.get('name'));
    })
    this.introForm.get('description').valueChanges.subscribe(value => {
      this.descriptionNotify(this.introForm.get('description'));
    })
  }

  userNotify(c: AbstractControl): void {
    this.nameMessage = '';
    this.requiredMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.nameMessage = Object.keys(c.errors).map(key =>
        this.validationMessagesName[key]).join('');
    }
  }

  descriptionNotify(c: AbstractControl): void {
    this.descriptionMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.descriptionMessage = Object.keys(c.errors).map(key =>
        this.validationMessagesDescription[key]).join('');
    }

  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = async () => {
        this.url = reader.result;
        await this.introForm.patchValue({
          dp: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();

      };
    }
  }

  proceed(data) {
    if (this.introForm.valid) {
      data.url = this.url;
      this._registerService.submitData(data, 'intro');
      this._route.navigate(['/register/personal-info']);
    }
    else{
      for(let c in this.introForm.controls){        
        if(this.introForm.controls[c].invalid){
          this.requiredMessage = Object.keys(this.introForm.controls[c].errors).map(key =>
            this.validationMessages[key]).join('');
            
        }
      }
    }
  }


}
