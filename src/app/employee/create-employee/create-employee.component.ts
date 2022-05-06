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

  validationMessages: Record<string, any> = {
    fullName: {
      required: 'Full name is required',
      minlength: 'Full name must be grater than 2 characters',
      maxlength: 'Full name is must be between 2 and 21 characters'
    },
    email: {
      required: 'Email is required',
    },
    skillName: {
      required: 'Skill name is required',
    },
    experienceInYears: {
      required: 'Experience name is required',
    },
    proficiency: {
      required: 'Proficiency name is required',
    }

  }

  formErrors: Record<string, any> = {
    fullName: '',
    email: '',
    skillName: '',
    experienceInYears: '',
    proficiency: ''
  }

  constructor(private fb: FormBuilder) { }

  initForm(): void {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(21)]],
      email: ['', Validators.required],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
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

  loadValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key)
      if (abstractControl instanceof FormGroup) {
        this.loadValidationErrors(abstractControl)
        // abstractControl?.disable()
      } else {
        this.formErrors[key] = ''
        if (abstractControl && abstractControl.invalid) {
          const messages = this.validationMessages[key]
          // console.log(messages);
          // console.log(abstractControl.errors);

          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' '
            }
          }
        }
        // abstractControl?.disable()
        // abstractControl?.markAsDirty()
        // console.log('Key: ' + key + ' Value: ' + abstractControl?.value);
      }
    })
  }

  onDataLoadClick(): void {
    this.loadValidationErrors(this.employeeForm)
    console.log(this.formErrors);
    
    // setValue method is used to update all form controls, 
    // to update just one set of controls use patchValue instead    
    // for the record, patchValue can be used to update the entire form as well
    // this.employeeForm.setValue({
    //   fullName: 'Johan Travieso Castro',
    //   email: 'jtravieso8863@gmail.com',
    //   skills: {
    //     skillName: 'Django',
    //     experienceInYears: 5,
    //     proficiency: 'intermediate'
    //   }
    // })
  }

  ngOnInit(): void {
    this.initForm()
  }

}
