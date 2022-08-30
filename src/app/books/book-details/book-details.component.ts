import { CloseScrollStrategy } from "@angular/cdk/overlay";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/user/auth.service";
import { APIService, IBook, ISwap, BookStatus, OptionType, Swap, SwapMember, StatusType } from "../shared/index";
import { BookService, SwapService } from "../shared/index";

@Component({
    selector: 'book-details-component',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.style.scss']

})

export class BookDetailsComponent implements OnInit {
    book?: IBook
    swap: ISwap = <ISwap>{};
    realBook$!: Observable<IBook>;
    bookStatus = BookStatus;
    bookOption = OptionType;
    ownerId = this.authService.currentUser.id;

    constructor(
        private bookService: BookService, 
        private route: ActivatedRoute, 
        private router: Router, 
        private swapService: SwapService, 
        private authService: AuthService,
        private apiService: APIService) {
            this.router.routeReuseStrategy.shouldReuseRoute = function () {
                return false;
            };
    }

    ngOnInit() {

        this.getRealBook();

        this.apiService.getRealBook(+this.route.snapshot.params['id'])
            .subscribe({
                next: data => {
                    // var stringified = JSON.stringify(data);
                    // var parsed:IBook = JSON.parse(stringified);
                    // console.log('Loading book' + parsed.title);
                    this.book = data;
                }
            });


        //this.book = this.apiService.getRealBook(+this.route.snapshot.params['id']) as IBook;
        //this.book = this.bookService.getBook(+this.route.snapshot.params['id']) as IBook;       
    }



    getRealBook(): void {
        this.realBook$ = this.apiService.getRealBook(+this.route.snapshot.params['id']);
        // this.apiService.getRealBook(+this.route.snapshot.params['id'])
        // .subscribe(
        //     data => { this.realBook = data; },
        //     err => console.error(err),
        //     () => console.log('Page loaded')
        // );
    }

    ngOnDestroy() {
        this.router.navigated = false;
        //console.log('ngOnDestroy: cleaning up...');
    }

    buildBookHref() {
        window.open('https://openlibrary.org/isbn/' + this.book?.isbn, "_blank");
    }

    removeBook() {

        if (this.book?.id) {
            this.apiService.deleteBook(this.book.id).subscribe((response) => {
                console.log('');
            });

            this.authService.reduceUserBookCount(this.authService.currentUser.id);
            this.router.navigate(['/books']);
        }

    }

    requestSwap() {
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
                offerMember,
                recipientMember,
                StatusType.Res);

              
            this.swapService.saveSwapRequest(mySwap)
            .subscribe({
                next: data => {
                    // var stringified = JSON.stringify(data);
                    // var parsed:IBook = JSON.parse(stringified);
                    // console.log('Loading book' + parsed.title);
                    console.log('Got new swap id ' + data.id);
                    //this.router.navigate(['book/' + this.bookDisplay.id]);
                },
                complete: () => {

                    this.router.navigate(['/swaps/sent']);
                    
                }
            },
                );

            
        }
    }

    requestDonation() {
        if (this.book?.id) {
            // this.swap.offerMember?.bookId = this.book.id;
            // this.swapService.saveSwap(this.swap);
            // this.router.navigate(['/swaps/sent']);
        }
    }

}
