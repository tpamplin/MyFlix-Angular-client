///Import core angular components.
import { Component, OnInit, Input } from "@angular/core";

// Import Dialog Component
import { MatDialogRef } from "@angular/material/dialog";

//Import back end API
import { FetchApiDataService } from "../fetch-api-data.service";

// This import is used to serve notifications to the user.
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: "app-user-registration-form",
    standalone: false,

    templateUrl: "./user-registration-form.component.html",
    styleUrl: "./user-registration-form.component.scss",
})
export class UserRegistrationFormComponent implements OnInit {
    @Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

    registerUser(): void {
        this.fetchApiData.userRegistration(this.userData).subscribe(
            (result) => {
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
