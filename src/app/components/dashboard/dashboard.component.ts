import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    class:'w-full'
  }
})
export class DashboardComponent implements OnInit {
  profile: KeycloakProfile = {}

  constructor(public router: Router,
              private keycloakService: KeycloakService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.keycloakService.loadUserProfile().then(profile => {
      this.profile = profile;
    });
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
      case "compare":
        return "Compare Runs";
    }

    return urlPath;
  }

  logOut() {
    this.keycloakService.logout(location.origin).then(
      () => {

      }, () => {
        this.toastr.error("Could not log out!");
      }
    );
  }
}
