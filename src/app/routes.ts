import { Routes } from "@angular/router";
import {
    BookDetailsComponent,
    EventRouteActivator,
    BooksListComponent,
    CreateBookComponent,
    BookListResolver
} from './books/index'




import { Error404Component } from "./errors/404.component";
import { SwapListComponent } from "./swaps/swap-list.component";
import { AuthGuard } from "./authGuard";

export const appRoutes:Routes= [
    
 
    { path: 'book/new', component: CreateBookComponent, canActivate:[AuthGuard]},

    { path: 'books/:search', component: BooksListComponent, canActivate: [AuthGuard]},
    { path: 'books', component: BooksListComponent,canActivate: [AuthGuard]},
    { path: 'book/:id', component: BookDetailsComponent, canActivate: [AuthGuard]},
    { path: 'swaps', component: SwapListComponent,canActivate: [AuthGuard]},
    { path: 'swaps/:filter', component: SwapListComponent,canActivate: [AuthGuard]},
    



    { path: '404', component: Error404Component},
    { path: '', redirectTo: '/user/login', pathMatch: 'full'},
    { 
        path: 'user', 
        loadChildren: () => 
            import('./user/user.module')
            .then(m => m.UserModule)
    }
]