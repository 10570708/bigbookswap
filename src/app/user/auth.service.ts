import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RouteConfigLoadEnd } from "@angular/router";
import { of } from "rxjs";
import { catchError, tap } from 'rxjs/operators'; 

 
import { IUser } from "./usr.modl";

@Injectable()
export class AuthService{
currentUser!:IUser;

constructor(private httpClient: HttpClient)
{}
    loginUser(userName: string, password: string){

        let loginInfo = { username: userName, password: password };

        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};


        this.httpClient.post<IUser>('/api/login/', loginInfo, options)
            .pipe(tap(data=> {
                this.currentUser = data;
            }))
            .pipe(catchError(err => {
                return of(false);
            }))

        // this.currentUser = {
        //     id:1,
        //     userName: 'LDal',
        //     access: 'user',
        //     avatar: 'cat'
        // }
    }

    isAuthenticated() {
        //console.log('Checking auth ');

        return !!this.currentUser;
    }

    updateCurrentUser(first: string, avatar: string){
        this.currentUser.userName = first;
        this.currentUser.avatar = avatar;
    }
}