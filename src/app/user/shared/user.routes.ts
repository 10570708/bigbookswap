/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
*
*/
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';

export const userRoutes = [
    {path: 'profile', component: ProfileComponent},
    {path: 'login', component: LoginComponent},
    {path: 'login/:err', component: LoginComponent}
]