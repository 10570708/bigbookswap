import { Component } from "@angular/core";
import { BookService, IBook } from "../books/shared/index";
import { AuthService } from "../user/shared/service/auth.service";
import { Router} from '@angular/router'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatAlertComponent } from '../common/mat-alert.component';
import { ProfileComponent } from "../user/profile/profile.component";
import { StorageService } from "../storage-service";


@Component({
    selector: 'app-nav-bar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavBarComponent{

    searchTerm: string = this.getSearchTerm();
    foundBooks: IBook[] = [];
    userProfileName = "";

    constructor(public auth:AuthService, private bookService: BookService, private router: Router,private dialog: MatDialog, private authService: AuthService, private storageService: StorageService){}

    getSearchTerm(){
        return this.bookService.getSearchTerm();
    }

    resetSearch() { this.bookService.resetSearchTerm();  }


    getSearchSet(){
        return this.bookService.getSearchSet();
    }

    searchBooks(searchTerm:string){

        var newHref = '/books/'+searchTerm; 
        this.bookService.setSearchTerm(searchTerm);
        this.searchTerm = '';
        this.router.navigate([newHref]);
    }

    openProfileDialog() {

      // console.log('The nav says ' + this.auth.isAuthenticated());

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            id: 1,
            title: 'Profile',
            owner: this.authService.currentUser.id
        };

        dialogConfig.maxWidth = '800px';
        dialogConfig.panelClass = 'my-class';

        const dialogRef = this.dialog.open(ProfileComponent, dialogConfig);
    }

    logUserOut()
    {
        this.authService.logUserOut();
        this.router.navigate(['/user/login']);
    }

    searchSwaps(searchTerm:string)
    {
        this.bookService.resetSearchTerm;
        var newHref = '/swaps/'+searchTerm; 
        this.router.navigate([newHref]);
    }

    setUp(path:string)
    {
        this.bookService.resetSearchTerm();
        this.router.navigate([path]);
    }

}