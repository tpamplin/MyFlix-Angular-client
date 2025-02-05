// Import Statements
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

// Component Definitions
@Component({
    selector: "app-director-details",
    standalone: false,

    templateUrl: "./director-details.component.html",
    styleUrl: "./director-details.component.scss",
})
export class DirectorDetailsComponent {
    //loads details from the movie to show director
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
