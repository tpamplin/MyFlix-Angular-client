import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-navigation-bar",
    standalone: false,

    templateUrl: "./navigation-bar.component.html",
    styleUrl: "./navigation-bar.component.scss",
})
export class NavigationBarComponent implements OnInit {
    constructor(
        public router: Router,
        public dialogRef: MatDialogRef<NavigationBarComponent>
    ) {}

    ngOnInit(): void {}

    navigateMovies(): void {
        this.router.navigate(["movies"]);
    }

    navigateProfile(): void {
        this.router.navigate(["profile"]);
    }
}
