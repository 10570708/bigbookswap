import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";

@Component ({

    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']

})

export class LoginComponent implements OnInit{
    userName:any;
    password:any;
    mouseoverLogin:any;
    loginError:any;
    

    constructor(private authService:AuthService, private route: Router, private router: ActivatedRoute){

    }

    ngOnInit() {
        //console.log('Hitting lists with  ' + this.route.snapshot.params['filter']);
        //this.router.onSameUrlNavigation = 'reload';

        //this.allbooks = this.route.snapshot.data['allbooks'];

        this.loginError = this.router.snapshot.params['err'];
    }
    
    async login(formValues:any){
        console.log('Logging in !!');
        await this.authService.loginUser(formValues.userName, formValues.password);
        console.log('Just authenticatd');

    }

    cancel() {
        this.route.navigate(['books']);
    }

}