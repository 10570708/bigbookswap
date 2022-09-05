/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* LoginComponent - controls user login form & validation & processing
*
*/
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../shared/service/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  username: any;
  password: any;
  mouseoverLogin: any;
  loginError: any;


  constructor(
    private authService: AuthService,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.loginError = this.router.snapshot.params['err'];
  }

  async login(formValues: any) {
    this.authService.loginUser(formValues.username, formValues.password);
  }

}