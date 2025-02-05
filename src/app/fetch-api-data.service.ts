// Import angular components.
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from "@angular/common/http";

//Import rxjs components
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

//define constant api url which can be built off of to achieve different api endpoints.
const apiUrl = "https://myflix-timpamplin-021f285e4632.herokuapp.com/";

//defines the location of the component.
@Injectable({
    providedIn: "root",
})

//This function is responsible for fetching data from the myFlix API.
export class FetchApiDataService {
    //declare HttpClient variable.
    constructor(private http: HttpClient) {}

    //retrieves the storage from localStorage
    private getStoredToken(): any {
        return localStorage.getItem("token");
    }

    //retrieves the user from localstorage.
    private getStoredUser(): any {
        return localStorage.getItem("user");
    }

    //Requests all movie objects from api and returns an array of movie objects.
    public getAllMovies(): Observable<any> {
        const token = this.getStoredToken();
        console.log(token);
        const options = {
            headers: new HttpHeaders({
                Authorization: "Bearer " + token,
            }),
        };
        return this.http
            .get(apiUrl + "movies", options)
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    // Requests a specific movie object. Takes a Title parameter and will return a movie object with that title.
    public getMovie(Title: string): Observable<any> {
        const token = this.getStoredToken();
        const options = {
            headers: new HttpHeaders({
                Authorization: "Bearer " + token,
            }),
        };
        return this.http
            .get(apiUrl + "movies/" + Title, options)
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    // Requests a specific director by name. Takes a Name parameter and will return a director object with that name.
    public getDirector(name: string): Observable<any> {
        const token = this.getStoredToken();
        const options = {
            headers: new HttpHeaders({
                Authorization: "Bearer " + token,
            }),
        };
        return this.http
            .get(apiUrl + "directors/" + name, options)
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    //requests a specific genre by name. Takes a Name parameter and will return a genre object with that name.
    public getGenre(name: string): Observable<any> {
        const token = this.getStoredToken();
        const options = {
            headers: new HttpHeaders({
                Authorization: "Bearer " + token,
            }),
        };
        return this.http
            .get(apiUrl + "genres/" + name, options)
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    // requests a specific user by username. Will retrieve the current user's username and token from localStorage
    // and return a user object with a matching Username, as long as the token is valid.
    public getUser(): Observable<any> {
        console.log("getUser called in fetch-api-data.service.ts");
        const token = this.getStoredToken();
        console.log("token: " + token);
        const user = JSON.parse(this.getStoredUser());
        console.log("user: " + user);
        const options = {
            headers: new HttpHeaders({
                Authorization: "Bearer " + token,
            }),
        };
        return this.http
            .get(apiUrl + "users/" + user.Username, options)
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    /* 
    Requests a specific user's list of favorites.

    Will retrieve the current user's username and token from localStorage
    Returns an array of movie ID's that correspond to the user's favorite movies.

    Currently doesn't work, and is not used.
    */
    public getUserFavorites(): Observable<any> {
        const token = this.getStoredToken();
        const user = this.getStoredUser();
        const options = {
            headers: new HttpHeaders({
                Authorization: "Bearer " + token,
            }),
        };
        return this.http
            .get(apiUrl + "users/" + user.Username + "/favorites", options)
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    // Takes a parameter of a single movie._id and will add it to the user's favorites list on the database
    // there is nothing on the back end to prevent the user from having duplicate favorites, so be careful not to allow the user to favorite a movie more than once.
    public addFavorite(movieID: string): Observable<any> {
        const token = this.getStoredToken();
        const user = JSON.parse(this.getStoredUser());
        const options = {
            headers: new HttpHeaders({
                Authorization: "Bearer " + token,
            }),
        };
        return this.http
            .post(
                apiUrl + "users/" + user.Username + "/favorites",
                { MovieID: movieID },
                options
            )
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    // Takes a userDetails object as
    public updateUser(userDetails: any): Observable<any> {
        console.log(userDetails);
        const token = this.getStoredToken();
        const user = JSON.parse(this.getStoredUser());
        const options = {
            headers: new HttpHeaders({
                Authorization: "Bearer " + token,
            }),
        };
        console.log("updating user: " + user.Username);
        return this.http
            .put(apiUrl + "users/" + user.Username, userDetails, options)
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    // Sends a request to the server to delete a user's account. This functionality is not currently in the application, But could be added fairly easily.
    public deleteUser(): Observable<any> {
        const token = this.getStoredToken();
        const user = JSON.parse(this.getStoredUser());
        const options = {
            headers: new HttpHeaders({
                Authorization: "Bearer " + token,
            }),
        };
        return this.http
            .delete(apiUrl + "users/" + user.Username, options)
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    // This function takes a parameter of a movie's id and takes the username and token of the user in localstorage,
    // and sends a request to the server to delete that movie from that user's favorites list.
    public deleteFavorite(movieID: string): Observable<any> {
        const token = this.getStoredToken();
        const user = JSON.parse(this.getStoredUser());
        const options = {
            headers: new HttpHeaders({
                Authorization: "Bearer " + token,
            }),
            body: { MovieID: movieID },
        };
        return this.http
            .delete(apiUrl + "users/" + user.Username + "/favorites", options)
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    // sends a request to the server with the user's username and password which they enter in the login dialog.
    // Returns a user object and a token, which can be stored in localStorage for later use.
    public userLogin(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http
            .post(apiUrl + "login", userDetails)
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    // takes a parameter of a user object containing a username, password, email and birthday, which it sends to the server.
    // The server will make a new entry in the users collection and send back the user object including a database ._id. Allowing the user to login with their username and password.
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http
            .post(apiUrl + "users", userDetails)
            .pipe(catchError(this.handleError));
    }

    // This function catches and prints any errors it finds to help you figure out why stuff doesnt work.
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error("some error occured: ", error.error.message);
        } else {
            console.error(
                `Error Status code ${error.status}, error body is: ${error.error}`
            );
            return throwError(
                "Something bad happened; Please try again later."
            );
        }
    }

    // Takes a parameter of res(ponse) and returns either the response data if there is any otherwise an empty object.
    private extractResponseData(res: any): any {
        const body = res;
        return body || {};
    }
}
