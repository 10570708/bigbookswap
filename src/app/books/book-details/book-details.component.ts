/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* BookDetailsComponent : controls the displaying of an individual Book Listing
*
*/

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/user/shared/service/auth.service";
import { IBook, ISwap, BookStatus, OptionType, Swap, SwapMember, StatusType } from "../../shared/index";
import { BookService, SwapService } from "../../shared/index";

@Component({
    selector: 'book-details-component',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.style.scss']
})

export class BookDetailsComponent implements OnInit {
    book?: IBook
    swap: ISwap = <ISwap>{};
    bookStatus = BookStatus;
    bookOption = OptionType;
    ownerId = this.authService.currentUser.id;
    bookRemovedSuccessfully = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private swapService: SwapService,
        private authService: AuthService,
        private bookService: BookService) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }

    // Use BookService to load the Book from id provided in route params 

    ngOnInit() {

        this.bookService.getBook(+this.route.snapshot.params['id'])
            .subscribe({
                next: data => { this.book = data; }
            });
    }

    // Remove Book invoked by click in Book Details Page 

    removeBook() {

        if (this.book?.id) {
            this.bookService.deleteBook(this.book.id)
            .subscribe(() => {
              this.bookRemovedSuccessfully = true;
            });

            this.authService.reduceUserBookCount(this.authService.currentUser.id);
            this.router.navigate(['/books']);
        }
    }

    // Request Swap invoked by click in Book Details Page - builds Swap details and calls swapService to process the request

    requestSwap(type: string) {
        if (this.book?.id) {

            var offerMember = new SwapMember();
            var recipientMember = new SwapMember();

            recipientMember.ownerId = this.book?.ownerId;

            offerMember.setSwapMember(
                this.authService.currentUser.id,
                this.book.id,
                this.book.title,
                this.book.cover,
                this.book.author);

            var mySwap = new Swap();

            mySwap.createSwapRequest(
                type,
                offerMember,
                recipientMember,
                StatusType.Req);

            this.swapService.saveSwapRequest(mySwap)
                .subscribe({
                    complete: () => { this.router.navigate(['/swaps/sent']); }
                });
        }
    }

    
    // Builds the Open Library href for a book lookup 
    
    buildBookHref() {
        window.open('https://openlibrary.org/isbn/' + this.book?.isbn, "_blank");
    }


    ngOnDestroy() {
        this.router.navigated = false;
    }

}
