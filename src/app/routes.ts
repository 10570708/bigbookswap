/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
*
*/
import { Routes } from "@angular/router";
import {
    BookDetailsComponent,
    BooksListComponent,
    CreateBookComponent,
} from './books/index'




import { Error404Component } from "./errors/404.component";
import { SwapListComponent } from "./swaps/swap-list.component";
import { AuthGuard } from "./shared/auth/authGuard";

export const appRoutes:Routes= [
    
 
    { path: 'book/new', component: CreateBookComponent, canActivate:[AuthGuard]},

    { path: 'books/:search', component: BooksListComponent, canActivate: [AuthGuard]},
    { path: 'books', component: BooksListComponent,canActivate: [AuthGuard]},
    { path: 'book/:id', component: BookDetailsComponent, canActivate: [AuthGuard]},
    { path: 'swaps', component: SwapListComponent,canActivate: [AuthGuard]},
    { path: 'swaps/:filter', component: SwapListComponent,canActivate: [AuthGuard]},
    



    { path: '', redirectTo: '/user/login', pathMatch: 'full'},
    { 
        path: 'user', 
        loadChildren: () => 
            import('./user/shared/user.module')
            .then(m => m.UserModule)
    },

    { path: '**', component: Error404Component},

]