import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})

export class CandidateListComponent implements OnInit {
  candidates: any[] = [];
  votingFrom!: FormGroup;
  selectedCandidateIndex: any[] = [];
  user: any[] = [];
  selectedCandidate: any;


  animationState = 'initial';
  countdownValue: number = 5;
  rotation: number = 0;
  backgroundColor: string = 'white';
  showCounter: boolean = false;

  constructor(private router: Router, private fb: FormBuilder) {
    this.votingFrom = this.fb.group({
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  ngOnInit(): void {
    this.getCandidateList();
  }

  getCandidateList(): void {
    const storedCandidates = localStorage.getItem('Candidate-List');
    if (storedCandidates) {
      this.candidates = JSON.parse(storedCandidates);
    } else {
      console.log('No candidates in localStorage');
    }
  }

  submit() {
    debugger
    const voters: any[] = JSON.parse(localStorage.getItem('voter-List')!)
    if (voters) {
      const existingVoter = voters.find((voterEmail: string) => voterEmail === this.votingFrom.value.emailAddress)
      if (existingVoter) {
        alert('You have already voted buddy, go home now!');
        this.votingFrom.reset();
        return
      }
      voters.push(this.votingFrom.value.emailAddress);
      this.upVote(voters);
      this.showCounter = true;
      this.startCountdown();

      if (voters.length > 5) {
        setTimeout(() => {
          this.router.navigate(['result']);
        }, 5000);
      }
      
      this.votingFrom.reset();

    } else {
        this.showCounter = true;
        this.startCountdown();
        this.upVote([this.votingFrom.value.emailAddress]);
    }
  }
  startCountdown() {
    debugger
    this.countdownValue = 5;
    const interval = setInterval(() => {
      this.countdownValue -= 1;
      this.rotation += 360 / 5;
      if (this.countdownValue <= 0) {
        clearInterval(interval);
        this.backgroundColor = 'red';

        setTimeout(() => {
          this.showCounter = false;
        }, 1000);
      }
    }, 1000);
  }


  upVote(voters: any): void {
    const candidate = this.candidates.find(candidate => candidate.emailAddress === this.selectedCandidate?.emailAddress);
    if (candidate) {
      candidate.votes = ++candidate.votes;
      localStorage.setItem('voter-List', JSON.stringify(voters));
      localStorage.setItem('Candidate-List', JSON.stringify(this.candidates));
      alert('Your Vote is added!')
    } else {
        alert('Candidate not found error. Code refactor needed!')
    }
    this.votingFrom.reset();
    this.selectedCandidate = null;
  }

}
