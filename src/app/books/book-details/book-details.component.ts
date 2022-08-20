import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IBook, ISwap, SwapService } from "../shared";
import { BookService } from "../shared/book.service";

@Component({
    templateUrl: './book-details.component.html'

})

export class BookDetailsComponent implements OnInit{
    book!: IBook
    swap: ISwap = <ISwap>{};

    constructor(private bookService: BookService, private route:ActivatedRoute, private router: Router, private swapService: SwapService) {

    }

    ngOnInit() {
        this.book = this.bookService.getBook(+this.route.snapshot.params['id']) as IBook;
       
        //console.log('Book ' + this.book.title);
    }

    buildBookHref() {
        window.open('https://openlibrary.org/isbn/' + this.book.isbn, "_blank");
    }

    removeBook(){
        this.bookService.removeBook(this.book.id);
        this.router.navigate(['/books']);

    }

    requestSwap(){
        this.swap.offerBookId = this.book.id;
        this.swapService.saveSwap(this.swap);
        this.router.navigate(['/books']);

    }

}
