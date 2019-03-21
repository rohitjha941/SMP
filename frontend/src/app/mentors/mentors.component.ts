import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: "app-mentors",
  templateUrl: "./mentors.component.html",
  styleUrls: ["./mentors.component.scss"],
})
export class MentorsComponent implements OnInit {
  constructor(private data: DataService) {}

  branches : object;
  ngOnInit() {
    this.data.getBranch().subscribe(data => {
      this.branches = data;
    });
  }
}
