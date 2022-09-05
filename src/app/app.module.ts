/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
*
*/
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/dialog/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

import { AppComponent } from './books-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { SwapListComponent } from './swaps/swap-list.component';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/shared/service/auth.service';
import { appRoutes } from './routes';


import {
  BooksListComponent,
  BooksThumbnailComponent,
  BookDetailsComponent,
  CreateBookComponent,
  BookLookupComponent,
  BooksPickComponent
} from './books/index';

import {
  AuthGuard,
  AuthInterceptor,
  SessionService,
  OpenLibAPIService,
  BookService,
  SwapService,
  TOASTR_TOKEN, Toastr
} from './shared/index';


declare let toastr:Toastr 

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{ onSameUrlNavigation: 'reload' }),
    RouterModule.forRoot([
      {
          path: 'secured',
          component: NavBarComponent,
          pathMatch: 'full',
          canActivate: [AuthGuard]
      }
  ]),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    AppComponent,
    BooksListComponent,
    BooksThumbnailComponent,
    CreateBookComponent,
    NavBarComponent,
    BookDetailsComponent,
    Error404Component,
    BookLookupComponent,
    BookDetailsComponent,
    SwapListComponent,
    BooksPickComponent
  ],
  providers: [
    BookService,
    SwapService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    OpenLibAPIService,
    { 
        provide: 'canDeactivateCreateBook',
        useValue: checkDirtyState
    },
    AuthService,
   {  provide: HTTP_INTERCEPTORS,
        useFactory: function (router: Router) {
            return new AuthInterceptor(router);
        },
        multi: true,
        deps: [Router]
    },
    AuthGuard,
    SessionService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function checkDirtyState(component:CreateBookComponent) {
  if (component.isDirty)  
    return window.confirm('Leave without saving ? ');
    return true; 

}
