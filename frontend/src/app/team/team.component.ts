import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
})
export class TeamComponent implements OnInit {
  constructor(private data: DataService) {}
  team: object;
  coordinator: object;
  four : object;
  three : object;
  ngOnInit() {
    this.data.getTeam().subscribe(data => {
      this.team = data;
      if (data != null && Array.isArray(data)) {
        this.coordinator = data.filter(team => team.is_coordinator === true);
        this.four = data.filter(team => (team.is_coordinator === false && team.year === "4"));
        this.three = data.filter(team => (team.is_coordinator === false && team.year === "3"));
      }
    });
  }
}
