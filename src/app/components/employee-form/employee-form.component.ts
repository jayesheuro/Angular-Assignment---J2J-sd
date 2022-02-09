import { Component } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css', '../../app.component.css']
})
export class EmployeeFormComponent {

  constructor(private fb: FormBuilder) { }

  userData = this.fb.group({
    userName : ['',Validators.required],
    userEmail:['',[Validators.required,Validators.email]],
    userPhone:['',[Validators.required,Validators.pattern('[1-9]{1}[0-9]{9}')]],
    userDOB:['',Validators.required],
    userAddress:this.fb.group({
      userPlot:['',Validators.required],
      userCity:['',Validators.required],
      userState:['',Validators.required],
    })
  })

  handleFormSubmit(){
    if(this.userData.status==='VALID'){
      console.log(this.userData.value)
      alert("Form Submitted, Check Console")
    }else{
      alert("Please enter proper email and 10 digit mobile number")
    } 
  }
}
