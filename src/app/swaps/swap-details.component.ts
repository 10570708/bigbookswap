import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IBook, ISwap, SwapService } from "../books/shared";
import { BookService } from "../books/shared/book.service";

@Component({
    templateUrl: './swap-details.component.html'

})

export class SwapDetailsComponent implements OnInit{
    book!: IBook
    swap: ISwap = <ISwap>{};
    Swaps: ISwap[]= [];

    constructor(private bookService: BookService, private route:ActivatedRoute, private router: Router, private swapService: SwapService) {

    }

    ngOnInit() {
        this.book = this.bookService.getBook(+this.route.snapshot.params['id']) as IBook;
        this.Swaps = this.swapService.getAllSwaps();
       
        console.log('Swaps  ' + this.Swaps);
    }

getTitle(id: number){
    var book = this.bookService.getBook(id);
    console.log('Title is ' + book.title);
    return book.title;
}

getCover(id: number){
    var book = this.bookService.getBook(id);
    console.log('Title is ' + book.cover);
    return book.cover;
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
