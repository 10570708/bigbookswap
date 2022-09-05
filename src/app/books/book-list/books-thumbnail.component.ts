/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* Books ThumbnailComponent : controls the display for each individual listing ( thumbnail ) in the 'All Books' Page 
*
*/
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IBook } from "../../shared/index";

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