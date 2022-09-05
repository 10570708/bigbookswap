/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* AuthService - controls API calls to BBS USer API for login / authorisation & user updates 
*
*/
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, map } from "rxjs";
import { catchError } from 'rxjs/operators';
import { SessionService } from "../../../shared/auth/sessionService";


import { IUser } from "../model/user.model";

@Injectable()
export class AuthService {

    currentUser!: IUser;
    reset = false;
    isLoginFailed = false;
    isLoggedIn = false;
    AUTH_API_PATH = 'http://localhost:8080/api/v1/user/';
    updateSucceeded = false;


    constructor(
        private httpClient: HttpClient,
        private sessionService: SessionService,
        private router: Router) { }


    public user() {
        return this.httpClient.get<IUser>(this.AUTH_API_PATH + 'getme', this.setHttpHeaders());
    }


    public isSignedIn(): Observable<boolean> {

        return this.user().pipe(
            map((user) => {
                const hasId = user.id !== null;
                this.currentUser = user;
                return !hasId ? false : true;
            },
            ),
            catchError((error) => {
                return of(false);
            }
            ));
    }


    loginUser(username: string, password: string) {

        let loginInfo = { username: username, password: password };

        this.httpClient.post<IUser>(this.AUTH_API_PATH + 'login', loginInfo, this.setHttpHeaders())
            .subscribe({
                next: data => {
                    this.currentUser = data;
                    this.reset = false;
                    this.sessionService.saveUser(data);
                    this.isLoginFailed = false;
                    this.isLoggedIn = true;
                },
                error: error => {
                    this.router.navigate(['user/login/err']);
                },
                complete: () => {
                    this.router.navigate(['books']);
                }
            });
    }


    public logUserOut() {
        this.reset = true;

        this.httpClient.post<IUser>(this.AUTH_API_PATH + 'logout', this.setHttpHeaders())
            .subscribe({
                next: () => {
                    this.sessionService.clean();
                    this.isLoggedIn = false;
                }
            });
    }

    isAuthenticated() {
        return this.isLoggedIn && this.sessionService.isLoggedIn();
    }

    updateCurrentUser(avatar: string) {

        this.httpClient.put(this.AUTH_API_PATH + 'avatar/' + this.currentUser.id + '/' + avatar, this.setHttpHeaders())
            .subscribe({
                next: () => {
                    this.updateSucceeded = true;
                }
            });
        this.currentUser.avatar = avatar;
    }

    getusername(): string {
        if (this.isLoggedIn) return this.currentUser.username;
        return "";
    }


    updateUserCount(id: number, type: string) {

        let apiUrl = this.AUTH_API_PATH;
        if (type === 'book') apiUrl += 'bookcount/';
        else if (type === 'swap') apiUrl += 'swapcount/';
        else if (type === 'donate') apiUrl += 'donatecount/';

        var updatedUser: any;
        this.httpClient.put(apiUrl + id, this.setHttpHeaders())
            .subscribe({
                next: data => {
                    updatedUser = data;
                    this.sessionService.saveUser(data);
                    this.updateSucceeded = true;
                },
                complete: () => {
                    this.currentUser = updatedUser;
                }
            });
    }

    reduceUserBookCount(id: number) {
        var updatedUser: any;

        this.httpClient.put(this.AUTH_API_PATH + 'bookcount/reduce/' + id, this.setHttpHeaders())
            .subscribe({
                next: data => {
                    updatedUser = data;
                    this.sessionService.saveUser(data);
                    this.updateSucceeded = true;
                },
                complete: () => {
                    this.currentUser = updatedUser;
                }
            });
    }

    setHttpHeaders() {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        let options = {
            headers: httpHeaders, withCredentials: true
        };
        return options;
    }

}
