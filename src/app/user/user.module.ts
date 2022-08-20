import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select"


import { userRoutes } from './user.routes';
import { ProfileComponent } from "./profile.component";
import { LoginComponent } from "./login.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(userRoutes),
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    declarations:[
        ProfileComponent,
        LoginComponent
    ],
    providers: [

    ]


    
})

export class UserModule{}
