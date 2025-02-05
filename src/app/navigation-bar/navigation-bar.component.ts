// Import angular components
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

// Component Definitions
@Component({
    selector: "app-navigation-bar",
    standalone: false,

    templateUrl: "./navigation-bar.component.html",
    styleUrl: "./navigation-bar.component.scss",
})

// Define Navigation Bar
export class NavigationBarComponent implements OnInit {
    constructor(public router: Router) {}

    ngOnInit(): void {}

    // Deletes user data and routes the user to the welcome page.
    logOut(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.router.navigate(["welcome"]);
    }
}
