import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', "../team/team.component.scss"]
})
export class ContactComponent implements OnInit {

  constructor(private data: DataService) {}

  contact: object;

  ngOnInit() {
    this.data.getContactTeam().subscribe(data => {
      this.contact = data;
      console.log(data);
    });
  }

}
