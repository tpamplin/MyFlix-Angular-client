import { Component, OnInit, Input } from "@angular/core";

import { MatDialogRef } from "@angular/material/dialog";

import { FetchApiDataService } from "../fetch-api-data.service";

import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: "app-user-login-form",
    standalone: false,

    templateUrl: "./user-login-form.component.html",
    styleUrl: "./user-login-form.component.scss",
})
export class UserLoginFormComponent implements OnInit {
    @Input() userData = { Username: "", Password: "" };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

    loginUser(): void {
        this.fetchApiData.userLogin(this.userData).subscribe(
            (result) => {
                const user = result;
                console.log(user.token);
                localStorage.setItem("token", user.token);
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
