import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, pipe, map, of } from "rxjs";
import { StorageService } from "./storage-service";
import { AuthService } from "./user/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private storageService: StorageService) { }


    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.storageService.isLoggedIn()) {
            console.log('Returning true for logged in ');
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