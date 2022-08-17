import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  formatUrlPath(urlPath: string) {
    switch (urlPath) {
      case "dashboard":
        return "Dashboard";
      case "test-plan":
        return "Test Plans";
      case "step":
        return "Step";
      case "stats":
        return "Statistics";
      case "script":
        return "Script Step";
      case "http":
        return "Http Step";
    }

    return urlPath;
  }
}
