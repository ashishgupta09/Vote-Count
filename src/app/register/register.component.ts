import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerCandidate!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.registerCandidate = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]{10}$/)]),
      slogan: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(6000)]),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let profile = [];
    const payload = localStorage.getItem('Candidate-List');
    const formvalues = this.registerCandidate.value
    formvalues.votes = 0
    if (payload) {
      profile = JSON.parse(payload)
      let existingCandidateEmail = profile.find((e: any) => e.emailAddress === formvalues.email)
      let existingCandidatePhoneNumber = profile.find((e: any) => e.phoneNumber === formvalues.phoneNumber)

      if (existingCandidateEmail) {
        alert("This condidate email already exists");
        return;
      }

      if (existingCandidatePhoneNumber) {
        alert("This condidate number already exists");
        return;
      }
    }
    profile.push(formvalues);
    localStorage.setItem('Candidate-List', JSON.stringify(profile));
    alert("Candidate Added Successfully!")
    this.registerCandidate.reset();
  }

}
