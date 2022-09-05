/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* AuthGuard - controls authorisation required to access the routes - both client side (session) and server side (cookie)
*
*/
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable, map, of } from "rxjs";
import { SessionService } from "./sessionService";
import { AuthService } from "../../user/shared/service/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private sessionService: SessionService) { }


    canActivate() {

        if (this.sessionService.isLoggedIn()) {
            return this.isSignedIn();
        }
        else {
            this.router.navigate(['user/login']);
            return of(false);
        }
    }

    isSignedIn(): Observable<boolean> {
        return this.authService.isSignedIn().pipe(
            map((isSignedIn) => {
                if (!isSignedIn) {
                    this.router.navigate(['user/login']);
                    return false;
                }
                return true;
            }));
    }
}