import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup

  constructor(private fb: FormBuilder) { }

  initForm(): void {
    this.employeeForm = this.fb.group({
      fullName: [''],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['beginner']
      })
    })
    // FormGroup construction
    // this.employeeForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   // new form group named skills
    //   skills: new FormGroup({
    //     skillName: new FormControl(),
    //     experienceInYears: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // })
  }

  onSubmit(): void {
    console.log(this.employeeForm.value)
  }

  onDataLoadClick(): void {
    // setValue method is used to update all form controls, 
    // to update just one set of controls use patchValue instead    
    // for the record, patchValue can be used to update the entire form as well
    this.employeeForm.setValue({
      fullName: 'Johan Travieso Castro',
      email: 'jtravieso8863@gmail.com',
      skills: {
        skillName: 'Django',
        experienceInYears: 5,
        proficiency: 'intermediate'
      }
    })
  }

  ngOnInit(): void {
    this.initForm()
  }

}
