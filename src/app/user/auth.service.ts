import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RouteConfigLoadEnd, Router } from "@angular/router";
import { Observable, of, map } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from "../storage-service";


import { IUser } from "./usr.modl";

@Injectable()
export class AuthService {

    currentUser!: IUser;
    reset = false;
    isLoginFailed = false;
    isLoggedIn = false;


    constructor(private httpClient: HttpClient, private storageService: StorageService, private router: Router) { }

    public user() {

        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        let options = {
            headers: httpHeaders, withCredentials: true
        };
        return this.httpClient.get<IUser>('http://localhost:8080/api/v1/user/getme', options);
    }


    public isSignedIn(): Observable<boolean> {


        console.log('Checking is valid');

        return this.user().pipe(
            map((user) => {
                const hasId = user.id !== null;
                console.log('The user id is ' + user.id);
                console.log('Not sure of this ' + !hasId ? false : true)
                return !hasId ? false : true;
            }
            ),
            catchError((error) => {
                console.log('Caught ERROR ');
                return of(false);
            }
            ));
    }



    loginUser(userName: string, password: string) {

        let loginInfo = { username: userName, password: password };


        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        let options = {
            headers: httpHeaders, withCredentials: true
        };

        console.log('Checking fo r' + userName + ' and ' + password);

        this.httpClient.post<IUser>('http://localhost:8080/api/v1/user/login', loginInfo, options)
            .subscribe({
                next: data => {
                    // var stringified = JSON.stringify(data);
                    // var parsed:IBook = JSON.parse(stringified);
                    // console.log('Loading book' + parsed.title);
                    this.currentUser = data;
                    this.reset = false;
                    this.storageService.saveUser(data);
                    this.isLoginFailed = false;
                    this.isLoggedIn = true;
                    console.log('Got user ' + this.currentUser.id + ' and ' + data.id)
                },
                error: error => {
                    console.log('Error logging in ');
                    this.router.navigate(['user/login/err']);


                },
                complete: () => {
                    this.router.navigate(['books']);
                }
            });


        // .pipe(tap(data=> {
        //     console.log('Got a return);')
        //     this.currentUser = data;
        // }))
        // .pipe(catchError(err => {
        //     console.log('Error from login');
        //     return of(false);
        // }))

        // this.currentUser = {
        //     id:1,
        //     userName: 'LDal',
        //     access: 'user',
        //     avatar: 'cat'
        // }


    }


    logUserOut() {
        this.reset = true;

        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        let options = {
            headers: httpHeaders
        };


        this.httpClient.post<IUser>('http://localhost:8080/api/v1/user/logout', options)
            .subscribe({
                next: data => {
                    // var stringified = JSON.stringify(data);
                    // var parsed:IBook = JSON.parse(stringified);
                    // console.log('Loading book' + parsed.title);
                    console.log('Got user ' + data);
                    this.storageService.clean();
                    this.isLoggedIn = false;
                }
            });

        //this.router.navigate(['user/login']);

    }

    isAuthenticated() {
        //console.log('Checking auth ');

        return this.isLoggedIn;
    }

    updateCurrentUser(avatar: string) {

        console.log('Updating' + avatar);

        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        let options = {
            headers: httpHeaders
        };


        this.httpClient.put('http://localhost:8080/api/v1/user/avatar/'+ this.currentUser.id +'/'+avatar, options)
            .subscribe({
                next: data => {
                    // var stringified = JSON.stringify(data);
                    // var parsed:IBook = JSON.parse(stringified);
                    // console.log('Loading book' + parsed.title);
                    console.log('Got user ' + data);
                }
            });


        this.currentUser.avatar = avatar;
    }
}