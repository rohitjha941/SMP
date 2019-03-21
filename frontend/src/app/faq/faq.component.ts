import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service"

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  constructor(private data: DataService) { }
  faq : object;
  ngOnInit() {
    this.data.getFaq().subscribe(data => {
      this.faq = data;
    });
  }

}
