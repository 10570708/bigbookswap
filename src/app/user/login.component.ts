import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component ({

    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']

})

export class LoginComponent {
    userName:any;
    password:any;
    mouseoverLogin:any;
    

    constructor(private authService:AuthService, private router: Router){

    }
    
    login(formValues:any){
        this.authService.loginUser(formValues.userName, formValues.password);
        this.router.navigate(['books']);
    }

    cancel() {
        this.router.navigate(['books']);
    }

}