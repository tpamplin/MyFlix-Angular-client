import { Component, OnInit, Input } from "@angular/core";

// Import Dialog Component
import { MatDialogRef } from "@angular/material/dialog";

//Import back end API
import { FetchApiDataService } from "../fetch-api-data.service";

// This import is used to serve notifications to the user.
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
    selector: "app-update-profile-form",
    standalone: false,

    templateUrl: "./update-profile-form.component.html",
    styleUrl: "./update-profile-form.component.scss",
})
export class UpdateProfileFormComponent {
    @Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UpdateProfileFormComponent>,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

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
    }
}
