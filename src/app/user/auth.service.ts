import { Injectable } from "@angular/core";
import { RouteConfigLoadEnd } from "@angular/router";

import { IUser } from "./usr.modl";

@Injectable()
export class AuthService{
currentUser!:IUser;

    loginUser(userName: string, password: string){
        this.currentUser = {
            id:1,
            userName: 'LDal',
            access: 'user',
            avatar: 'cat'
        }
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