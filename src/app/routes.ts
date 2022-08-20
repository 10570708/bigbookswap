import { Routes } from "@angular/router";
import {
    BookDetailsComponent,
    EventRouteActivator,
    BooksListComponent,
    CreateBookComponent,
    BookListResolver
} from './books/index'

import { SwapDetailsComponent } from './swaps/swap-details.component';



import { Error404Component } from "./errors/404.component";
import { SwapListComponent } from "./swaps/swap-list.component";

export const appRoutes:Routes= [
    { path: 'swaps', component: SwapListComponent},
    { path: 'swaps/:filter', component: SwapListComponent},

    { path: 'swap/:id', component: SwapDetailsComponent},
    { path: 'books/:search', component: BooksListComponent, resolve: {allbooks:BookListResolver} },
    { path: 'books', component: BooksListComponent, resolve: {allbooks:BookListResolver} },
    { path: 'book/new', component: CreateBookComponent, canDeactivate: ['canDeactivateCreateBook']},
    { path: 'book/:id', component: BookDetailsComponent, canActivate: [EventRouteActivator]},


    { path: '404', component: Error404Component},
    { path: '', redirectTo: '/books', pathMatch: 'full'},
    { 
        path: 'user', 
        loadChildren: () => 
            import('./user/user.module')
            .then(m => m.UserModule)
    }
]