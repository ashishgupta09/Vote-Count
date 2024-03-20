import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  candidates: any[] = [];

  constructor(private router: Router) {
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

  getMaxVotedCandidate(): any {
    let maxVotes = 0;
    let maxVotedCandidate = null;

    for (const candidate of this.candidates) {
      if (candidate.votes > maxVotes) {
        maxVotes = candidate.votes;
        maxVotedCandidate = candidate;
      }
    }

    return maxVotedCandidate;
  }

}
