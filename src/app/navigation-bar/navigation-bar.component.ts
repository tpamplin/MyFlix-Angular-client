import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-navigation-bar",
    standalone: false,

    templateUrl: "./navigation-bar.component.html",
    styleUrl: "./navigation-bar.component.scss",
})
export class NavigationBarComponent implements OnInit {
    constructor(public router: Router) {}

    ngOnInit(): void {}

    logOut(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.router.navigate(["welcome"]);
    }
}
