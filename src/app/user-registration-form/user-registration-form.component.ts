///Import core angular components.
import { Component, OnInit, Input } from "@angular/core";

// Import Dialog Component
import { MatDialogRef } from "@angular/material/dialog";

//Import back end API
import { FetchApiDataService } from "../fetch-api-data.service";

// This import is used to serve notifications to the user.
import { MatSnackBar } from "@angular/material/snack-bar";

// Component Definitions
@Component({
    selector: "app-user-registration-form",
    standalone: false,

    templateUrl: "./user-registration-form.component.html",
    styleUrl: "./user-registration-form.component.scss",
})

//This component is responsible for letting the user create a new account so they can log in.
export class UserRegistrationFormComponent implements OnInit {
    //Establish a format for the data that will be sent to the server to make a new account.
    @Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

    //Define different modules which are used in the component.
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>, // tells other components where to find this dialog.
        public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

    //Calls fetchApiData to send a request to the database for a new user.
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
