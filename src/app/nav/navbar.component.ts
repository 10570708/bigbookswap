/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* NavBarComponent - controls the Top Nav of the BBS application
*
*/
import { Component } from "@angular/core";
import { BookService, IBook } from "../shared/index";
import { AuthService } from "../user/shared/service/auth.service";
import { Router} from '@angular/router'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfileComponent } from "../user/profile/profile.component";
import { SessionService } from "../shared/auth/sessionService";


@Component({
    selector: 'app-nav-bar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavBarComponent{

    searchTerm: string = this.getSearchTerm();
    foundBooks: IBook[] = [];
    userProfileName = "";

    constructor(public auth:AuthService, private bookService: BookService, private router: Router,private dialog: MatDialog, private authService: AuthService, private sessionService: SessionService){}

    
    // Sets up the search settings and routes to the search page 
    searchBooks(searchTerm:string){
        var newHref = '/books/'+searchTerm; 
        this.bookService.setSearchTerm(searchTerm);
        this.searchTerm = '';
        this.router.navigate([newHref]);
    }

    // Search term setter / getter helper methods

    getSearchTerm(){ return this.bookService.getSearchTerm(); }
    resetSearch() { this.bookService.resetSearchTerm();  }
    getSearchSet(){ return this.bookService.getSearchSet(); }

    // Called on 'click' of 'Profile' button - opens mat-dialog with profile details 

    openProfileDialog() {

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

        this.dialog.open(ProfileComponent, dialogConfig);
    }

    // Called on 'click' of 'Logout' to log user out 

    logUserOut()
    {
        this.authService.logUserOut();
        this.router.navigate(['/user/login']);
    }

    // Handles filtering of choice of 'Swaps' view selected from Top Nav 'View Swaps' dropdown

    searchSwaps(searchTerm:string)
    {
        this.bookService.resetSearchTerm;
        var newHref = '/swaps/'+searchTerm; 
        this.router.navigate([newHref]);
    }

    // Resets search term and navigates to the path passed in 
    setUp(path:string)
    {
        this.bookService.resetSearchTerm();
        this.router.navigate([path]);
    }

}