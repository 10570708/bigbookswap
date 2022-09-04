import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/user/shared/service/auth.service";
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
                next: data => { this.book = data; }
            });
    }


    getRealBook(): void {
        this.realBook$ = this.apiService.getRealBook(+this.route.snapshot.params['id']);
    }

    ngOnDestroy() {
        this.router.navigated = false;
    }

    buildBookHref() {
        window.open('https://openlibrary.org/isbn/' + this.book?.isbn, "_blank");
    }

    removeBook() {

        if (this.book?.id) {
            this.apiService.deleteBook(this.book.id).subscribe((response) => {
              // console.log('');
            });

            this.authService.reduceUserBookCount(this.authService.currentUser.id);
            this.router.navigate(['/books']);
        }

    }

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
}
