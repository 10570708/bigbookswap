import { Component } from '@angular/core'
import { APIService, BookService, BookStatus, StatusType, Swap, SwapService } from '../books/shared/index';
import { OnInit } from '@angular/core';
import { IBook, ISwap } from '../books/shared/index';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BooksPickComponent } from '../books/book-swap/books-pick.component';
import { AuthService } from '../user/shared/service/auth.service';
import { map } from 'rxjs';


@Component({
    templateUrl: './swap-list.component.html',
    styleUrls: ['./swap-list.component.scss']
})
export class SwapListComponent implements OnInit {

    allbooks!: IBook[];
    searchableSwaps: ISwap[] = [];
    visibleSwaps: ISwap[] = [];
    morebooks: any;
    // filterBy: string = 'all';
    // filterByOption: string = 'all';
    // sortBy: string = 'title';
    searchTerm: string = '';
    searchComplete: boolean = false;
    swapResults: Swap[] = [];
    usr = this.authService.currentUser.id;



    constructor(
        private bookService: BookService,
        private router: Router,
        private route: ActivatedRoute,
        private swapService: SwapService,
        private dialog: MatDialog,
        private authService: AuthService,
        private apiService: APIService
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {
        //console.log('Hitting lists with  ' + this.route.snapshot.params['filter']);
        //this.router.onSameUrlNavigation = 'reload';

        //this.allbooks = this.route.snapshot.data['allbooks'];

        this.searchTerm = this.route.snapshot.params['filter'];
        //console.log('Filter is ' + this.searchTerm);

        this.swapService.searchSwaps(this.searchTerm, this.authService.currentUser.id)
            .subscribe({
                next: data => {
                    var stringified = JSON.stringify(data);
                    var parsed = JSON.parse(stringified);
                    this.swapResults = parsed;
                }
                ,
                error: () => { 
                    console.log('Error'); 
                    this.searchComplete = true;
                },
                complete: () => { 
                    console.log('No error');
                    this.searchComplete = true;

                 }
            });

    }
    // var swapResults = this.getMySwapRequests(id);
    // else if (this.searchTerm === 'received')
    // swapResults = this.getMySwapOffers(id);
    // else if (this.searchTerm === 'pending')
    // swapResults = this.getMyPendingOffers(id);
    // else  
    // swapResults = this.getAllMySwaps(id);


    // if (this.searchTerm === 'sent')
    // {
    //     this.swapService.getMySwapRequests(this.authService.currentUser.id)
    //     .subscribe({
    //         next: data => {

    //             var stringified = JSON.stringify(data);
    //             var parsed = JSON.parse(stringified);
    //             this.swapResults = parsed;
    //             console.log('Dates are ' + this.swapResults[0].createdDate);
    //             console.log('Dates are ' + this.swapResults[1].createdDate);

    //         }
    //             ,
    //         error: () => console.log('Error'),
    //         complete: () => console.log('no error')
    //     });
    // }
    // else if (this.searchTerm === 'received')
    // {
    //     this.swapService.getMySwapOffers(this.authService.currentUser.id)
    //     .subscribe({
    //         next: data => {

    //             var stringified = JSON.stringify(data);
    //             var parsed = JSON.parse(stringified);
    //             this.swapResults = parsed;
    //             console.log('Dates are ' + this.swapResults[0].createdDate);
    //             console.log('Dates are ' + this.swapResults[1].createdDate);

    //         }
    //             ,
    //         error: () => console.log('Error'),
    //         complete: () => console.log('no error')
    //     });
    // }
    // else if (this.searchTerm === 'all')
    // {
    //     this.swapService.getAllMySwaps(this.authService.currentUser.id)
    //     .subscribe({
    //         next: data => {

    //             var stringified = JSON.stringify(data);
    //             var parsed = JSON.parse(stringified);
    //             this.swapResults = parsed;
    //             console.log('Dates are ' + this.swapResults[0].createdDate);
    //             console.log('Dates are ' + this.swapResults[1].createdDate);

    //         }
    //             ,
    //         error: () => console.log('Error'),
    //         complete: () => console.log('no error')
    //     });
    // }


    //this.fetchSwaps();



    //console.log('****** Got SEARCH books ' + this.searchableBooks);
    //console.log('****** Got SEARCH ?? ' + this.search);
    //console.log('Got vis books ' + this.visibleSwaps);
    //this.visibleSwaps = this.allbooks.slice(0);


    handleError() {

    }
    processData(data: any) {

    }

    handleComplete() { }


    acceptDonate(swap: Swap) {

        swap.status = StatusType.Acc;
        swap.type = 'donate';
        this.swapService.acceptSwapRequest(swap)
            .subscribe({
                next: data => {
                    // var stringified = JSON.stringify(data);
                    // var parsed:IBook = JSON.parse(stringified);
                    // console.log('Loading book' + parsed.title);
                    console.log('Got new swap id ' + data.id);
                    //this.router.navigate(['book/' + this.bookDisplay.id]);
                },
                complete: () => {

                    this.router.navigate(['/swaps/all']);

                }
            },
            );
    }

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
                error: () => { console.log('Error'); },
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

    updateBook(id: number, status: string){
        this.apiService.updateBook(id,status)
        .subscribe({
            next: data => {
                 var stringified = JSON.stringify(data);
                 var parsed:IBook = JSON.parse(stringified);
                //this.router.navigate(['book/' + this.bookDisplay.id]);
            },
            complete: () => {


            }
        },
        );

        
    }


    openViewAvailableSwapBooksDialog(swapid: number, id?: number) {
        //console.log('Looking for ' + id);
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

        const dialogRef = this.dialog.open(BooksPickComponent, dialogConfig);

        // dialogRef.afterClosed().subscribe({
        //     next: data => {
        //         var stringJson = JSON.stringify(data);

        //         //console.log('Return is ' + stringJson); 

        //         if (stringJson === 'true') {}
        //         else if (stringJson === 'false'){
        //             this.loadForm = true;
        //             this.loadForm = true;
        //             this.manualLoad = true;
        //             this.bookDisplay = <IBook>{};
        //             this.bookDisplay.isbn = this.form.value['isbn'];
        //             this.resetformgroup();
        //         }
        //         else{
        //             // ConvertjSON to an object
        //             this.loadForm = true;
        //             var stringObject = JSON.parse(stringJson);
        //             this.bookDisplay = stringObject;
        //             this.foundIsbn = this.bookDisplay.isbn;
        //         }                    
        //     },
        //     error: error => console.log(error),
        // });
    }
}
