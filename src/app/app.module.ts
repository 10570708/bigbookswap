//import { NgModule } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import {
  BooksListComponent,
  BooksThumbnailComponent,
  BookDetailsComponent,
  CreateBookComponent,
  BookService,
  SwapService,
  EventRouteActivator,
  BookListResolver

} from './books/index';

import { AppComponent } from './books-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.component';
import { TOASTR_TOKEN, Toastr, JQ_TOKEN, CollapsibleWellComponent } from './common/index';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthService } from './user/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAlertComponent } from './nav/mat-alert.component';
import { APIService } from './books/shared/index';
import { BookLookupComponent } from './books/book-lookup/book-lookup.component';
import { SwapListComponent } from './swaps/swap-list.component';
import { BooksPickComponent } from './books/books-pick.component';

declare let toastr:Toastr 
declare let JQuery:any;


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{ onSameUrlNavigation: 'reload' }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  declarations: [
    AppComponent,
    BooksListComponent,
    BooksThumbnailComponent,
    CreateBookComponent,
    NavBarComponent,
    BookDetailsComponent,
    Error404Component,
    CollapsibleWellComponent,
    MatAlertComponent,
    BookLookupComponent,
    BookDetailsComponent,
    SwapListComponent,
    BooksPickComponent
  ],
  providers: [
    BookService,
    SwapService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    EventRouteActivator,
    APIService,
    { 
        provide: 'canDeactivateCreateBook',
        useValue: checkDirtyState
    },
    BookListResolver,
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatAlertComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateBookComponent) {
  if (component.isDirty)  
    return window.confirm('Leave without saving ? ');
    return true; 

}
