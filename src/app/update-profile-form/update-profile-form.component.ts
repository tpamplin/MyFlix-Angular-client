//Import angular components
import { Component, OnInit, Input } from "@angular/core";

// Import Dialog Component
import { MatDialogRef } from "@angular/material/dialog";

//Import back end API
import { FetchApiDataService } from "../fetch-api-data.service";

// This import is used to serve notifications to the user.
import { MatSnackBar } from "@angular/material/snack-bar";

//Component Definitions
@Component({
    selector: "app-update-profile-form",
    standalone: false,

    templateUrl: "./update-profile-form.component.html",
    styleUrl: "./update-profile-form.component.scss",
})

/**
 * This component opens up a form with a dialog that allows a user to update their information on the server.
 */
export class UpdateProfileFormComponent {
    // userData object definition.
    @Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

    // define local variables.
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UpdateProfileFormComponent>,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

    /**
     * Calls fetchApiData and sends an object with the updated user data to the server.
     */
    updateProfile(): void {
        this.fetchApiData.updateUser(this.userData).subscribe(
            (result) => {
                console.log(this.userData);
                this.dialogRef.close();
                this.snackBar.open(result, "OK", {
                    duration: 2000,
                });
            },
            (result) => {
                this.snackBar.open(result, "OK", {
                    duration: 2000,
                });
            }
        );
        // Wait 1 second for database to update, then re-load the page.
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
}
