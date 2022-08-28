import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';

export const userRoutes = [
    {path: 'profile', component: ProfileComponent},
    {path: 'login', component: LoginComponent},
    {path: 'login/:err', component: LoginComponent}
]