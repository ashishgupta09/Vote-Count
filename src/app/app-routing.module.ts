import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {path:"",component:RegisterComponent},
  {path:"list",component:CandidateListComponent},
  {path:"result",component:ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
