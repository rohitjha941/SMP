import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private data: DataService) {}

  about_smp: Object;
  vision: object;

  ngOnInit() {
    this.data.getHome().subscribe(data => {
      this.about_smp = data;
    });

    this.data.getVision().subscribe(data => {
      this.vision = data;
    });
  }
}
