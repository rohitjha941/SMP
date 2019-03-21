import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
@Component({
  selector: "app-mentors-list",
  templateUrl: "./mentors-list.component.html",
  styleUrls: ["./mentors-list.component.scss", "../team/team.component.scss"],
})
export class MentorsListComponent implements OnInit {
  constructor(private route: ActivatedRoute, private data: DataService) {}

  mentors: object;
  dept_mentors: object;
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("dept");
    this.data.getMentors().subscribe(data => {
      this.mentors = data;
      this.dept_mentors = data;
      console.log(data);
      if (data != null && Array.isArray(data)) {
        this.dept_mentors = data.filter(
          item => String(item.branch) === String(id),
        );
      }
    });

    this.route.params.subscribe(params => {
      let data = this.mentors;
      if (data != null && Array.isArray(data)) {
        this.dept_mentors = data.filter(
          item => String(item.branch) === String(params.dept),
        );
      }
    });
  }
}
