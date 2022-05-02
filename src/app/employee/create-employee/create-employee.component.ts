import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup
  submitted = false

  constructor(private fb: FormBuilder) { }

  initForm(): void {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(21)]],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['beginner']
      })
    })

    // watching value changes on a form control
    // this.employeeForm.get('fullName')?.valueChanges
    //   .subscribe(value => {
    //     console.log(value)
    //   })

    // FormGroup construction
    // to use this code again, re-import the FormGroup class from "@angular/forms"
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

  get fullName() { return this.employeeForm.get('fullName') }
  get email() { return this.employeeForm.get('email') }
  get skills() { return this.employeeForm.get('skills') }

  validName() {
    return (this.fullName?.valid)
    // return (this.fullName?.valid || (this.submitted && this.fullName?.valid))
  }

  invalidName() {
    return (this.fullName?.errors && (this.fullName.touched || this.fullName.dirty))
    // return (this.fullName?.invalid || (this.submitted && this.fullName?.invalid))
  }

  nameRequired() {
    return this.fullName?.errors?.['required']
  }

  nameLength() {
    return (this.fullName?.errors?.['minlength'] || this.fullName?.errors?.['maxlength'])
  }

  onSubmit(): void {
    this.submitted = true
    console.log(this.employeeForm.get('skills')?.get('proficiency')?.value)
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
