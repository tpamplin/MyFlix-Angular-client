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
/**
 * Navigation bar renders a bar with a logo and buttons that let you switch from movie view to profile view, and log out.
 */
export class NavigationBarComponent implements OnInit {
    constructor(public router: Router) {}

    ngOnInit(): void {}

    /**
     * Deletes user data and routes the user to the welcome page.
     */
    logOut(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.router.navigate(["welcome"]);
    }
}
