import { Component } from "@angular/core";
import { BookService, IBook } from "../books/shared/index";
import { AuthService } from "../user/auth.service";
import { Router} from '@angular/router'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatAlertComponent } from './mat-alert.component';


@Component({
    selector: 'app-nav-bar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavBarComponent{

    searchTerm: string = this.getSearchTerm();
    foundBooks: IBook[] = [];

    constructor(public auth:AuthService, private bookService: BookService, private router: Router,private dialog: MatDialog, private authService: AuthService){}

getSearchTerm(){
    return this.bookService.getSearchTerm();
}


openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        title: 'Angular For Beginners'
    };

    dialogConfig.width = '600px';
    dialogConfig.panelClass= 'my-class';

    this.dialog.open(MatAlertComponent, dialogConfig);
    
}
    searchBooks(searchTerm:string){


        // this.bookService.searchBooks(searchTerm).subscribe(
        //     books => {
        //         this.foundBooks = books;
        //         console.log(this.foundBooks);
        //     }
        // );

        var newHref = '/books/'+searchTerm; 
        this.bookService.setSearchTerm(searchTerm);
        this.searchTerm = '';
        this.router.navigate([newHref]);
        

    }

    logUserOut()
    {
        this.authService.logUserOut();
       // this.router.navigate(['']);

    }

    searchSwaps(searchTerm:string)
    {
        var newHref = '/swaps/'+searchTerm; 
        // this.bookService.setSearchTerm(searchTerm);
        // this.searchTerm = '';
        this.router.navigate([newHref]);
    }
    setUp(path:string)
    {
        //var newHref = '/books/';
        // this.bookService.setSearchTerm(searchTerm);
        // this.searchTerm = '';
        this.router.navigate([path]);
    }

}