import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IBook } from "../shared/index";

@Component({
    selector: 'app-books-thumbnail',
    templateUrl: 'books-thumbnail.component.html',
    styleUrls: ['books-thumbnail.component.scss']
})


export class BooksThumbnailComponent {
    @Input() booklist = {} as IBook;

    constructor(private router: Router) {  
        this.router.navigated = false;
    }

   loadBook(bookId: number)
    {
        this.router.navigated = false;
        this.router.navigate(['book/' + bookId]);
    }
}