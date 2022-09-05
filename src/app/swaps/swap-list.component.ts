/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* SwapListComponent - controls the search and display of a user's swaps 
*
*/
import { Component, OnInit } from '@angular/core'
import { BookService, BookStatus, StatusType, Swap, SwapService, IBook, ISwap} from '../shared/index';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BooksPickComponent } from '../books/book-swap/books-pick.component';
import { AuthService } from '../user/shared/service/auth.service';


@Component({
    templateUrl: './swap-list.component.html',
    styleUrls: ['./swap-list.component.scss']
})
export class SwapListComponent implements OnInit {

    allbooks!: IBook[];
    searchableSwaps: ISwap[] = [];
    visibleSwaps: ISwap[] = [];
    morebooks: any;
    searchTerm: string = '';
    searchComplete: boolean = false;
    swapResults: Swap[] = [];
    usr = this.authService.currentUser.id;
    updateSucceeded = false;

    constructor(
        private bookService: BookService,
        private router: Router,
        private route: ActivatedRoute,
        private swapService: SwapService,
        private dialog: MatDialog,
        private authService: AuthService,
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    // Filter swaps basd on route param 'filter' 

    ngOnInit() {
        this.searchTerm = this.route.snapshot.params['filter'];

        this.swapService.searchSwaps(this.searchTerm, this.authService.currentUser.id)
            .subscribe({
                next: data => {
                    var stringified = JSON.stringify(data);
                    var parsed = JSON.parse(stringified);
                    this.swapResults = parsed;
                },
                error: () => { this.searchComplete = true; },
                complete: () => { this.searchComplete = true; }
            });

    }

    // Accept a donate request - called on 'click' of 'Accpt Donate Request' button
    acceptDonate(swap: Swap) {

        swap.status = StatusType.Acc;
        swap.type = 'donate';
        this.swapService.acceptSwapRequest(swap)
            .subscribe({
                complete: () => { this.router.navigate(['/swaps/all']); }
            },
            );
    }

    // Mark swap as 'Complete' - called on 'click' of 'Complete Swap' button 

    completeSwap(swap: Swap) {
        swap.status = StatusType.Swap;
        this.swapService.completeSwap(swap)
            .subscribe({
                next: data => {
                    var stringified = JSON.stringify(data);
                    var parsed = JSON.parse(stringified);
                    this.swapResults = parsed;
                }
                ,
                error: () => { this.updateSucceeded = false},
                complete: () => {

                    let bookId = 0;
                    let bookStatus = '';
                    if (swap.type === 'swap') {
                        bookStatus = BookStatus.Swapped;
                        if (swap.offerMember?.ownerId)
                            this.authService.updateUserCount(swap.offerMember.ownerId, 'swap');
                            bookId = (swap.offerMember?.bookId) ? swap.offerMember?.bookId : 0;
                            this.updateBook(bookId,bookStatus);

                        if (swap.recipientMember?.ownerId)
                            this.authService.updateUserCount(swap.recipientMember.ownerId, 'swap');
                            bookId = (swap.recipientMember?.bookId) ? swap.recipientMember?.bookId : 0;
                            this.updateBook(bookId,bookStatus);

                    }
                    else if (swap.type === 'donate' && swap.recipientMember?.ownerId) {
                        bookStatus = BookStatus.Donated;
                        bookId = (swap.offerMember?.bookId) ? swap.offerMember?.bookId : 0;
                        this.authService.updateUserCount(swap.recipientMember?.ownerId, 'donate');
                        this.updateBook(bookId,bookStatus);

                    }
                }
            });
        this.router.navigate(['/swaps', 'done']);
    }


    // Update the book status on completion of swap/donate 

    updateBook(id: number, status: string){
        this.bookService.updateBook(id,status)
        .subscribe({
            complete: () => { this.updateSucceeded = true; }
        },
        );

        
    }

    // Open the mat-dialog to list books available to be swapped 
    
    openViewAvailableSwapBooksDialog(swapid: number, id?: number) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            id: 1,
            title: 'Book Swap Lookup',
            owner: id,
            swap: swapid

        };

        dialogConfig.width = '900px';
        dialogConfig.panelClass = 'my-class';

        this.dialog.open(BooksPickComponent, dialogConfig);

    }
}
