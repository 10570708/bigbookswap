import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";

@Component ({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
    username:any;
    password:any;
    mouseoverLogin:any;
    loginError:any;
    

    constructor(
        private authService:AuthService, 
        private route: Router, 
        private router: ActivatedRoute){}

    ngOnInit() {
        this.loginError = this.router.snapshot.params['err'];
    }
    
    async login(formValues:any){
        console.log('Logging in !!');
        await this.authService.loginUser(formValues.username, formValues.password);
        console.log('Just authenticatd');

    }

}