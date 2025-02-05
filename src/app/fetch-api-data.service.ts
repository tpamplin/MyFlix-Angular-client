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

/**
 * This function is responsible for fetching data from the myFlix API.
 */
export class FetchApiDataService {
    //declare HttpClient variable.
    constructor(private http: HttpClient) {}

    /**
     * retrieves the user's token from localStorage
     * @returns {string} the user's token
     */
    private getStoredToken(): any {
        return localStorage.getItem("token");
    }

    /**
     * retrieves the user from localstorage.
     * @returns {string} a stringified object that contains the user's data
     */
    private getStoredUser(): any {
        return localStorage.getItem("user");
    }

    /**
     * Requests all movie objects from API
     * @returns {array} Every movie in the database
     */
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

    /**
     * Requests a specific movie object from the API
     * @param {string} Title
     * @returns {object} Data about a movie with the provided title.
     */
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

    /**
     * Requests a specific director by name.
     * @param {string} name
     * @returns {object} Data about the director with the specified name.
     */
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

    /**
     * Requests a specific genre by name.
     * @param {string} name
     * @returns {object} Data about the genre with the specified name.
     */
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

    /**
     * Requests a specific user by username. Will retrieve the current user's username and token from localStorage
     * and return a user object with a matching Username, as long as the token is valid.
     * @returns {object} All of the currently logged in user's data.
     */
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

    /**
     * Requests the currently logged in user's list of favorites.
     * @returns {array} An array of strings with movie IDs corresponding to the currently logged in user's favorites.
     */
    public getUserFavorites(): Observable<any> {
        const token = this.getStoredToken();
        const user = JSON.parse(this.getStoredUser());
        const options = {
            headers: new HttpHeaders({
                Authorization: "Bearer " + token,
            }),
        };
        return this.http
            .get(apiUrl + "users/" + user.Username + "/favorites", options)
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    /**
     * Adds a specific movie to the currently logged in user's favorites.
     * There is nothing on the back end to prevent the user from having duplicate favorites, so be careful not to allow the user to favorite a movie more than once.
     * @param {string} movieID
     * @returns {object} The updated user object with an updated Favorites array.
     */
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

    /**
     * Sends an object with user's new username, password, email, and birthday to the back end to update user profile
     * @param {object} userDetails
     * @returns {object} The updated user object on the server.
     */
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

    /**
     * Sends a request to the server to delete a user's account. This functionality is not currently in the application, But could be added fairly easily.
     * @returns {string} User deletion confirmation.
     */
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

    /**
     * Sends a request to the server to delete a movie from the currently logged in user's favorites list.
     * @param {string} movieID
     * @returns {object} The updated user object without the specified movie in the favorites list.
     */
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

    /**
     * Sends the user's username and password to the server to retrieve a token and log in the user.
     * @param {object} userDetails
     * @returns {object} The user's data including email, birthday and favorites, and a token.
     */
    public userLogin(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http
            .post(apiUrl + "login", userDetails)
            .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    /**
     * Sends the user's data to the server so it can build a user on the database and allow the user to log in.
     * @param {object} userDetails
     * @returns { object } The user's data, including a randomly generated _id and an empty array of favorites.
     */
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http
            .post(apiUrl + "users", userDetails)
            .pipe(catchError(this.handleError));
    }

    /**
     * This function handles any errors that may come up in the process of requesting data from the server.
     * @param {object} error
     * @returns {function throwError(error: string)} Throws an error message to let the user know their request failed.
     */
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

    /**
     * Returns the response from the server, or an empty object if there is no response from the server.
     * @param {any} res
     * @returns {any} Whatever data is being requested from the server
     */
    private extractResponseData(res: any): any {
        const body = res;
        return body || {};
    }
}
