import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FaqComponent } from './faq/faq.component';
import { TeamComponent } from './team/team.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { MentorsComponent } from './mentors/mentors.component';
import { MentorsDetailsComponent } from './mentors-details/mentors-details.component';

import { MentorsListComponent } from './mentors-list/mentors-list.component';
import { SlidderComponent } from './slidder/slidder.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FaqComponent,
    TeamComponent,
    FooterComponent,
    ContactComponent,
    MentorsComponent,
    MentorsDetailsComponent,

    MentorsListComponent,

    SlidderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
