import { FaqComponent } from './faq/faq.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { TeamComponent } from './team/team.component';
import { ContactComponent } from './contact/contact.component';
import { MentorsComponent } from './mentors/mentors.component';
import { MentorsDetailsComponent } from './mentors-details/mentors-details.component';
import { MentorsListComponent } from './mentors-list/mentors-list.component';



const routes: Routes = [
  {
    path : '',
    component : HomeComponent
  },
  {
    path : "faq",
    component : FaqComponent
  },
  {
    path : "team",
    component : TeamComponent
  },
  {
    path : "contact",
    component : ContactComponent
  },
  {
    path : "mentors",
    component : MentorsComponent,
    children : [
      {
        path : "",
        component : MentorsDetailsComponent,
      },
      {
        path :"dept/:dept",
        component: MentorsListComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
