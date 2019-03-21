import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const backend = "http://localhost:8000/"
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient) { }

  getHome() {
    return this.http.get(backend + 'backend/home_about/');
  }

  getVision(){
    return this.http.get(backend + 'backend/home_vision/');
  }

  getFaq(){
    return this.http.get(backend + 'backend/faq/');
  }

  getTeam(){
    return this.http.get(backend + 'backend/team/');
  }

  getContactTeam(){
    return this.http.get(backend + 'backend/contact_team/');
  }

  getBranch(){
    return this.http.get(backend + 'backend/branch/');
  }
  getMentors(){
    return this.http.get(backend + 'backend/mentors/');
  }
}
