import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RouteConfigLoadEnd, Router } from "@angular/router";
import { Observable, of, map } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from "../../../storage-service";


import { IUser } from "../model/user.model";

@Injectable()
export class AuthService {

    currentUser!: IUser;
    reset = false;
    isLoginFailed = false;
    isLoggedIn = false;

    


    constructor(
        private httpClient: HttpClient, 
        private storageService: StorageService,
         private router: Router) { }


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

        return this.user().pipe(
            map((user) => {
                const hasId = user.id !== null;
              // console.log('TAUTH SERVICE - is Loggd In - the user id is ' + user.id);
                //console.log('Not sure of this ' + !hasId ? false : true)
                this.currentUser = user;
              // console.log(this.currentUser.id);
              // console.log(this.currentUser.username + '-' + this.currentUser.numDonations + '-' + this.currentUser.numSwaps);
                return !hasId ? false : true;             
            },
            ),
            catchError((error) => {
              // console.log('Caught ERROR ');

                return of(false);
            }
            ));
    }

    public updateUSer(){

    }

    loginUser(username: string, password: string) {

        let loginInfo = { username: username, password: password };

        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });

        let options = { headers: httpHeaders, withCredentials: true };

      // console.log('Checking fo r' + username + ' and ' + password);

        this.httpClient.post<IUser>('http://localhost:8080/api/v1/user/login', loginInfo, options)
            .subscribe({
                next: data => {
                    this.currentUser = data;
                    this.reset = false;
                    this.storageService.saveUser(data);
                    this.isLoginFailed = false;
                    this.isLoggedIn = true;
                },
                error: error => {
                  // console.log('Error logging in ');
                    this.router.navigate(['user/login/err']);
                },
                complete: () => {
                    this.router.navigate(['books']);
                }
            });
    }


    public logUserOut() {

        this.reset = true;

        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        let options = { headers: httpHeaders };


        this.httpClient.post<IUser>('http://localhost:8080/api/v1/user/logout', options)
            .subscribe({
                next: data => {
                    this.storageService.clean();
                    this.isLoggedIn = false;
                }
            });
    }

    isAuthenticated() {
        return this.isLoggedIn && this.storageService.isLoggedIn();
    }

    updateCurrentUser(avatar: string) {

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
                  // console.log('Got user ' + data);
                }
            });


        this.currentUser.avatar = avatar;
    }

    getusername(): string {
         if (this.isLoggedIn) return this.currentUser.username;
         return "";
    }


    updateUserCount(id:number, type:string) {

        let apiUrl = 'http://localhost:8080/api/v1/user/';
        if (type === 'book') apiUrl += 'bookcount/';
        else if (type === 'swap') apiUrl += 'swapcount/';
        else if (type === 'donate') apiUrl += 'donatecount/';

        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        let options = { headers: httpHeaders };

        var updatedUser : any;
        this.httpClient.put(apiUrl+id, options)
            .subscribe({
                next: data => {
                    updatedUser = data;
                    this.storageService.saveUser(data);
                  // console.log('Got user ' + this.currentUser.id + ' and ' + data)
                  // console.log('Got user ' + data);
                },
                complete: () => {
                    this.currentUser = updatedUser;
                }                               
            });
        }

        reduceUserBookCount(id:number) {

            let httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            });
            let options = { headers: httpHeaders };
    
            var updatedUser : any;
            this.httpClient.put('http://localhost:8080/api/v1/user/bookcount/reduce/'+id, options)
                .subscribe({
                    next: data => {
                        updatedUser = data;
                        this.storageService.saveUser(data);
                        //console.log('Got user ' + this.currentUser.id + ' and ' + data)
                        //console.log('Got user ' + data);
                    },
                    complete: () => {
                        this.currentUser = updatedUser;
                    }                               
                });
            }

        // public getUserId(): any {
        //    return this.currentUser.id
        //   }
        //   public getusername(): any {
        //     const user = window.sessionStorage.getItem(USER_KEY);
        //     if (user) {
        //       return JSON.parse(user).username;
        //     }
        //     return {};
        //   }
        
        
        //   public getUserBooks(): any {
        //     const user = window.sessionStorage.getItem(USER_KEY);
        //     if (user) {
        //       return JSON.parse(user).numBooks;
        //     }
        //     return {};
        //   }
        
        //   public getUserDonations(): any {
        //     const user = window.sessionStorage.getItem(USER_KEY);
        //     if (user) {
        //       return JSON.parse(user).numDonations;
        //     }
        //     return {};
        //   }
        //   public getUserSwaps(): any {
        //     const user = window.sessionStorage.getItem(USER_KEY);
        //     if (user) {
        //       return JSON.parse(user).numSwaps;
        //     }
        //     return {};
        //   }
   }
